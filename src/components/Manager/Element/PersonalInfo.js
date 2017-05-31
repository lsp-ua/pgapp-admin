import React, { Component } from 'react';
import ClassNames from 'classnames';
import Moment from 'moment';
import {
  Panel,
  Row,
  Col,
  ListGroup,
  ListGroupItem } from 'react-bootstrap';
import PhoneService from '../../../services/phone';

export default class PersonalInfo extends Component {

  get personalInfoNotFound() {
    return (
      <ListGroup>
        <ListGroupItem
          bsStyle="danger"
          className="text-center">
          not found
        </ListGroupItem>
      </ListGroup>
    );
  }

  get fullName() {
    return `${this.props.manager.firstname} ${this.props.manager.lastname}`;
  }

  get birthday() {
    return this.props.manager.birthday
      ? Moment(this.props.manager.birthday).format('MM/DD/YYYY')
      : ' - ';
  }

  get phone() {
    let phone = ' - ';

    //Phone mask
    if (this.props.manager.phone) {
      phone = PhoneService.phoneMask(this.props.manager.phone);
    }

    return phone;
  }

  render() {
    const labelClass = ClassNames('text-right', 'text-muted');
    const manager = this.props.manager || {};

    return (
      <div>
        <Panel collapsible defaultExpanded header={<span>Personal info</span>} className="personal-info">
        {(manager.uuid)
          ? <div>
              <Row>
                <Col lg={4} className={labelClass}>Full Name:</Col>
                <Col lg={8}>{this.fullName}</Col>
              </Row>
              <Row>
                <Col lg={4} className={labelClass}>Email:</Col>
                <Col lg={8}>{manager.email}</Col>
              </Row>
              <Row>
                <Col lg={4} className={labelClass}>Phone number:</Col>
                <Col lg={8}>{this.phone}</Col>
              </Row>
            </div>
          : this.personalInfoNotFound }
        </Panel>
      </div>
    );
  }
}
