import React, { Component } from 'react'

import {
  PageHeader,
  Row,
  Col,
  Button,
  FormGroup,
  FormControl
  } from 'react-bootstrap'

import Modal, { Footer, Header, Title, Body } from 'react-bootstrap/lib/Modal'

import Loading from '../Loading'

import * as NOTIFICATION_CONSTANT from '../../constants/notification'

import { withRouter } from 'react-router'

export default withRouter(class TermsElement extends Component {

  constructor(props) {
    super(props);

    this.state = {
      type: '',
      showModal: false,
      isLoading: true,
      nextLocation: '',
      text: ''

    };
  }

  componentDidMount() {
    this.props.termsActions.getElement()
      .then(response => {
        this.setState({
          isLoading: false,
          text: response.text
        });
      });
  }

  closeModal() {
    this.setState({ showModal: false });
  }

  openModal() {
    this.setState({ showModal: true });
  }

  checkText(){
    return this.state.text;
  }

  handleModalClick() {
    this.props.termsActions.setElement(this.checkText().toString('html'), this.props.termsReducer.version)
      .then(response => {
        this.closeModal();
        if (response) {
          this.props.appActions.addNotification({
            type: NOTIFICATION_CONSTANT.TYPE.SUCCESS,
            message: 'Terms of Service were updated'
          });
        } else {
          this.props.appActions.addNotification({
            type: NOTIFICATION_CONSTANT.TYPE.DANGER,
            message: 'Terms of Service were not updated'
          });
        }
      });
  }

  get getBtnBlock() {
    const wellStyles = { margin: '0 auto' };

    return (
      <div className="well text-center" style={wellStyles}>
        <Row>
          <Col lg={12}>
            <Button style={{ float: 'left' }}
                    bsSize="large"
                    onClick={this.openModal.bind(this)}>Update version</Button>
          </Col>
        </Row>
      </div>
    );
  }

  get modalBlock() {
    return (
      <Modal show={this.state.showModal}
             onHide={this.closeModal.bind(this)}>
        <Header closeButton>
          <Title>Warning</Title>
        </Header>
        <Body>
          Are you sure want to update Terms of Service {this.state.type}?
        </Body>
        <Footer>
          <Button onClick={this.closeModal.bind(this)}>No</Button>
          <Button bsStyle="primary"
                  onClick={this.handleModalClick.bind(this)}>Yes</Button>
        </Footer>
      </Modal>
    );
  }

  handleTextChange(event){
    this.setState({
      text: event.target.value
    })
  }

  get content() {
    let terms = this.props.termsReducer;

    return (
          this.state.isLoading
            ? <Loading />
            : <div>
              <div>
                <Row>
                  <Col lg={12}>
                    <form>
                    <FormGroup controlId="formControlsTextarea">
                      <FormControl componentClass="textarea" placeholder="textarea" className="terms" value={this.state.text} onChange={this.handleTextChange.bind(this)} />
                    </FormGroup>
                    </form>
                  </Col>
                  <Col lg={12}>
                    <div style={{ padding: '10px 0' }}>Current version: <b>{terms.version}</b></div>
                  </Col>
                </Row>
                {this.getBtnBlock}
                {this.modalBlock}
                {this.modalConfirm}
              </div>
            </div>

    );
  }

  render() {
    return (
      <div>
        <Row>
          <Col lg={12}>
            <PageHeader>Terms of Service</PageHeader>
          </Col>
        </Row>
          { this.content }
      </div>
    );
  }
})
