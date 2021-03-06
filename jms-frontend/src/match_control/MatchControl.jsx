import Alliance from "./Alliance";
import MatchFlow from "./MatchFlow";
import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import MatchScheduleView from "./MatchScheduleView";

export default class MatchControl extends React.Component {
  constructor(props) {
    super(props);

    props.ws.subscribe("arena", "*");
    props.ws.subscribe("matches", "*");
  }

  render() {
    let { arena, matches, ws } = this.props;

    return <Container>
      <Row>
        <Col>
          <h3> { arena?.match?.match?.name || <i>No Match Loaded</i> } </h3>
        </Col>
        <Col md="auto">
          <Button
            variant="danger"
            onClick={() => ws.send("arena", "match", "unload")}
            disabled={arena?.state?.state !== "Idle" || !!!arena?.match}
          >
            Unload Match
          </Button>
          &nbsp;
          <Button
            variant="warning"
            onClick={() => ws.send("arena", "match", "loadTest")}
            disabled={arena?.state?.state !== "Idle"}
          >
            Load Test Match
          </Button>
        </Col>
      </Row>
      <br />
      <Row >
        <Col>
          <Row>
            <Col>
              <Alliance
                colour="Blue"
                match_loaded={ !!arena?.match }
                state={arena?.state}
                score={arena?.match?.score?.blue}
                stations={arena?.stations?.filter(x => x.station.alliance === "Blue")}
                onStationUpdate={ (data) => ws.send("arena", "alliances", "update", data) }
              />
            </Col>
            <Col>
              <Alliance
                colour="Red"
                flipped
                match_loaded={ !!arena?.match }
                state={arena?.state}
                score={arena?.match?.score?.red}
                stations={arena?.stations?.filter(x => x.station.alliance === "Red").reverse()}  // Red teams go 3-2-1 to order how they're seen from the scoring table
                onStationUpdate={ (data) => ws.send("arena", "alliances", "update", data) }
              />
            </Col>
          </Row>
          <br />
          <MatchFlow
            state={arena?.state}
            match={arena?.match}
            onSignal={(data) => ws.send("arena", "state", "signal", data)}
            onAudienceDisplay={(scene, params) => ws.send("arena", "audience_display", "set", { scene: scene, params: params })}
          />
        </Col>
      </Row>
      <br />
      <Row>
        <Col>
          <MatchScheduleView
            arena={arena}
            matches={matches}
            onLoad={(match) => ws.send("arena", "match", "load", match.id)}
          />
        </Col>
      </Row>
    </Container>
  }
}