import React, { Component } from 'react'
import { Link } from 'react-router'
import ClassNames from 'classnames'
import Moment from 'moment'
import { Panel, Row, Col, ListGroup, ListGroupItem } from 'react-bootstrap'

import PhoneService from '../../../services/phone'
import { DecoratorAddress } from '../../../services/Decorator'
import * as helpers from '../../../services/helpers'

import * as CONSTANT from '../../../constants/professional'

export default class PersonalInfo extends Component {

  getStatus({status, note}) {
    let bsStyle = '';
    let rejectNote = '';
    switch (status) {
      case CONSTANT.PROFESSIONAL_STATUS.REJECT:
        bsStyle = 'text-warning';
        rejectNote = `(note: ${note})`;
        break;
      case CONSTANT.PROFESSIONAL_STATUS.BAN:
        bsStyle = 'text-danger';
        rejectNote = `(note: ${note})`;
        break;
      case CONSTANT.PROFESSIONAL_STATUS.WAITING_APPROVAL:
        bsStyle = 'text-info';
        break;
      case CONSTANT.PROFESSIONAL_STATUS.AVAILABLE:
        bsStyle = 'text-success';
        break;
      default:
        bsStyle = '';
        break;
    }

    return (
      <Row>
        <Col lg={4} className="text-right text-muted">Status:</Col>
        <Col lg={8}>
          <strong><span className={bsStyle}>{status}</span></strong> {rejectNote}
        </Col>
      </Row>
    );
  }

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

  get selfie() {
    const selfie = this.props.professional.selfie
      ? <img className="avatar"
             alt="avatar"
             src={this.props.professional.selfie} />
      : <div className="avatar default"></div>;

    return selfie;
  }

  get governmentFront() {
    const governmentFront = this.props.professional.tax &&
                            this.props.professional.tax.image_of_government &&
                            this.props.professional.tax.image_of_government.front
      ? <img className="government"
             alt="government"
             src={this.props.professional.tax.image_of_government.front} />
      : <div className="government default-front"></div>;

    return governmentFront;
  }

  get governmentBack() {
    let governmentBack = this.props.professional.tax &&
                         this.props.professional.tax.image_of_government &&
                         this.props.professional.tax.image_of_government.back
      ? <img className="government"
             alt="government"
             src={this.props.professional.tax.image_of_government.back} />
      : <div className="government default-back"></div>;

    return governmentBack;
  }

  get ssn() {
    const ssn = this.props.professional.tax && this.props.professional.tax.ssn
      ? this.props.professional.tax.ssn
      : ' - ';

    return ssn;
  }

  get referredBy() {
    const referredBy = this.props.professional.referred_by &&
                       this.props.professional.referred_by.firstname &&
                       this.props.professional.referred_by.lastname
      ? <Link to={`/professional/${this.props.professional.referred_by.uuid}`}>
          {this.props.professional.referred_by.firstname} {this.props.professional.referred_by.lastname}
        </Link>
      : ' - ';

    return referredBy;
  }

  get birthday() {
    const birthday = this.props.professional.birthday
      ? Moment(this.props.professional.birthday).format('MM/DD/YYYY')
      : ' - ';

    return birthday;
  }

  get phone() {
    let phone = ' - ';

    //Phone mask
    if (this.props.professional.phone) {
      phone = PhoneService.phoneMask(this.props.professional.phone);
    }

    return phone;
  }

  get aboutUsAnswer() {
    const aboutUsAnswer = this.props.professional.about_us_answer &&
                          this.props.professional.about_us_answer.name
      ? this.props.professional.about_us_answer.name
      : ' - ';

    return aboutUsAnswer;
  }

  render() {
    const labelClass = ClassNames('text-right', 'text-muted');
    const professional = this.props.professional || {};

    return (
      <div>
        <Panel collapsible defaultExpanded header={<span>Personal info</span>} className="personal-info">
        {(professional.uuid)
          ? <div>
              {this.getStatus(professional)}
              <Row>
                <Col lg={4} className={labelClass}>Profile Picture:</Col>
                <Col lg={8}>{this.selfie}</Col>
              </Row>
              <Row>
                <Col lg={4} className={labelClass}>Full Name:</Col>
                <Col lg={8}>
                  {helpers.concatValues([
                    professional.firstname,
                    professional.lastname
                  ])}
                </Col>
              </Row>
              <Row>
                <Col lg={4} className={labelClass}>Email:</Col>
                <Col lg={8}>{professional.email}</Col>
              </Row>
              <Row>
                <Col lg={4} className={labelClass}>DOB:</Col>
                <Col lg={8}>{this.birthday}</Col>
              </Row>
              <Row>
                <Col lg={4} className={labelClass}>Phone number:</Col>
                <Col lg={8}>{this.phone}</Col>
              </Row>
              <Row>
                <Col lg={4} className={labelClass}>Full Address:</Col>
                <div className="col-lg-8">{DecoratorAddress.getValue(professional.address)}</div>
              </Row>
              <Row>
                <Col lg={4} className={labelClass}>Referred by:</Col>
                <Col lg={8}>{this.referredBy}</Col>
              </Row>
              <Row>
                <Col lg={4} className={labelClass}>How did you hear about us?</Col>
                <Col lg={8}>{this.aboutUsAnswer}</Col>
              </Row>
              <Row>
                <Col lg={4} className={labelClass}>SSN:</Col>
                <Col lg={8}>{this.ssn}</Col>
              </Row>
              <Row>
                <Col lg={4} className={labelClass}>Government ID Front:</Col>
                <Col lg={8}>{this.governmentFront}</Col>
              </Row>
              <Row>
                <Col lg={4} className={labelClass}>Government ID Back:</Col>
                <Col lg={8}>{this.governmentBack}</Col>
              </Row>
            </div>
          : this.personalInfoNotFound }
        </Panel>
      </div>
    );
  }
}
