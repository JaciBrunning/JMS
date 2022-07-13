/* tslint:disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export type WebsocketMessage2UI =
  | {
      Error: string;
    }
  | {
      Event: EventMessage2UI;
    }
  | {
      Arena: ArenaMessage2UI;
    }
  | {
      Match: MatchMessage2UI;
    };
export type EventMessage2UI =
  | {
      Details: EventMessageDetails2UI;
    }
  | {
      Team: EventMessageTeam2UI;
    }
  | {
      Schedule: EventMessageSchedule2UI;
    }
  | {
      Alliance: EventMessageAlliance2UI;
    }
  | {
      Ranking: EventMessageRanking2UI;
    }
  | {
      Award: EventMessageAward2UI;
    };
export type EventMessageDetails2UI = {
  Current: EventDetails;
};
export type EventMessageTeam2UI = {
  CurrentAll: Team[];
};
export type EventMessageSchedule2UI = {
  CurrentBlocks: ScheduleBlock[];
};
export type ScheduleBlockType = "General" | "Qualification" | "Playoff";
export type EventMessageAlliance2UI = {
  CurrentAll: PlayoffAlliance[];
};
export type EventMessageRanking2UI = {
  CurrentAll: TeamRanking[];
};
export type EventMessageAward2UI = {
  CurrentAll: Award[];
};
export type ArenaMessage2UI =
  | {
      State: ArenaMessageState2UI;
    }
  | {
      Alliance: ArenaMessageAlliance2UI;
    }
  | {
      Match: ArenaMessageMatch2UI;
    }
  | {
      AudienceDisplay: ArenaMessageAudienceDisplay2UI;
    }
  | {
      Access: ArenaMessageAccess2UI;
    };
export type ArenaMessageState2UI = {
  Current: ArenaState;
};
export type ArenaState =
  | {
      state: "Init";
    }
  | {
      ready: boolean;
      state: "Idle";
    }
  | {
      state: "Estop";
    }
  | {
      state: "EstopReset";
    }
  | {
      ready: boolean;
      state: "Prestart";
    }
  | {
      state: "MatchArmed";
    }
  | {
      state: "MatchPlay";
    }
  | {
      ready: boolean;
      state: "MatchComplete";
    }
  | {
      state: "MatchCommit";
    };
export type ArenaMessageAlliance2UI = {
  CurrentStations: AllianceStation[];
};
export type DSMode = "Teleop" | "Test" | "Auto";
export type AllianceStationOccupancy = "Vacant" | "Occupied" | "WrongStation" | "WrongMatch";
export type Alliance = "Blue" | "Red";
export type ArenaMessageMatch2UI = {
  Current: LoadedMatch | null;
};
export type WinStatus = "WIN" | "LOSS" | "TIE";
export type EndgamePointType = "None" | "Hang" | "Park";
export type MatchSubtype = "Quarterfinal" | "Semifinal" | "Final";
export type MatchType = "Test" | "Qualification" | "Playoff";
export type MatchPlayState = "Waiting" | "Warmup" | "Auto" | "Pause" | "Teleop" | "Cooldown" | "Complete" | "Fault";
export type ArenaMessageAudienceDisplay2UI = {
  Current: AudienceDisplay;
};
export type AudienceDisplay =
  | {
      scene: "Field";
    }
  | {
      scene: "MatchPreview";
    }
  | {
      scene: "MatchPlay";
    }
  | {
      params: SerializedMatch;
      scene: "MatchResults";
    }
  | {
      scene: "AllianceSelection";
    }
  | {
      params: Award;
      scene: "Award";
    }
  | {
      params: string;
      scene: "CustomMessage";
    };
export type ArenaMessageAccess2UI = {
  Current: ArenaAccessRestriction;
};
export type ArenaAccessRestriction = "NoRestriction" | "ResetOnly" | "Teams";
export type MatchMessage2UI =
  | {
      Quals: MatchMessageQuals2UI;
    }
  | {
      Playoffs: MatchMessagePlayoffs2UI;
    }
  | {
      Next: SerializedMatch | null;
    }
  | {
      Last: SerializedMatch | null;
    };
export type MatchMessageQuals2UI = {
  Generation: SerialisedMatchGeneration;
};
export type MatchGenerationRecordData =
  | {
      Qualification: {
        cooccurrence: number[][];
        gen_time: number;
        station_balance: number;
        station_dist: number[][];
        team_balance: number;
      };
    }
  | {
      Playoff: {
        mode: PlayoffMode;
      };
    };
export type PlayoffMode = "Bracket" | "RoundRobin";
export type MatchMessagePlayoffs2UI = {
  Generation: SerialisedMatchGeneration;
};
export type WebsocketMessage2JMS =
  | {
      Subscribe: string[];
    }
  | {
      Debug: DebugMessage2JMS;
    }
  | {
      Event: EventMessage2JMS;
    }
  | {
      Arena: ArenaMessage2JMS;
    }
  | {
      Match: MatchMessage2JMS;
    };
export type DebugMessage2JMS = {
  Match: DebugMessageMatch2JMS;
};
export type DebugMessageMatch2JMS = "FillRandomScores" | "DeleteAll";
export type EventMessage2JMS =
  | {
      Details: EventMessageDetails2JMS;
    }
  | {
      Team: EventMessageTeam2JMS;
    }
  | {
      Schedule: EventMessageSchedule2JMS;
    }
  | {
      Alliance: EventMessageAlliance2JMS;
    }
  | {
      Award: EventMessageAward2JMS;
    };
export type EventMessageDetails2JMS = {
  Update: EventDetails;
};
export type EventMessageTeam2JMS =
  | {
      Insert: Team;
    }
  | {
      Delete: number;
    };
export type EventMessageSchedule2JMS =
  | "NewBlock"
  | {
      DeleteBlock: number;
    }
  | {
      UpdateBlock: ScheduleBlock;
    }
  | {
      LoadDefault: number;
    };
export type EventMessageAlliance2JMS =
  | ("Clear" | "Promote")
  | {
      Create: number;
    }
  | {
      Update: PlayoffAlliance;
    };
export type EventMessageAward2JMS =
  | {
      Create: string;
    }
  | {
      Update: Award;
    }
  | {
      Delete: number;
    };
export type ArenaMessage2JMS =
  | {
      State: ArenaMessageState2JMS;
    }
  | {
      Alliance: ArenaMessageAlliance2JMS;
    }
  | {
      Match: ArenaMessageMatch2JMS;
    }
  | {
      AudienceDisplay: ArenaMessageAudienceDisplay2JMS;
    }
  | {
      Access: ArenaMessageAccess2JMS;
    };
export type ArenaMessageState2JMS = {
  Signal: ArenaSignal;
};
export type ArenaSignal = "Estop" | "EstopReset" | "Prestart" | "MatchArm" | "MatchPlay" | "MatchCommit";
export type ArenaMessageAlliance2JMS = {
  UpdateAlliance: {
    astop?: boolean | null;
    bypass?: boolean | null;
    estop?: boolean | null;
    station: AllianceStationId;
    team?: number | null;
  };
};
export type ArenaMessageMatch2JMS =
  | ("LoadTest" | "Unload")
  | {
      Load: string;
    }
  | {
      ScoreUpdate: ScoreUpdateData;
    };
export type ScoreUpdate =
  | {
      Initiation: {
        crossed: boolean;
        station: number;
      };
    }
  | {
      PowerCell: {
        auto: boolean;
        bottom?: number;
        inner?: number;
        outer?: number;
      };
    }
  | {
      Endgame: {
        endgame: EndgamePointType;
        station: number;
      };
    }
  | {
      RungLevel: boolean;
    }
  | {
      Penalty: {
        fouls?: number;
        tech_fouls?: number;
      };
    };
export type ArenaMessageAudienceDisplay2JMS = {
  Set: ArenaMessageAudienceDisplaySet2JMS;
};
export type ArenaMessageAudienceDisplaySet2JMS =
  | ("Field" | "MatchPreview" | "MatchPlay" | "AllianceSelection")
  | {
      MatchResults: string | null;
    }
  | {
      Award: number;
    }
  | {
      CustomMessage: string;
    };
export type ArenaMessageAccess2JMS = {
  Set: ArenaAccessRestriction;
};
export type MatchMessage2JMS =
  | {
      Quals: MatchMessageQuals2JMS;
    }
  | {
      Playoffs: MatchMessagePlayoffs2JMS;
    };
export type MatchMessageQuals2JMS =
  | "Clear"
  | {
      Generate: QualsMatchGeneratorParams;
    };
export type MatchMessagePlayoffs2JMS =
  | "Clear"
  | {
      Generate: PlayoffMode;
    };

export interface AllWebsocketMessages {
  jms2ui: WebsocketMessage2UI;
  ui2jms: WebsocketMessage2JMS;
}
export interface EventDetails {
  code?: string | null;
  event_name?: string | null;
  webcasts: string[];
}
export interface Team {
  affiliation?: string | null;
  id: number;
  location?: string | null;
  name?: string | null;
  notes?: string | null;
  schedule: boolean;
  wpakey?: string | null;
}
export interface ScheduleBlock {
  block_type: ScheduleBlockType;
  cycle_time: number;
  end_time: number;
  id?: number | null;
  name: string;
  start_time: number;
}
export interface PlayoffAlliance {
  id: number;
  ready: boolean;
  teams: (number | null)[];
}
export interface TeamRanking {
  auto_points: number;
  endgame_points: number;
  loss: number;
  played: number;
  random_num: number;
  rp: number;
  team: number;
  teleop_points: number;
  tie: number;
  win: number;
}
export interface Award {
  id?: number | null;
  name: string;
  recipients: AwardRecipient[];
}
export interface AwardRecipient {
  awardee?: string | null;
  team?: number | null;
}
export interface AllianceStation {
  astop: boolean;
  bypass: boolean;
  ds_report?: AllianceStationDSReport | null;
  estop: boolean;
  occupancy: AllianceStationOccupancy;
  station: AllianceStationId;
  team?: number | null;
}
export interface AllianceStationDSReport {
  battery: number;
  estop: boolean;
  mode?: DSMode | null;
  pkts_lost: number;
  pkts_sent: number;
  radio_ping: boolean;
  rio_ping: boolean;
  robot_ping: boolean;
  rtt: number;
}
export interface AllianceStationId {
  alliance: Alliance;
  station: number;
}
export interface LoadedMatch {
  config: MatchConfig;
  endgame: boolean;
  match_meta: SerializedMatch;
  remaining_time: Duration;
  score: MatchScoreSnapshot;
  state: MatchPlayState;
}
export interface MatchConfig {
  auto_time: Duration;
  endgame_time: Duration;
  pause_time: Duration;
  teleop_time: Duration;
  warmup_cooldown_time: Duration;
}
export interface Duration {
  nanos: number;
  secs: number;
}
export interface SerializedMatch {
  blue_alliance?: number | null;
  blue_teams: (number | null)[];
  full_score?: MatchScoreSnapshot | null;
  id?: string | null;
  match_number: number;
  match_subtype?: MatchSubtype | null;
  match_type: MatchType;
  name: string;
  played: boolean;
  red_alliance?: number | null;
  red_teams: (number | null)[];
  score?: MatchScore | null;
  score_time?: number | null;
  set_number: number;
  start_time?: number | null;
  winner?: Alliance | null;
}
export interface MatchScoreSnapshot {
  blue: SnapshotScore;
  red: SnapshotScore;
}
export interface SnapshotScore {
  derived: DerivedScore;
  live: LiveScore;
}
export interface DerivedScore {
  cell_points: ModeScoreForInt;
  endgame_points: number;
  initiation_points: number;
  mode_score: ModeScoreForInt;
  penalty_score: number;
  shield_gen_rp: boolean;
  stage: number;
  stage3_rp: boolean;
  total_bonus_rp: number;
  total_rp: number;
  total_score: number;
  win_rp: number;
  win_status: WinStatus;
}
export interface ModeScoreForInt {
  auto: number;
  teleop: number;
}
export interface LiveScore {
  endgame: EndgamePointType[];
  initiation_line_crossed: boolean[];
  penalties: Penalties;
  power_cells: ModeScoreFor_PowerCellCounts;
  rung_level: boolean;
}
export interface Penalties {
  fouls: number;
  tech_fouls: number;
}
export interface ModeScoreFor_PowerCellCounts {
  auto: PowerCellCounts;
  teleop: PowerCellCounts;
}
export interface PowerCellCounts {
  bottom: number;
  inner: number;
  outer: number;
}
export interface MatchScore {
  blue: LiveScore;
  red: LiveScore;
}
export interface SerialisedMatchGeneration {
  matches: SerializedMatch[];
  record?: MatchGenerationRecord | null;
  running: boolean;
}
export interface MatchGenerationRecord {
  data?: MatchGenerationRecordData | null;
  match_type: MatchType;
}
export interface ScoreUpdateData {
  alliance: Alliance;
  update: ScoreUpdate;
}
export interface QualsMatchGeneratorParams {
  station_anneal_steps: number;
  team_anneal_steps: number;
}