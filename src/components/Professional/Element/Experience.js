import React, { Component } from 'react';
import { Panel, Row, Col, ListGroup, ListGroupItem } from 'react-bootstrap';

export default class Experience extends Component {

  getPositionItem(element, index) {
    return (
      <ListGroupItem bsStyle="info" key={index}>
        <Row>
          <Col lg={3}>{element.position.name}:</Col>
          <Col lg={9}>{element.time_frame.name}</Col>
        </Row>
      </ListGroupItem>
    );
  }

  get notFound() {
    return (
      <ListGroupItem
        bsStyle="danger"
        className="text-center">
        not found
      </ListGroupItem>
    );
  }

  render() {
    let experience = this.props.professional.experience || {};

    return (
      <div>
        <Panel collapsible defaultExpanded header={<span>Experience</span>} className="experience">
          <div>
            <h3>Positions</h3>
            <ListGroup>
              { (experience.positions)
                ? experience.positions.map((element, index) => {
                    return this.getPositionItem(element, index);
                  })
                : this.notFound
              }
            </ListGroup>
            <h3>POS</h3>
            <ListGroup>
              { (experience.poses)
                ? experience.poses.map((element, index) => {
                    return <ListGroupItem bsStyle="info" key={index}>{element.name}</ListGroupItem>;
                  })
                : this.notFound
              }
            </ListGroup>
          </div>
        </Panel>
      </div>
    );
  }
}
