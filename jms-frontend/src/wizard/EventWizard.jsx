import { faExclamationTriangle, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Col, Container, Nav, Row, Tab } from "react-bootstrap";
import ConfigureEvent from "./ConfigureEvent";
import ConfigureSchedule from "./ConfigureSchedule";
import ConfigureTeams from "./ConfigureTeams";

const EK_WELCOME = 'welcome';

function Welcome() {
  return <div>
    <h4>Welcome to the Event Wizard</h4>
    <br/>
    <p> Welcome to the Event Wizard. The Event Wizard goes through event configuration step-by-step to ensure your event runs appropriately. </p>
    <p> Select from the tabs on the left to start configuring your event, starting with the event details. More options will become available as the event
      progresses. </p>
    <p className="text-muted"> <FontAwesomeIcon icon={faInfoCircle} /> &nbsp; <i> You can also use JMS without loading event data to run test matches only. </i> </p>
  </div>
}

export default class EventWizard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    let {event, teams, schedule, ws} = this.props;

    let navItemFor = (data, cls) => {
      let disabled = cls.isDisabled?.(data) || false;
      let attention = !disabled && (cls.needsAttention?.(data) || false);

      return <Nav.Item>
        <Nav.Link className={ attention ? "wizard-attention" : "" } eventKey={cls.eventKey()} disabled={disabled}> 
          { attention ? <FontAwesomeIcon icon={faExclamationTriangle} /> : "" } &nbsp;
          { cls.tabName(data) }
        </Nav.Link>
      </Nav.Item>
    };

    let paneFor = (el) => <Tab.Pane eventKey={el.type.eventKey()}>
      {el}
    </Tab.Pane>
    
    return <Container fluid className="px-5">
      <h2>Event Wizard { event?.name ? ("- " + event.name) : "" }</h2>
      <hr />
      <Tab.Container defaultActiveKey={EK_WELCOME}>
        <Row>
          <Col md={3} className="vr-right wizard-tabs">
            <Nav variant="pills" className="flex-column">
              <Nav.Item> <Nav.Link eventKey={EK_WELCOME}> &nbsp;Welcome! </Nav.Link> </Nav.Item>

              <br /> <h6 className="text-muted">Pre-Event Config</h6>
              { navItemFor(event, ConfigureEvent) }
              { navItemFor(teams, ConfigureTeams) }

              <br /> <h6 className="text-muted">Qualifications</h6>
              { navItemFor({ teams, blocks: schedule?.blocks }, ConfigureSchedule) }

              <br /> <h6 className="text-muted">Playoffs</h6>
              <br /> <h6 className="text-muted">Awards</h6>
            </Nav>
          </Col>
          <Col md>
            <Tab.Content>
              <br />
              <Tab.Pane eventKey={EK_WELCOME}> <Welcome /> </Tab.Pane>
              { paneFor(<ConfigureEvent event={event} ws={ws} />) }
              { paneFor(<ConfigureTeams teams={teams} ws={ws} />) }
              { paneFor(<ConfigureSchedule teams={teams} blocks={schedule?.blocks} ws={ws} />) }
              <br />
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </Container>
  }
}