import ProgressBar from "react-bootstrap/ProgressBar";
import React from "react";
import { Col, Row } from "react-bootstrap";
import { withVal } from "support/util";

class MatchProgressBar extends React.Component {
  render() {
    const { config, remaining, state, endgame } = this.props;

    let bars = [
      {
        name: "AUTONOMOUS",
        max: config.auto_time.secs,
        state: "Auto",
        complete: ["Pause", "Teleop", "Cooldown", "Complete"]
      },
      {
        name: "TELEOP",
        max: config.teleop_time.secs,
        state: "Teleop",
        complete: ["Cooldown", "Complete"]
      }
    ];

    let total = bars.reduce((a, b) => a + b.max, 0);

    return <React.Fragment>
      {
        bars.map(bar =>
          <ProgressBar
            className="match-progress"
            data-state={ bar.state }
            data-active={ bar.state == state }
            data-fault={ state == "Fault" }
            data-endgame={ endgame }
            style={{
              width: `${bar.max / total * 100}vw`
            }}

            animated={ bar.state == state || state == "Fault" }
            max={ bar.max }
            now={ 
              bar.state == state ? 
              (bar.max - remaining.secs) : 
              bar.complete.find(s => s == state) ? bar.max :
              state == "Fault" ? bar.max : 0 }
          />
        )
      }
    </React.Fragment>
  }
}

class AllianceScore extends React.Component {
  render() {
    const { reverse, colour, score, stations, img, hasrp } = this.props;

    const els = [
      <Col className="score-image">
        {
          withVal(img, () => <img src={`/img/${img}`} />)
        }
      </Col>,
      <Col className="alliance-teams" data-alliance={colour}>
        {
          stations.map(s => 
            <Row 
              className="alliance-team"
              data-bypass={s.bypass}
              data-estop={s.estop || s.astop}
              data-alive={s.ds_report?.robot_ping}
            >
              <Col> { s.team || "\u00A0" } </Col>
            </Row>
          )
        }
      </Col>,
      <Col className="total-score" data-alliance={colour}>
        { score.derived.total_score }
        {
          withVal((hasrp && score.derived.total_bonus_rp) || undefined, bonus => <span className="total-score-bonus-rp">
            +{ score.derived.total_bonus_rp } RP
          </span>)
        }
      </Col>
    ];

    return reverse ? els.reverse() : els;
  }
}

export default class MatchPlay extends React.Component {
  render() {
    const { arena, event } = this.props;
    const { match } = arena;

    const rp = match.match.type == "Qualification";

    return <div className="audience-play">
      <div className="score-block">
        <Row className="m-0 progress-row">
          <MatchProgressBar
            config={match.config}
            remaining={match.remaining_time}
            state={match.state}
            endgame={match.endgame}
          />
          <span className="progress-overlay">
            <Col>
              { match.match.name }
            </Col>
            <Col md={2}>
              { match.state } &nbsp;
              { 
                match.state == "Waiting" 
                  || match.state == "Complete"
                  || `${match.remaining_time.secs}s`
              }
            </Col>
            <Col>
              { event.details.event_name }
            </Col>
          </span>
        </Row>
        <Row className="score-row">
          <AllianceScore
            colour="red"
            img="game/wide-white.png"
            score={match.score.red}
            stations={arena.stations.filter(s => s.station.alliance.toLowerCase() == "red")}
            hasrp={rp}
          />
          <AllianceScore
            colour="blue"
            img="tourney_logo_white.png"
            score={match.score.blue}
            stations={arena.stations.filter(s => s.station.alliance.toLowerCase() == "blue")}
            hasrp={rp}
            reverse
          />
        </Row>
      </div>
    </div>
  }
}