import React, { Component } from 'react';
import ClassNames from 'classnames';
import {
  Panel,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Checkbox,
  ControlLabel,
  FormGroup,
  FormControl } from 'react-bootstrap';
import PhoneService from '../../../services/phone';
import EmailService from '../../../services/email';

import * as NOTIFICATION_CONSTANT from '../../../constants/notification';

export default class Reference extends Component {

  constructor(props) {
    super(props);

    let email = [];
    let opt_in = [];
    let note = [];
    let email_error = [];
    if (this.props.professional.reference) {
      this.props.professional.reference.forEach((element, index) => {
        email.push(element.email);
        opt_in.push(element.opt_in || false);
        note.push(element.note || '');
        email_error.push(null);
      });
    }

    this.state = {
      email,
      opt_in,
      note,
      email_error
    };

    console.log(this.state);
  }

  getValidationEmail(index) {
    return this.state.email_error[index];
  }

  saveReference(index, type) {
    //Validation
    if (this.state.email_error[index] !== null) {
      this.props.appActions.addNotification({
        type: NOTIFICATION_CONSTANT.TYPE.DANGER,
        message: 'Email is not valid'
      });
      return;
    }

    let body = [...this.props.professional.reference];

    if (body[index][type] === this.state[type][index] ||
       (!body[index][type] && this.state[type][index] === "")) {
      console.log('Not changes');
      return;
    }

    body[index][type] = this.state[type][index] || "";
    this.props.professionalActions.saveReference(this.props.professional.uuid, body)
      .then(response => {
        this.props.appActions.addNotification({
          type: NOTIFICATION_CONSTANT.TYPE.SUCCESS,
          message: 'References was saved success'
        });
      });
  }

  handleChangeReferenceField(index, type, e) {
    let data = this.state[type];
    data[index] = type === 'opt_in' ? e.target.checked : e.target.value;

    this.setState({
      [type]: data
    });

    //Check email
    if (type === 'email') {
      let dataError = this.state.email_error;
      dataError[index] = EmailService.validateEmail(e.target.value) || !e.target.value ? null : 'error';

      this.setState({
        email_error: dataError
      });
    }

    if (type === 'opt_in') {
      this.saveReference(index, type);
    }
  }

  referenceElement(element, index) {
    const labelClass = ClassNames('text-right', 'text-muted');

    return (
      <div key={index}>
        <h3>{index+1} Reference</h3>
        <ListGroup>
          <ListGroupItem bsStyle="info">
            <Row>
              <Col lg={3} className={labelClass}>Full Name:</Col>
              <Col lg={9}>{element.name}</Col>
            </Row>
            <Row>
              <Col lg={3} className={labelClass}>Type:</Col>
              <Col lg={9}>{element.type}</Col>
            </Row>
            <Row>
              <Col lg={3} className={labelClass}>Venue:</Col>
              <Col lg={9}>{element.venue_name}</Col>
            </Row>
            <Row>
              <Col lg={3} className={labelClass}>Phone number:</Col>
              <Col lg={9}>{PhoneService.phoneMask(element.phone)}</Col>
            </Row>
            <Row>
              <Col lg={12}>
                  <FormGroup
                    controlId="formEmail"
                    validationState={this.getValidationEmail(index)}
                    className="email-box">
                    <ControlLabel>Email address</ControlLabel>
                    <FormControl
                      type="email"
                      label="Email address"
                      placeholder="Enter email"
                      value={this.state.email[index]}
                      onBlur={this.saveReference.bind(this, index, 'email')}
                      onChange={this.handleChangeReferenceField.bind(this, index, 'email')} />
                  </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col lg={12}>
                <Checkbox
                  checked={this.state.opt_in[index]}
                  onChange={this.handleChangeReferenceField.bind(this, index, 'opt_in')} >
                  email opt-in
                </Checkbox>
              </Col>
            </Row>
            <Row>
              <Col lg={12}>
                <ControlLabel>Comment</ControlLabel>
                <FormControl
                  componentClass="textarea"
                  placeholder="Add a comment ..."
                  value={this.state.note[index]}
                  onBlur={this.saveReference.bind(this, index, 'note')}
                  onChange={this.handleChangeReferenceField.bind(this, index, 'note')}
                />
              </Col>
            </Row>
          </ListGroupItem>
        </ListGroup>
      </div>
    );
  };

  get referenceNotFound() {
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

  render() {
    let reference = this.props.professional.reference;

    return (
      <div>
        <Panel collapsible defaultExpanded header={<span>References</span>} className="references">

          { (reference)
            ? reference.map((element, index) => {
              return this.referenceElement(element, index)
            })
            : this.referenceNotFound
          }
        </Panel>
      </div>
    );
  }
}
