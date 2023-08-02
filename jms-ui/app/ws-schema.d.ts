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
  | "MatchFlow"
  | "Estop";
/**
 * This interface was referenced by `TempWebsocketRootSchema`'s JSON-Schema
 * via the `definition` "RobotState".
 */
export type RobotState = "Auto" | "Test" | "Teleop";
/**
 * This interface was referenced by `TempWebsocketRootSchema`'s JSON-Schema
 * via the `definition` "MatchPlayState".
 */
export type MatchPlayState = "Waiting" | "Warmup" | "Auto" | "Pause" | "Teleop" | "Cooldown" | "Complete" | "Fault";
/**
 * This interface was referenced by `TempWebsocketRootSchema`'s JSON-Schema
 * via the `definition` "ScheduleBlockType".
 */
export type ScheduleBlockType = "General" | "Qualification" | "Playoff";
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
      data: JmsComponent[];
      path: "components/components";
    }
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
      data: string;
      path: "debug/test_publish";
    }
  | {
      data: EventDetails;
      path: "event/details";
    }
  | {
      data: Team[];
      path: "team/teams";
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
        in_text: string;
      };
      path: "debug/test_endpoint";
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
      data: string;
      path: "debug/test_endpoint";
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
 * via the `definition` "ScheduleBlock".
 */
export interface ScheduleBlock {
  block_type: ScheduleBlockType;
  cycle_time: number;
  end_time: string;
  id: string;
  name: string;
  start_time: string;
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
