use std::time::Duration;

use jms_arena_lib::{ArenaState, ArenaSignal, ArenaRPCClient, ARENA_STATE_KEY, AllianceStation, SerialisedLoadedMatch, ARENA_MATCH_KEY, AllianceStationUpdate};
use jms_core_lib::{models::{MaybeToken, Permission, AllianceStationId, Match, MatchType}, db::Table};
use jms_driverstation_lib::DriverStationReport;

use crate::ws::WebsocketContext;

#[jms_websocket_macros::websocket_handler]
pub trait ArenaWebsocket {

  /* Arena */

  #[publish]
  async fn state(&self, ctx: &WebsocketContext) -> anyhow::Result<ArenaState> {
    Ok(ctx.kv.json_get(ARENA_STATE_KEY, "$")?)
  }

  #[endpoint]
  async fn signal(&self, ctx: &WebsocketContext, token: &MaybeToken, signal: ArenaSignal) -> anyhow::Result<()> {
    let user = token.auth(&ctx.kv)?;
    if signal == ArenaSignal::Estop {
      user.require_permission(&[Permission::MatchFlow, Permission::Estop])?;
    } else {
      user.require_permission(&[Permission::MatchFlow])?;
    }

    let fut = ArenaRPCClient::signal(&ctx.mq, signal, user.username.clone());
    tokio::time::timeout(Duration::from_millis(200), fut).await??.map_err(|e| anyhow::anyhow!(e))
  }

  /* Match */
  
  #[publish]
  async fn current_match(&self, ctx: &WebsocketContext) -> anyhow::Result<Option<SerialisedLoadedMatch>> {
    Ok(ctx.kv.json_get(ARENA_MATCH_KEY, "$").ok())
  }

  #[endpoint]
  async fn load_match(&self, ctx: &WebsocketContext, token: &MaybeToken, match_id: String) -> anyhow::Result<()> {
    token.auth(&ctx.kv)?.require_permission(&[Permission::FTA, Permission::FTAA, Permission::Scorekeeper])?;
    ArenaRPCClient::load_match(&ctx.mq, match_id).await.map_err(|e| anyhow::anyhow!(e))?.map_err(|e| anyhow::anyhow!(e))
  }

  #[endpoint]
  async fn load_test_match(&self, ctx: &WebsocketContext, token: &MaybeToken) -> anyhow::Result<()> {
    token.auth(&ctx.kv)?.require_permission(&[Permission::FTA, Permission::FTAA, Permission::Scorekeeper])?;
    let max_test_match = Match::all(&ctx.kv)?.iter().filter(|m| m.match_type == MatchType::Test).map(|x| x.set_number).max().unwrap_or(0);
    let m = Match {
      id: Match::gen_id(MatchType::Test, 1, max_test_match + 1, 1),
      name: Match::gen_name(MatchType::Test, 1, max_test_match + 1, 1),
      start_time: chrono::Local::now(),
      match_type: MatchType::Test,
      round: 1,
      set_number: max_test_match + 1,
      match_number: 1,
      blue_teams: vec![None, None, None],
      red_teams: vec![None, None, None],
      blue_alliance: None,
      red_alliance: None,
      played: false,
      ready: true
    };
    m.insert(&ctx.kv)?;
    ArenaRPCClient::load_match(&ctx.mq, m.id.clone()).await.map_err(|e| anyhow::anyhow!(e))?.map_err(|e| anyhow::anyhow!(e))
  }

  #[endpoint]
  async fn unload_match(&self, ctx: &WebsocketContext, token: &MaybeToken) -> anyhow::Result<()> {
    token.auth(&ctx.kv)?.require_permission(&[Permission::FTA, Permission::FTAA, Permission::Scorekeeper])?;
    ArenaRPCClient::unload_match(&ctx.mq).await.map_err(|e| anyhow::anyhow!(e))?.map_err(|e| anyhow::anyhow!(e))
  }
  
  /* Alliance Stations */

  #[publish]
  async fn stations(&self, ctx: &WebsocketContext) -> anyhow::Result<Vec<AllianceStation>> {
    AllianceStation::sorted(&ctx.kv)
  }

  // TODO: Should DBPartialUpdate take in the same enum that's generated by Updateable? Would make this easier.
  #[endpoint]
  async fn update_station(&self, ctx: &WebsocketContext, token: &MaybeToken, station_id: AllianceStationId, updates: Vec<AllianceStationUpdate>) -> anyhow::Result<()> {
    token.auth(&ctx.kv)?.require_permission(&[Permission::FTA, Permission::FTAA, Permission::Scorekeeper])?;
    let mut stn = AllianceStation::get(&station_id, &ctx.kv)?;
    for update in updates {
      update.apply(&mut stn);
    }
    stn.insert(&ctx.kv)?;
    Ok(())
  }

  #[endpoint]
  async fn estop_station(&self, ctx: &WebsocketContext, _token: &MaybeToken, station_id: AllianceStationId, astop: bool) -> anyhow::Result<()> {
    let mut stn = AllianceStation::get(&station_id, &ctx.kv)?;
    if astop { stn.set_astop(true, &ctx.kv)?; }
    else     { stn.set_estop(true, &ctx.kv)?; }
    stn.insert(&ctx.kv)?;
    Ok(())
  }

  /* Driver Station */

  #[publish]
  async fn ds(&self, ctx: &WebsocketContext) -> anyhow::Result<Vec<DriverStationReport>> {
    DriverStationReport::all(&ctx.kv)
  }
}

// define_websocket_msg!($ArenaMessage {
//   $State {
//     send Current(ArenaState),
//     recv Signal(ArenaSignal)
//   },
//   $Alliance {
//     send CurrentStations(Vec<AllianceStation>),
//     recv UpdateAlliance {
//       station: AllianceStationId,
//       bypass: Option<bool>,
//       team: Option<usize>,
//       estop: Option<bool>,
//       astop: Option<bool>
//     }
//   },
//   $DriverStation {
//     send Reports(Vec<DriverStationReport>)
//   },
//   $Match {
//     send Current(Option<SerialisedLoadedMatch>),
//     // send Score(MatchScoreSnapshot),
//     recv LoadTest,
//     recv Unload,
//     recv Load(String),
//     // recv ScoreUpdate(ScoreUpdateData)
//   },
//   // $AudienceDisplay {
//   //   send Current(AudienceDisplay),
//   //   recv $Set {
//   //     Field,
//   //     MatchPreview,
//   //     MatchPlay,
//   //     MatchResults(Option<String>),
//   //     AllianceSelection,
//   //     PlayoffBracket,
//   //     Award(usize),
//   //     CustomMessage(String)
//   //   },
//   //   PlaySound(String)
//   // }
// });

// pub struct WSArenaHandler();

// #[async_trait::async_trait]
// impl WebsocketHandler for WSArenaHandler {
//   async fn broadcast(&self, ctx: &WebsocketContext) -> anyhow::Result<()> {
//     let m = ctx.kv.json_get::<SerialisedLoadedMatch>(ARENA_MATCH_KEY, "$").ok();
//     ctx.broadcast::<ArenaMessage2UI>(ArenaMessageMatch2UI::Current(m).into()).await;

//     ctx.broadcast::<ArenaMessage2UI>(ArenaMessageState2UI::Current(ctx.kv.json_get(ARENA_STATE_KEY, "$")?).into()).await;
    
//     let mut stations: Vec<AllianceStation> = vec![];
//     for stn in AllianceStationId::all() {
//       stations.push(ctx.kv.json_get(&stn.to_kv_key(), "$")?);
//     }
//     ctx.broadcast::<ArenaMessage2UI>(ArenaMessageAlliance2UI::CurrentStations(stations).into()).await;
    
//     let mut dss: Vec<DriverStationReport> = vec![];
//     for key in ctx.kv.keys("ds:*")? {
//       if let Ok(ds) = ctx.kv.json_get(&key, "$") {
//         dss.push(ds);
//       }
//     }
//     ctx.broadcast::<ArenaMessage2UI>(ArenaMessageDriverStation2UI::Reports(dss).into()).await;
    
//     Ok(())
//   }

//   async fn handle(&self, msg: &WebsocketMessage2JMS, ws: &mut Websocket) -> anyhow::Result<()> {
//     if let WebsocketMessage2JMS::Arena(msg) = msg {
//       match msg.clone() {
//         ArenaMessage2JMS::State(msg) => match msg {
//           ArenaMessageState2JMS::Signal(signal) => {
//             ArenaRPCClient::signal(&ws.context.mq, signal, "WebUI".to_owned()).await?.map_err(|x| anyhow::anyhow!(x))?;
//           },
//         },
//         ArenaMessage2JMS::Alliance(msg) => match msg {
//           ArenaMessageAlliance2JMS::UpdateAlliance { station, bypass, team, estop, astop } => {
//             let current_state: ArenaState = ws.context.kv.json_get(ARENA_STATE_KEY, "$")?;
//             let idle = matches!(current_state, ArenaState::Idle { .. });
//             let prestart = matches!(current_state, ArenaState::Prestart { .. });

//             match bypass {
//               Some(byp) if (idle || prestart) => ws.context.kv.json_set(&station.to_kv_key(), "$.bypass", &byp)?,
//               Some(_) => anyhow::bail!("Can't bypass unless in IDLE or PRESTART"),
//               None => ()
//             }

//             match team {
//               Some(0) if idle => ws.context.kv.json_set(&station.to_kv_key(), "$.team", &Option::<u16>::None)?,
//               Some(id) if idle => ws.context.kv.json_set(&station.to_kv_key(), "$.team", &Some(id))?,
//               Some(_) => anyhow::bail!("Can't set team unless in IDLE"),
//               None => ()
//             }

//             if Some(true) == estop {
//               ws.context.kv.json_set(&station.to_kv_key(), "$.estop", &true)?;
//             }

//             if Some(true) == astop {
//               ws.context.kv.json_set(&station.to_kv_key(), "$.astop", &true)?;
//             }
//           },
//         },
//         ArenaMessage2JMS::Match(msg) => match msg {
//           ArenaMessageMatch2JMS::LoadTest => { ArenaRPCClient::load_test_match(&ws.context.mq).await?.map_err(|e| anyhow::anyhow!(e))?; },
//           ArenaMessageMatch2JMS::Unload => { ArenaRPCClient::unload_match(&ws.context.mq).await?.map_err(|e| anyhow::anyhow!(e))?; },
//           ArenaMessageMatch2JMS::Load(match_id) => { ArenaRPCClient::load_match(&ws.context.mq, match_id).await?.map_err(|e| anyhow::anyhow!(e))?; },
//           // ArenaMessageMatch2JMS::ScoreUpdate(update) => {
//           //   let a = arena.arena_impl();
//           //   let mut score = a.score.write().await;
//           //   match update.alliance {
//           //     models::Alliance::Blue => score.blue.update(update.update),
//           //     models::Alliance::Red => score.red.update(update.update),
//           //   }
//           // },
//         },
//         // ArenaMessage2JMS::AudienceDisplay(msg) => match msg {
//         //   ArenaMessageAudienceDisplay2JMS::Set(set_msg) => {
//         //     *(arena.arena_impl().audience.write().await) = match set_msg {
//         //       ArenaMessageAudienceDisplaySet2JMS::Field => AudienceDisplay::Field,
//         //       ArenaMessageAudienceDisplaySet2JMS::MatchPreview => AudienceDisplay::MatchPreview,
//         //       ArenaMessageAudienceDisplaySet2JMS::MatchPlay => AudienceDisplay::MatchPlay,
//         //       ArenaMessageAudienceDisplaySet2JMS::MatchResults(match_id) => match match_id {
//         //         Some(match_id) => AudienceDisplay::MatchResults(models::Match::get_or_err(match_id, &db::database())?.into()),
//         //         None => {
//         //           let last_match = models::Match::sorted(&db::database())?.iter().filter(|&t| t.played).last().cloned();
//         //           match last_match {
//         //             Some(m) => AudienceDisplay::MatchResults(m.into()),
//         //             None => bail!("Can't display results when no matches have been played!"),
//         //           }
//         //         },
//         //       },
//         //       ArenaMessageAudienceDisplaySet2JMS::AllianceSelection => AudienceDisplay::AllianceSelection,
//         //       ArenaMessageAudienceDisplaySet2JMS::PlayoffBracket => AudienceDisplay::PlayoffBracket,
//         //       ArenaMessageAudienceDisplaySet2JMS::Award(award_id) => AudienceDisplay::Award(models::Award::get_or_err(award_id, &db::database())?),
//         //       ArenaMessageAudienceDisplaySet2JMS::CustomMessage(custom_msg) => AudienceDisplay::CustomMessage(custom_msg),
//         //     }
//         //   },
//         //   ArenaMessageAudienceDisplay2JMS::PlaySound(sound) => {
//         //     ws.context.broadcast::<ArenaMessage2UI>(ArenaMessageAudienceDisplay2UI::PlaySound(sound).into()).await;
//         //   }
//         // }
//       }

//       // Broadcast when there's any changes
//       // self.broadcast(&ws.context).await?;
//     }

//     Ok(())
//   }
// }
