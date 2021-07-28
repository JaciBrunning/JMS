-- Your SQL goes here
CREATE TABLE team_rankings (
  team INTEGER PRIMARY KEY NOT NULL,
  
  -- Tiebreaker values
  rp INTEGER NOT NULL DEFAULT 0,
  auto_points INTEGER NOT NULL DEFAULT 0,
  endgame_points INTEGER NOT NULL DEFAULT 0,
  teleop_points INTEGER NOT NULL DEFAULT 0,
  random_num INTEGER NOT NULL DEFAULT 0,
  
  win INTEGER NOT NULL DEFAULT 0,
  loss INTEGER NOT NULL DEFAULT 0,
  tie INTEGER NOT NULL DEFAULT 0,
  played INTEGER NOT NULL DEFAULT 0
);