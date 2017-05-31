import React, { Component } from 'react';

import {
  PageHeader,
  Form,
  FormControl,
  ControlLabel,
  Row,
  Col,
  FormGroup,
  Button } from 'react-bootstrap';
import Modal, { Footer, Header, Title, Body } from 'react-bootstrap/lib/Modal';
import Loading from '../../Loading';

import PersonalInfo from './PersonalInfo';
import Experience from './Experience';
import Reference from './Reference';
import Invite from './Invite';
import StringService from '../../../services/string';

import * as CONSTANT from '../../../constants/professional';
import * as NOTIFICATION_CONSTANT from '../../../constants/notification';

import './Element.css'

export default class ProfessionalElement extends Component {

  constructor(props) {
    super(props);

    this.professionalActions = this.props.componentActions;

    this.state = {
      showRejectModal: false,
      rejectModalText: '',
      modalStatus: null,
      isLoading: true
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.params.uuid !== this.props.params.uuid) {
      this.setState({
        isLoading: true
      });
      this.getElement(nextProps.params.uuid);
    }
  }

  componentDidMount() {
    this.getElement(this.props.params.uuid);
  }

  getElement(id) {
    return this.professionalActions.getElement(id)
      .then(response => {
        this.setState({ isLoading: false });
        this.setState({ rejectModalText: this.props.componentReducer.professional.note || '' });
      });
  }

  closeRejectModal() {
    this.setState({ showRejectModal: false });
  }

  openRejectModal(status) {
    this.setState({
      showRejectModal: true,
      rejectModalText: '',
      modalStatus: status
    });
  }

  handleApproveClick() {
    let body = {
      status: CONSTANT.PROFESSIONAL_STATUS.APPROVE
    };

    this.professionalActions.changeStatus(this.props.params.uuid, body)
      .then(response => {
        this.props.appActions.addNotification({
          type: NOTIFICATION_CONSTANT.TYPE.SUCCESS,
          message: 'Professional approved'
        });
      });
  }

  handleRejectClick() {
    let body = {
      status: this.state.modalStatus,
      note: this.state.rejectModalText
    };

    let text = 'rejected';
    if (this.state.modalStatus === CONSTANT.PROFESSIONAL_STATUS.BAN) {
      text = 'baned';
    }

    this.professionalActions.changeStatus(this.props.params.uuid, body)
      .then(response => {
        this.closeRejectModal();
        this.setState({ rejectModalText: '' });
        if (response) {
          this.props.appActions.addNotification({
            type: this.state.modalStatus === CONSTANT.PROFESSIONAL_STATUS.REJECT
              ? NOTIFICATION_CONSTANT.TYPE.WARNING
              : NOTIFICATION_CONSTANT.TYPE.DANGER,
            message: `Professional ${text}`
          });
        } else {
          this.props.appActions.addNotification({
            type: NOTIFICATION_CONSTANT.TYPE.DANGER,
            message: `Error: Something wrong`
          });
        }
      });
  }

  handleChangeRejectText(event) {
    this.setState({rejectModalText: event.target.value});
  }

  get getBottomBtnBlock() {
    const wellStyles = { margin: '0 auto' };
    let html = <div className="well text-center" style={wellStyles}>
      <Row>
        <Col lg={3} xs={12}>
          {(this.props.componentReducer.professional.status === CONSTANT.PROFESSIONAL_STATUS.WAITING_APPROVAL)
            ? <Button
                bsStyle="success"
                bsSize="large"
                onClick={this.handleApproveClick.bind(this)}>Approve</Button>
            : null
          }
        </Col>
        <Col lg={3} xs={12}>
          {(this.props.componentReducer.professional.status === CONSTANT.PROFESSIONAL_STATUS.REJECT)
            ? <Button
              bsStyle="success"
              bsSize="large"
              onClick={this.handleApproveClick.bind(this)}>Approve</Button>
            : null
          }
        </Col>
        <Col lg={3} xs={12}>
          {(this.props.componentReducer.professional.status !== CONSTANT.PROFESSIONAL_STATUS.REJECT)
            ? <Button
                bsStyle="warning"
                bsSize="large"
                onClick={this.openRejectModal.bind(this, CONSTANT.PROFESSIONAL_STATUS.REJECT)}>Reject</Button>
            : null}
        </Col>
        <Col lg={3} xs={12} className="text-center">
          {(this.props.componentReducer.professional.status !== CONSTANT.PROFESSIONAL_STATUS.BAN)
            ? <Button
                bsStyle="danger"
                bsSize="large"
                onClick={this.openRejectModal.bind(this, CONSTANT.PROFESSIONAL_STATUS.BAN)}>Ban</Button>
            : null}
        </Col>
      </Row>
    </div>;

    return html;
  }

  get modalBlock() {
    let statusName = this.state.modalStatus || '';
    return (
      <Modal show={this.state.showRejectModal}
             onHide={this.closeRejectModal.bind(this)}>
        <Header closeButton>
          <Title>Professional {statusName}</Title>
        </Header>
        <Body>
        <Form>
          <FormGroup controlId="formControlsTextarea">
            <ControlLabel>Please enter {statusName} note</ControlLabel>
            <FormControl
              componentClass="textarea"
              placeholder="Add note ..."
              value={this.state.rejectModalText}
              onChange={this.handleChangeRejectText.bind(this)}
            />
          </FormGroup>
        </Form>
        </Body>
        <Footer>
          <Button onClick={this.closeRejectModal.bind(this)}>Close</Button>
          <Button
            bsStyle="primary"
            onClick={this.handleRejectClick.bind(this)}>{StringService.upperFirst(statusName)}</Button>
        </Footer>
      </Modal>
    );
  }

  get elementFound() {
    return (
      <Row>
        <Col lg={12} className="text-center">
          <PageHeader>Professional not found</PageHeader>
        </Col>
      </Row>
    );
  }

  render() {
    let professional = this.props.componentReducer.professional;

    return (
      <div>
        {(this.state.isLoading)
          ? <Loading />
          : <div>
            {(professional.uuid)
              ? <div>
                  <Row>
                    <Col lg={12}>
                      <PageHeader>Professional: {professional.firstname || null}  {professional.lastname || null}</PageHeader>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg={6}>
                      <PersonalInfo professional={professional} />
                      <Experience professional={professional} />
                    </Col>
                    <Col lg={6}>
                      <Reference
                        professional={professional}
                        professionalActions={this.professionalActions}
                        appActions={this.props.appActions} />
                      <Invite
                        professional={professional}
                        professionalReducer={this.props.componentReducer}
                        professionalActions={this.professionalActions}
                        appActions={this.props.appActions}/>
                    </Col>
                  </Row>
                  {this.getBottomBtnBlock}
                  {this.modalBlock}
                </div>
              : this.elementFound}
          </div>}
      </div>
    );
  }
}
