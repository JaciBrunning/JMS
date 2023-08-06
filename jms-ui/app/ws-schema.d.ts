/* eslint-disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

/**
 * This interface was referenced by `TempWebsocketRootSchema`'s JSON-Schema
 * via the `definition` "Alliance".
 */
export type Alliance = "blue" | "red";
/**
 * This interface was referenced by `TempWebsocketRootSchema`'s JSON-Schema
 * via the `definition` "AllianceStationUpdate".
 */
export type AllianceStationUpdate =
  | {
      id: AllianceStationId;
    }
  | {
      team: number | null;
    }
  | {
      bypass: boolean;
    }
  | {
      estop: boolean;
    }
  | {
      astop: boolean;
    };
/**
 * This interface was referenced by `TempWebsocketRootSchema`'s JSON-Schema
 * via the `definition` "ArenaSignal".
 */
export type ArenaSignal =
  | ("Estop" | "EstopReset" | "Prestart" | "PrestartUndo" | "MatchPlay" | "MatchCommit")
  | {
      MatchArm: {
        force: boolean;
      };
    };
/**
 * This interface was referenced by `TempWebsocketRootSchema`'s JSON-Schema
 * via the `definition` "ArenaState".
 */
export type ArenaState =
  | {
      state: "Init";
    }
  | {
      state: "Reset";
    }
  | {
      state: "Idle";
    }
  | {
      state: "Estop";
    }
  | {
      state: "Prestart";
    }
  | {
      state: "MatchArmed";
    }
  | {
      state: "MatchPlay";
    }
  | {
      state: "MatchComplete";
    };
/**
 * This interface was referenced by `TempWebsocketRootSchema`'s JSON-Schema
 * via the `definition` "AuthResult".
 */
export type AuthResult =
  | {
      token: UserToken;
      type: "AuthSuccess";
      user: User;
    }
  | {
      token: UserToken;
      type: "AuthSuccessNewPin";
      user: User;
    }
  | {
      type: "NoToken";
    };
/**
 * This interface was referenced by `TempWebsocketRootSchema`'s JSON-Schema
 * via the `definition` "Permission".
 */
export type Permission =
  | "Admin"
  | "FTA"
  | "FTAA"
  | "Scorekeeper"
  | "ManageEvent"
  | "ManageTeams"
  | "ManageSchedule"
  | "ManagePlayoffs"
  | "ManageAwards"
  | "MatchFlow"
  | "Estop"
  | "Scoring";
/**
 * This interface was referenced by `TempWebsocketRootSchema`'s JSON-Schema
 * via the `definition` "WinStatus".
 */
export type WinStatus = "WIN" | "LOSS" | "TIE";
/**
 * This interface was referenced by `TempWebsocketRootSchema`'s JSON-Schema
 * via the `definition` "RobotState".
 */
export type RobotState = "Auto" | "Test" | "Teleop";
/**
 * This interface was referenced by `TempWebsocketRootSchema`'s JSON-Schema
 * via the `definition` "EndgameType".
 */
export type EndgameType = "None" | "Parked" | "Docked";
/**
 * This interface was referenced by `TempWebsocketRootSchema`'s JSON-Schema
 * via the `definition` "GamepieceType".
 */
export type GamepieceType = "None" | "Cone" | "Cube";
/**
 * This interface was referenced by `TempWebsocketRootSchema`'s JSON-Schema
 * via the `definition` "MatchSubtype".
 */
export type MatchSubtype = "Quarterfinal" | "Semifinal" | "Final";
/**
 * This interface was referenced by `TempWebsocketRootSchema`'s JSON-Schema
 * via the `definition` "MatchType".
 */
export type MatchType = "Test" | "Qualification" | "Playoff";
/**
 * This interface was referenced by `TempWebsocketRootSchema`'s JSON-Schema
 * via the `definition` "MatchPlayState".
 */
export type MatchPlayState = "Waiting" | "Warmup" | "Auto" | "Pause" | "Teleop" | "Cooldown" | "Complete" | "Fault";
/**
 * This interface was referenced by `TempWebsocketRootSchema`'s JSON-Schema
 * via the `definition` "PlayoffMode".
 */
export type PlayoffMode =
  | {
      mode: "Bracket";
      n_alliances: number;
    }
  | {
      awards: string[];
      mode: "DoubleBracket";
      n_alliances: number;
      time_per_award: number;
    }
  | {
      mode: "RoundRobin";
      n_alliances: number;
    };
/**
 * This interface was referenced by `TempWebsocketRootSchema`'s JSON-Schema
 * via the `definition` "ScheduleBlockType".
 */
export type ScheduleBlockType =
  | {
      type: "General";
    }
  | {
      type: "Ceremonies";
    }
  | {
      type: "Lunch";
    }
  | {
      type: "FieldTests";
    }
  | {
      type: "SetupTeardown";
    }
  | {
      cycle_time: number;
      type: "Qualification";
    }
  | {
      type: "Playoff";
    };
/**
 * This interface was referenced by `TempWebsocketRootSchema`'s JSON-Schema
 * via the `definition` "ScheduleBlockUpdate".
 */
export type ScheduleBlockUpdate =
  | {
      id: string;
    }
  | {
      block_type: ScheduleBlockType;
    }
  | {
      name: string;
    }
  | {
      start_time: string;
    }
  | {
      end_time: string;
    };
/**
 * This interface was referenced by `TempWebsocketRootSchema`'s JSON-Schema
 * via the `definition` "ScoreUpdate".
 */
export type ScoreUpdate =
  | {
      Mobility: {
        crossed: boolean;
        station: number;
      };
    }
  | {
      Community: {
        auto: boolean;
        col: number;
        gamepiece: GamepieceType;
        row: number;
      };
    }
  | {
      AutoDocked: {
        docked: boolean;
      };
    }
  | {
      ChargeStationLevel: {
        auto: boolean;
        level: boolean;
      };
    }
  | {
      Endgame: {
        endgame: EndgameType;
        station: number;
      };
    }
  | {
      Penalty: {
        fouls?: number;
        tech_fouls?: number;
      };
    };
/**
 * This interface was referenced by `TempWebsocketRootSchema`'s JSON-Schema
 * via the `definition` "TeamUpdate".
 */
export type TeamUpdate =
  | {
      number: number;
    }
  | {
      display_number: string;
    }
  | {
      name: string | null;
    }
  | {
      affiliation: string | null;
    }
  | {
      location: string | null;
    }
  | {
      notes: string | null;
    }
  | {
      wpakey: string;
    }
  | {
      schedule: boolean;
    };
/**
 * This interface was referenced by `TempWebsocketRootSchema`'s JSON-Schema
 * via the `definition` "UserUpdate".
 */
export type UserUpdate =
  | {
      username: string;
    }
  | {
      realname: string;
    }
  | {
      pin_hash: string | null;
    }
  | {
      pin_is_numeric: boolean;
    }
  | {
      permissions: Permission[];
    }
  | {
      tokens: string[];
    };
/**
 * This interface was referenced by `TempWebsocketRootSchema`'s JSON-Schema
 * via the `definition` "WebsocketPublish".
 */
export type WebsocketPublish =
  | {
      data: ArenaState;
      path: "arena/state";
    }
  | {
      data: SerialisedLoadedMatch | null;
      path: "arena/current_match";
    }
  | {
      data: AllianceStation[];
      path: "arena/stations";
    }
  | {
      data: DriverStationReport[];
      path: "arena/ds";
    }
  | {
      data: Match[];
      path: "matches/matches";
    }
  | {
      data: Match | null;
      path: "matches/next";
    }
  | {
      data: boolean;
      path: "matches/generator_busy";
    }
  | {
      data: EventDetails;
      path: "event/details";
    }
  | {
      data: MatchScoreSnapshot;
      path: "scoring/current";
    }
  | {
      data: Team[];
      path: "team/teams";
    }
  | {
      data: Award[];
      path: "awards/awards";
    }
  | {
      data: string;
      path: "debug/test_publish";
    }
  | {
      /**
       * @minItems 2
       * @maxItems 2
       */
      data: [string, JmsComponent[]];
      path: "components/components";
    };
/**
 * This interface was referenced by `TempWebsocketRootSchema`'s JSON-Schema
 * via the `definition` "WebsocketRpcRequest".
 */
export type WebsocketRpcRequest =
  | {
      data: {
        signal: ArenaSignal;
      };
      path: "arena/signal";
    }
  | {
      data: {
        match_id: string;
      };
      path: "arena/load_match";
    }
  | {
      data: null;
      path: "arena/load_test_match";
    }
  | {
      data: null;
      path: "arena/unload_match";
    }
  | {
      data: {
        station_id: AllianceStationId;
        updates: AllianceStationUpdate[];
      };
      path: "arena/update_station";
    }
  | {
      data: null;
      path: "user/auth_with_token";
    }
  | {
      data: {
        pin: string;
        username: string;
      };
      path: "user/auth_with_pin";
    }
  | {
      data: {
        pin: string;
      };
      path: "user/update_pin";
    }
  | {
      data: null;
      path: "user/logout";
    }
  | {
      data: null;
      path: "user/users";
    }
  | {
      data: {
        permissions: Permission[];
        realname: string;
        username: string;
      };
      path: "user/new";
    }
  | {
      data: {
        updates: UserUpdate[];
        username: string;
      };
      path: "user/update";
    }
  | {
      data: {
        user_id: string;
      };
      path: "user/delete";
    }
  | {
      data: {
        match_id: string;
      };
      path: "matches/delete";
    }
  | {
      data: {
        params: QualsMatchGeneratorParams;
      };
      path: "matches/gen_quals";
    }
  | {
      data: null;
      path: "matches/get_playoff_mode";
    }
  | {
      data: {
        mode: PlayoffMode;
      };
      path: "matches/set_playoff_mode";
    }
  | {
      data: {
        details: EventDetails;
      };
      path: "event/update";
    }
  | {
      data: null;
      path: "event/schedule_get";
    }
  | {
      data: {
        block_type: ScheduleBlockType;
        end: string;
        name: string;
        start: string;
      };
      path: "event/schedule_new_block";
    }
  | {
      data: {
        block_id: string;
      };
      path: "event/schedule_delete";
    }
  | {
      data: {
        block_id: string;
        updates: ScheduleBlockUpdate[];
      };
      path: "event/schedule_edit";
    }
  | {
      data: {
        update: ScoreUpdateData;
      };
      path: "scoring/score_update";
    }
  | {
      data: {
        affiliation: string | null;
        display_number: string;
        location: string | null;
        name: string | null;
        team_number: number;
      };
      path: "team/new_team";
    }
  | {
      data: {
        team_number: number;
        updates: TeamUpdate[];
      };
      path: "team/update";
    }
  | {
      data: {
        team_number: number;
      };
      path: "team/delete";
    }
  | {
      data: {
        award: Award;
      };
      path: "awards/set_award";
    }
  | {
      data: {
        award_id: string;
      };
      path: "awards/delete_award";
    }
  | {
      data: {
        in_text: string;
      };
      path: "debug/test_endpoint";
    };
/**
 * This interface was referenced by `TempWebsocketRootSchema`'s JSON-Schema
 * via the `definition` "WebsocketRpcResponse".
 */
export type WebsocketRpcResponse =
  | {
      data: null;
      path: "arena/signal";
    }
  | {
      data: null;
      path: "arena/load_match";
    }
  | {
      data: null;
      path: "arena/load_test_match";
    }
  | {
      data: null;
      path: "arena/unload_match";
    }
  | {
      data: null;
      path: "arena/update_station";
    }
  | {
      data: AuthResult;
      path: "user/auth_with_token";
    }
  | {
      data: AuthResult;
      path: "user/auth_with_pin";
    }
  | {
      data: User;
      path: "user/update_pin";
    }
  | {
      data: null;
      path: "user/logout";
    }
  | {
      data: User[];
      path: "user/users";
    }
  | {
      data: User;
      path: "user/new";
    }
  | {
      data: User;
      path: "user/update";
    }
  | {
      data: null;
      path: "user/delete";
    }
  | {
      data: null;
      path: "matches/delete";
    }
  | {
      data: null;
      path: "matches/gen_quals";
    }
  | {
      data: PlayoffMode;
      path: "matches/get_playoff_mode";
    }
  | {
      data: PlayoffMode;
      path: "matches/set_playoff_mode";
    }
  | {
      data: EventDetails;
      path: "event/update";
    }
  | {
      data: ScheduleBlock[];
      path: "event/schedule_get";
    }
  | {
      data: ScheduleBlock;
      path: "event/schedule_new_block";
    }
  | {
      data: null;
      path: "event/schedule_delete";
    }
  | {
      data: ScheduleBlock;
      path: "event/schedule_edit";
    }
  | {
      data: MatchScoreSnapshot;
      path: "scoring/score_update";
    }
  | {
      data: Team;
      path: "team/new_team";
    }
  | {
      data: Team;
      path: "team/update";
    }
  | {
      data: null;
      path: "team/delete";
    }
  | {
      data: Award;
      path: "awards/set_award";
    }
  | {
      data: null;
      path: "awards/delete_award";
    }
  | {
      data: string;
      path: "debug/test_endpoint";
    };

export interface TempWebsocketRootSchema {
  [k: string]: unknown;
}
/**
 * This interface was referenced by `TempWebsocketRootSchema`'s JSON-Schema
 * via the `definition` "AllianceStation".
 */
export interface AllianceStation {
  astop: boolean;
  bypass: boolean;
  estop: boolean;
  id: AllianceStationId;
  team?: number | null;
}
/**
 * This interface was referenced by `TempWebsocketRootSchema`'s JSON-Schema
 * via the `definition` "AllianceStationId".
 */
export interface AllianceStationId {
  alliance: Alliance;
  station: number;
}
/**
 * This interface was referenced by `TempWebsocketRootSchema`'s JSON-Schema
 * via the `definition` "UserToken".
 */
export interface UserToken {
  token: string;
  user: string;
}
/**
 * This interface was referenced by `TempWebsocketRootSchema`'s JSON-Schema
 * via the `definition` "User".
 */
export interface User {
  permissions: Permission[];
  pin_hash?: string | null;
  pin_is_numeric: boolean;
  realname: string;
  tokens: string[];
  username: string;
}
/**
 * This interface was referenced by `TempWebsocketRootSchema`'s JSON-Schema
 * via the `definition` "Award".
 */
export interface Award {
  id: string;
  name: string;
  recipients: AwardRecipient[];
}
/**
 * This interface was referenced by `TempWebsocketRootSchema`'s JSON-Schema
 * via the `definition` "AwardRecipient".
 */
export interface AwardRecipient {
  awardee?: string | null;
  team?: string | null;
}
/**
 * This interface was referenced by `TempWebsocketRootSchema`'s JSON-Schema
 * via the `definition` "DerivedScore".
 */
export interface DerivedScore {
  activation_rp: boolean;
  auto_docked_points: number;
  community_points: ModeScoreForInt;
  endgame_points: number;
  link_count: number;
  link_points: number;
  meets_coopertition: boolean;
  mobility_points: number;
  mode_score: ModeScoreForInt;
  penalty_score: number;
  sustainability_rp: boolean;
  sustainability_threshold: number;
  total_bonus_rp: number;
  total_rp: number;
  total_score: number;
  win_rp: number;
  win_status: WinStatus;
}
/**
 * This interface was referenced by `TempWebsocketRootSchema`'s JSON-Schema
 * via the `definition` "ModeScore_for_int".
 */
export interface ModeScoreForInt {
  auto: number;
  teleop: number;
}
/**
 * This interface was referenced by `TempWebsocketRootSchema`'s JSON-Schema
 * via the `definition` "DriverStationReport".
 */
export interface DriverStationReport {
  actual_station?: AllianceStationId | null;
  battery_voltage: number;
  estop: boolean;
  mode: RobotState;
  pkts_lost: number;
  pkts_sent: number;
  radio_ping: boolean;
  rio_ping: boolean;
  robot_ping: boolean;
  rtt: number;
  team: number;
}
/**
 * This interface was referenced by `TempWebsocketRootSchema`'s JSON-Schema
 * via the `definition` "EventDetails".
 */
export interface EventDetails {
  av_chroma_key: string;
  av_event_colour: string;
  code?: string | null;
  event_name?: string | null;
  webcasts: string[];
}
/**
 * This interface was referenced by `TempWebsocketRootSchema`'s JSON-Schema
 * via the `definition` "JmsComponent".
 */
export interface JmsComponent {
  id: string;
  last_tick: string;
  name: string;
  symbol: string;
  timeout_ms: number;
}
/**
 * This interface was referenced by `TempWebsocketRootSchema`'s JSON-Schema
 * via the `definition` "LiveScore".
 */
export interface LiveScore {
  auto_docked: boolean;
  charge_station_level: ModeScoreFor_Boolean;
  community: ModeScoreFor_ArrayOf_ArrayOf_GamepieceType;
  endgame: EndgameType[];
  mobility: boolean[];
  penalties: Penalties;
}
/**
 * This interface was referenced by `TempWebsocketRootSchema`'s JSON-Schema
 * via the `definition` "ModeScore_for_Boolean".
 */
export interface ModeScoreFor_Boolean {
  auto: boolean;
  teleop: boolean;
}
/**
 * This interface was referenced by `TempWebsocketRootSchema`'s JSON-Schema
 * via the `definition` "ModeScore_for_Array_of_Array_of_GamepieceType".
 */
export interface ModeScoreFor_ArrayOf_ArrayOf_GamepieceType {
  auto: GamepieceType[][];
  teleop: GamepieceType[][];
}
/**
 * This interface was referenced by `TempWebsocketRootSchema`'s JSON-Schema
 * via the `definition` "Penalties".
 */
export interface Penalties {
  fouls: number;
  tech_fouls: number;
}
/**
 * This interface was referenced by `TempWebsocketRootSchema`'s JSON-Schema
 * via the `definition` "Match".
 */
export interface Match {
  blue_alliance?: number | null;
  blue_teams: (number | null)[];
  id: string;
  match_number: number;
  match_subtype?: MatchSubtype | null;
  match_type: MatchType;
  name: string;
  played: boolean;
  ready: boolean;
  red_alliance?: number | null;
  red_teams: (number | null)[];
  set_number: number;
  start_time: string;
  winner?: Alliance | null;
}
/**
 * This interface was referenced by `TempWebsocketRootSchema`'s JSON-Schema
 * via the `definition` "MatchScoreSnapshot".
 */
export interface MatchScoreSnapshot {
  blue: SnapshotScore;
  red: SnapshotScore;
}
/**
 * This interface was referenced by `TempWebsocketRootSchema`'s JSON-Schema
 * via the `definition` "SnapshotScore".
 */
export interface SnapshotScore {
  derived: DerivedScore;
  live: LiveScore;
}
/**
 * This interface was referenced by `TempWebsocketRootSchema`'s JSON-Schema
 * via the `definition` "QualsMatchGeneratorParams".
 */
export interface QualsMatchGeneratorParams {
  station_anneal_steps: number;
  team_anneal_steps: number;
}
/**
 * This interface was referenced by `TempWebsocketRootSchema`'s JSON-Schema
 * via the `definition` "ScheduleBlock".
 */
export interface ScheduleBlock {
  block_type: ScheduleBlockType;
  end_time: string;
  id: string;
  name: string;
  start_time: string;
}
/**
 * This interface was referenced by `TempWebsocketRootSchema`'s JSON-Schema
 * via the `definition` "ScoreUpdateData".
 */
export interface ScoreUpdateData {
  alliance: Alliance;
  update: ScoreUpdate;
}
/**
 * This interface was referenced by `TempWebsocketRootSchema`'s JSON-Schema
 * via the `definition` "SerialisedLoadedMatch".
 */
export interface SerialisedLoadedMatch {
  endgame: boolean;
  match_id: string;
  remaining: number;
  state: MatchPlayState;
}
/**
 * This interface was referenced by `TempWebsocketRootSchema`'s JSON-Schema
 * via the `definition` "Team".
 */
export interface Team {
  affiliation?: string | null;
  display_number: string;
  location?: string | null;
  name?: string | null;
  notes?: string | null;
  number: number;
  schedule: boolean;
  wpakey: string;
}
