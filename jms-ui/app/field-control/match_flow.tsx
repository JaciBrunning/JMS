import "./match_flow.scss";
import React, { useState } from "react";
import { Button, ButtonProps, Col, Row } from "react-bootstrap";
import { ArenaSignal, ArenaState, SerialisedLoadedMatch } from "../ws-schema";
import { withPermission } from "../support/permissions";
import { useWebsocket } from "../support/ws-component";
import { useErrors } from "../support/errors";

export function MatchFlow({ state, current_match }: { state: ArenaState, current_match: SerialisedLoadedMatch | null }) {
  const { call } = useWebsocket();
  const { addError } = useErrors();
  
  const signal = (signal: ArenaSignal) => {
    call<"arena/signal">("arena/signal", { signal })
      .catch(addError);
  }

  if (state?.state === "Estop")
    return <Row>
      <Col>
        <MatchFlowButton
          arenaState={state}
          variant="estop-reset"
          onClick={() => signal("EstopReset")}
        />
      </Col>
    </Row>

  return <Row>
    <Col>
      <MatchFlowButton
        arenaState={state}
        targetState="Prestart"
        onClick={() => signal(state?.state == "Prestart" ? "PrestartUndo" : "Prestart")}
        disabled={!(current_match && ((state?.state === "Idle") || (state?.state === "Prestart")))}
      >
        { state?.state == "Prestart" ? "Revert Prestart" : "Prestart" }
      </MatchFlowButton>
    </Col>
    <Col>
      <Button
        className="match-flow-btn"
        data-target="MatchPreview"
        variant="warning"
        disabled={!current_match}
        // onClick={() => this.props.onAudienceDisplay("MatchPreview")}     // TODO:
      >
        Match Preview
      </Button>
    </Col>
    <Col>
      <MatchFlowButton 
        arenaState={state} 
        targetState="MatchArmed"
        variant="hazard-yellow"
        onClick={() => signal({ MatchArm: { force: false } })}
        disabled={!(state?.state === "Prestart")}
      >
        Arm Match
      </MatchFlowButton>
    </Col>
    <Col>
      <MatchFlowButton
        arenaState={state}
        targetState="MatchPlay"
        variant="hazard-yellow"
        onClick={() => signal("MatchPlay")}
        disabled={state?.state !== "MatchArmed"}
      >
        Match Play
      </MatchFlowButton>
    </Col>
    <Col>
      <MatchFlowButton
        arenaState={state}
        onClick={() => signal("MatchCommit")}
        disabled={state?.state !== "MatchComplete"}
      >
        Commit Scores
      </MatchFlowButton>
    </Col>
  </Row>
};

class MatchFlowButton extends React.PureComponent<ButtonProps & { arenaState?: ArenaState, targetState?: ArenaState["state"] }> {
  render() {
    let { arenaState, targetState, className, ...props } = this.props;

    return <Button
      className={`match-flow-btn ${className || ""}`}
      data-target={targetState}
      active={targetState != undefined && arenaState?.state === targetState}
      {...props}
    />
  }
}