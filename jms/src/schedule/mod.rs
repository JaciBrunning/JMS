use std::{cmp, time};

use log::{debug, info};
use nalgebra as na;
use rand::{Rng, prelude::SliceRandom};

// Cols = Rounds
#[derive(Debug)]
pub struct ScheduleRounds(pub na::DMatrix<usize>);

// Cols = Matches
#[derive(Debug)]
pub struct Schedule(pub na::DMatrix<usize>);

pub struct ScheduleGenerator {
  num_teams: usize,
  num_rounds: usize,
  num_stations: usize,

  num_matches: usize,
  num_overflow: usize,

  teams: na::DVector<usize>,

  placeholder_team: usize
}

impl ScheduleGenerator {
  pub fn new(
    num_teams: usize,
    num_matches_per_team: usize,
    num_stations: usize
  ) -> Self {
    let num_matches = ((num_teams * num_matches_per_team) as f64 / (num_stations as f64)).ceil() as usize;
    let teams = na::DVector::from_iterator(num_teams, (0..num_teams).into_iter());

    Self {
      num_teams,
      num_rounds: num_matches_per_team,
      num_stations,
      num_matches,
      num_overflow: (num_matches * num_stations) - (num_matches_per_team * num_teams),
      teams,
      placeholder_team: num_teams
    }
  }

  fn generate_unchecked_simple_schedule(&self) -> ScheduleRounds {
    let mut schedule = ScheduleRounds(na::DMatrix::zeros(self.num_teams, self.num_rounds));
    for i in 0..self.num_rounds {
      schedule.0.set_column(i, &shuffle(&self.teams));
    }
    schedule
  }

  fn rounds_into_matches(&self, rounds: &ScheduleRounds, const_placeholder: bool) -> Schedule {
    let mut flat = na::RowDVector::from_iterator(rounds.0.len(), rounds.0.iter().cloned());
    let l = flat.len();

    if const_placeholder {
      flat = flat.insert_columns(l, self.num_overflow, self.placeholder_team);
    } else {
      let shuffled = shuffle(&self.teams);
      for i in 0..self.num_overflow {
        flat = flat.insert_column(l + i, shuffled[i]);
      }
    }

    Schedule(na::DMatrix::from_iterator(self.num_stations, self.num_matches, flat.iter().cloned()))
  }

  pub fn generate_simple_schedule(&self) -> ScheduleRounds {
    // Keep generating until we get a valid schedule (all teams only play a maximum of once each match - no repeats)
    loop {
      let sched = self.generate_unchecked_simple_schedule();

      match self.schedule_team_balance_score(&sched) {
        Some(_) => return sched,
        None => (),
      }
    }
  }

  pub fn schedule_team_balance_score(&self, schedule: &ScheduleRounds) -> Option<f64> {
    // Generate cooccurence of each team with each other
    let matches = self.rounds_into_matches(schedule, true);
    let cooccurrence = self.cooccurrence_matrix(&matches);

    // Calculate stddev of upper triangle (first part of the cooccurrence)
    cooccurrence.map(|c| stddev(&upper_triangle(&c, 1)))
  }

  pub fn cooccurrence_matrix(&self, schedule: &Schedule) -> Option<na::DMatrix<usize>> {
    let mut cooccurrence: na::DMatrix<usize> = na::DMatrix::zeros(self.num_teams, self.num_teams);

    for m in schedule.0.column_iter() {
      for (i, &t1) in m.iter().enumerate() {
        for (j, &t2) in m.iter().enumerate() {
          if t1 != self.placeholder_team && t2 != self.placeholder_team {
            if i != j && t1 == t2 {
              // Team appears in the same match multiple times, therefore this schedule is not valid
              return None
            } else {
              cooccurrence[(t1, t2)] += 1;
            }
          }
        }
      }
    }
    
    Some(cooccurrence)
  }

  pub fn generate_incremental_team_balance_schedule(&self, schedule: &ScheduleRounds) -> ScheduleRounds {
    let mut rng = rand::thread_rng();

    let mut sched = schedule.0.clone();
    let col = rng.gen_range(0..sched.ncols());
    sched.set_column(col, &shuffle(&sched.column(col)));
    ScheduleRounds(sched)
  }

  pub fn schedule_station_balance_scores(&self, schedule: &Schedule) -> Option<f64> {
    // Each row is a station, each col is a team
    let stations = self.station_matrix(schedule);
    
    // Get the stddevs of each team, and then average together
    let stddevs = stations.column_iter().map(|ref x| stddev(x));
    Some(stddevs.clone().sum::<f64>() / (stddevs.len() as f64))
  }

  pub fn station_matrix(&self, schedule: &Schedule) -> na::DMatrix<usize> {
    let mut stations: na::DMatrix<usize> = na::DMatrix::zeros(self.num_stations, self.num_teams);
    for c in schedule.0.column_iter() {
      for (stn_i, &team) in c.iter().enumerate() {
        stations[(stn_i, team)] += 1;
      }
    }
    stations
  }

  pub fn generate_incremental_station_balance_schedule(&self, schedule: &Schedule) -> Schedule {
    let mut rng = rand::thread_rng();

    let mut sched = schedule.0.clone();
    let col = rng.gen_range(0..sched.ncols());
    sched.set_column(col, &shuffle(&sched.column(col)));
    Schedule(sched)
  }

  pub fn generate(&self, anneal_team_balance: Annealer, anneal_station_balance: Annealer) -> (Schedule, f64, f64) {
    let t0 = time::Instant::now();

    let rounds = self.generate_simple_schedule();
    let t1 = time::Instant::now();

    info!("Seed schedule generated (in {:.2}s)", (t1 - t0).as_secs_f32());
    debug!("{}", rounds.0);

    let t2 = time::Instant::now();
    let (annealed_rounds, team_balance_score) = anneal_team_balance.anneal(
      rounds,
      |s| self.generate_incremental_team_balance_schedule(s),
      |s| self.schedule_team_balance_score(s)
    );
    let t3 = time::Instant::now();

    info!("Team balance annealing complete, score={:.5} (in {:.2}s)", team_balance_score, (t3 - t2).as_secs_f32());
    debug!("{}", annealed_rounds.0);

    // Convert the rounds into matches, making sure that it's still a valid schedule
    let mut matches = self.rounds_into_matches(&annealed_rounds, false);
    while self.cooccurrence_matrix(&matches).is_none() {
      matches = self.rounds_into_matches(&annealed_rounds, false);
    }

    let t4 = time::Instant::now();
    let (annealed_matches, station_balance_score) = anneal_station_balance.anneal(
      matches,
      |s| self.generate_incremental_station_balance_schedule(s),
      |s| self.schedule_station_balance_scores(s)
    );
    let t5 = time::Instant::now();

    info!("Station balance annealing complete, score={:.5} (in {:.2}s)", station_balance_score, (t5 - t4).as_secs_f32());
    debug!("{}", annealed_matches.0);

    info!("Schedule generated in {:.2}s", (t5 - t0).as_secs_f32());
    debug!("{}", annealed_matches.0);

    debug!("Cooccurrence matrix:");
    debug!("{}", self.cooccurrence_matrix(&annealed_matches).unwrap());

    debug!("Station matrix:");
    debug!("{}", self.station_matrix(&annealed_matches));

    (annealed_matches, team_balance_score, station_balance_score)
  }
}

#[derive(Debug, Clone, Copy)]
pub struct Annealer {
  temp_start: f64,
  temp_end: f64,
  dt: f64
}

impl Annealer {
  pub fn new(temp_start: f64, temp_end: f64, steps: usize) -> Self {
    Annealer {
      temp_start,
      temp_end,
      dt: (temp_start - temp_end) / (steps as f64)
    }
  }

  pub fn anneal<T, G, E>(&self, initial: T, generator: G, evaluator: E) -> (T, f64)
  where
    G: Fn(&T) -> T,
    E: Fn(&T) -> Option<f64>
  {
    let mut rng = rand::thread_rng();

    let mut temperature = self.temp_start;
    let mut current = initial;
    let mut current_score = evaluator(&current).unwrap();

    while temperature > self.temp_end {
      let next = generator(&current);

      if let Some(score) = evaluator(&next) {
        let prob = f64::exp(-(score - current_score) / temperature);
        let roll: f64 = rng.gen();
        if score < current_score || roll <= prob {
          current = next;
          current_score = score;
        }
      }

      temperature -= self.dt;
    }

    (current, current_score)
  }
}

// Allow any storage - slice or vec
fn shuffle<S>(mat: &na::Matrix<usize, na::Dynamic, na::U1, S>) -> na::DVector<usize>
where
  S: na::storage::Storage<usize, na::Dynamic, na::U1>
{
  let mut rng = rand::thread_rng();
  let mut x: Vec<usize> = mat.into_iter().map(|x| *x).collect();
  x.shuffle(&mut rng);
  na::DVector::from_vec(x)
}

fn stddev<S>(mat: &na::Matrix<usize, na::Dynamic, na::U1, S>) -> f64
where
  S: na::storage::Storage<usize, na::Dynamic, na::U1>
{
  let floating = mat.map(|x| x as f64);
  let mean = floating.mean();
  let numer = floating.map(|x| (x - mean).powi(2)).sum();
  (numer / (mat.len() as f64)).sqrt()
}

fn upper_triangle(mat: &na::DMatrix<usize>, shift: usize) -> na::DVector<usize> {
  let mut upper = na::DVector::zeros(0);
  for j in shift..mat.ncols() {
    for i in 0..cmp::min(j + 1 - shift, mat.nrows()) {
      let n = upper.len();
      upper = upper.insert_row(n, mat[(i, j)]);
    }
  }
  upper
}