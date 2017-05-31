import React, { Component } from 'react';
import {
  Button,
  Row,
  Col,
  Form,
  FormControl,
  FormGroup,
  ControlLabel } from 'react-bootstrap';

import TagsInput from 'react-tagsinput';
import 'react-tagsinput/react-tagsinput.css';
import Modal, {Footer, Header, Title, Body} from 'react-bootstrap/lib/Modal';
import Loading from '../../Loading';
import * as NOTIFICATION_CONSTANT from '../../../constants/notification';

export default class Markets extends Component {
  constructor(props, context, {showModal}) {
    super(props, context);

    this.state = {
      showModal: showModal,
      add: false,
      uuid: '',
      zip: [],
      name: '',
      immediate_max: '',
      request_expiration: '',
      density_factor: '',
      fee:'2000',
      positions: [],
      delModal: false,
    }
    this.handlePositionsChange.bind(this);
  }

  delShow() {
    this.setState({
      delModal: true,
    })
  }

  delHide() {
    this.setState({
      delModal: false,
    })
  }

  deleteMarket() {
    this.props.marketsActions.delElement(this.state.uuid)
      .then(response=>{
        this.props.marketsActions.getList();
        this.delHide();
      })
  }

  handleChange(zip) {
    this.setState({zip})
  }

  closeModal() {
      const newState = !this.state.showModal;
      this.setState({ showModal: newState });
      this.props.callbackParent(newState);
  }

  componentWillReceiveProps(nextProps) {
    let market = nextProps.marketsReducer.market || {};
    this.setState({
      add: nextProps.type || false,
      uuid: market.uuid,
      name: market.name,
      immediate_max: market.immediate_max,
      request_expiration: market.request_expiration,
      density_factor: market.density_factor,
      fee: market.fee,
      positions: market.positions || this.formatPositions(this.props.positions),
      zip: this.formatZip(market.zip_codes || []),
    })
  }

  handleFocus(e) {
    e.target.select();
  }

  valueMask(value,type){
    if(value>=0 || type === 'text'){
      return true
    }else{
      return false
    }
  }


  handleFieldChange(e) {
    if (this.valueMask(e.target.value,e.target.type)) {
      this.setState({
        [e.target.name]: e.target.value
      })
    }else{
      this.props.appActions.addNotification({
        type: NOTIFICATION_CONSTANT.TYPE.DANGER,
        message: 'Value must be not negative '
      });
    }
  }

  handlePositionsChange(index,e) {
    if(this.valueMask(e.target.value,e.target.type)) {
      let positions = this.state.positions;
      positions[index].hour_rate = parseInt(e.target.value, 10) || '';
      this.setState({
        positions,
      })
    }else{
      this.props.appActions.addNotification({
        type: NOTIFICATION_CONSTANT.TYPE.DANGER,
        message: 'Value must be not negative'
      });
    }
  }

  formatPositions(positions) {
    let data = [];
    positions.map((element, index) => {
      data[index] = {
        name: element.name,
        hour_rate: element.hour_rate,
        position_id: element.uuid
      }
      return true;
    });

    return data;
  }

  formatZip(zip) {
    let data = [];
    zip.map((element) => {
      if(element.from === element.to){
        data.push(element.from)
      }
      else{
        data.push(`${element.from}-${element.to}`);
      }
      return true;
    });

    return data;
  }

  formatServerZip(zip) {
    let zip_codes = [];
    let value;
    zip.map((element) => {
      value = element.split('-');
      if(value[1] === undefined){
        zip_codes.push({
          from: value[0],
          to: value[0]
        })
      }else{
      zip_codes.push({
        from: value[0],
        to: value[1]
      })
      }
      return true;
    });


    return zip_codes;
  }

  updateMarket(e) {
    let marketObj = {
      name: this.state.name,
      density_factor: Number(this.state.density_factor),
      immediate_max: parseInt(this.state.immediate_max, 10),
      request_expiration: parseInt(this.state.request_expiration, 10),
      fee: Number(this.state.fee),
      positions: this.state.positions,
      zip_codes: this.formatServerZip(this.state.zip),
    };

    if (this.state.add) {
      this.props.marketsActions.update(this.state.uuid, marketObj)
        .then(response => {
          if (response.status === 200) {
            this.props.appActions.addNotification({
              type: NOTIFICATION_CONSTANT.TYPE.SUCCESS,
              message: 'Market was saved successfully'
            });
            this.props.marketsActions.getList();
          } else {
            this.props.appActions.addNotification({
              type: NOTIFICATION_CONSTANT.TYPE.DANGER,
              message: 'Market wasn`t save. Check data.'
            });
          }
        })
    } else {
      this.props.marketsActions.save(marketObj)
        .then(response => {
          if (response.status === 200) {
            this.props.appActions.addNotification({
              type: NOTIFICATION_CONSTANT.TYPE.SUCCESS,
              message: 'Market was created successfully'
            });
            this.props.marketsActions.getList()
              .then(() => {
                this.closeModal();
              })
          } else
            this.props.appActions.addNotification({
              type: NOTIFICATION_CONSTANT.TYPE.DANGER,
              message: response.data.message
            });
        })
    }
  }

  get delModal() {
    return(
      <Modal show={this.state.delModal}
             onHide={this.delHide.bind(this)}>
        <Header closeButton>
          <Title>Delete?</Title>
        </Header>
        <Body>
        Do you want to delete this item?
        </Body>
        <Footer>
          <Button onClick={this.deleteMarket.bind(this)}>Yes</Button>
          <Button onClick={this.delHide.bind(this)}>No</Button>
        </Footer>
      </Modal>
    );
  }

  get positionList() {
    return(
      this.state.positions.map((element,index)=> {
        return (
          <FormGroup controlId="formHorizontalMarket" className="marketPositions" key={index}>
            <Col componentClass={ControlLabel} sm={3}>
              <span>{element.name} (in cents):</span>
            </Col>
            <Col sm={9}>
              <FormControl
                name={element.name}
                type="number"
                value={this.state.positions[index].hour_rate}
                onChange={(event) => this.handlePositionsChange(index, event)}
                onFocus={this.handleFocus.bind(this)}
              />
            </Col>
          </FormGroup>
        );
      })
    )
  }

  get groupButton() {
    return(
      this.state.add
        ? <Row>
            <Col xs={12} sm={12} md={12} lg={12}>
              <div className="button-group">
                <Button bsStyle="success" className="saveButton" onClick={this.updateMarket.bind(this)}>Save</Button>
                <Button bsStyle="danger" className="deleteButton" onClick={this.delShow.bind(this)}>Delete</Button>
              </div>
            </Col>
          </Row>
        : <Row>
            <Col xs={12} sm={12} md={12} lg={12}>
              <div className="button-group">
                <Button bsStyle="success" className="saveButton" onClick={this.updateMarket.bind(this)}>Add</Button>
                <Button bsStyle="danger" className="deleteButton" onClick={this.closeModal.bind(this)}>Cancel</Button>
              </div>
            </Col>
          </Row>
    );
  }

  get content() {
    return (
      <Form horizontal className="from-add-market">
        <FormGroup controlId="formHorizontalMarket">
          <Col componentClass={ControlLabel} sm={3}>
            <span>Market name:</span>
          </Col>
          <Col sm={9}>
            <FormControl
              name="name"
              type="text"
              value={this.state.name}
              onChange={this.handleFieldChange.bind(this)}
              onFocus={this.handleFocus.bind(this)}
            />
          </Col>
        </FormGroup>
        <FormGroup>
          <Col componentClass={ControlLabel} sm={3}>
            <span>Zip Codes:</span>
          </Col>
          <Col sm={9}>
            <TagsInput
              inputProps={{placeholder: 'Add code'}}
              onlyUnique={true}
              value={this.state.zip}
              onChange={this.handleChange.bind(this)}
              onFocus={this.handleFocus.bind(this)}
            />
          </Col>
        </FormGroup>
        <FormGroup controlId="formHorizontalMarket">
          <Col componentClass={ControlLabel} sm={3}>
            <span>Immediate Maximum:</span>
          </Col>
          <Col sm={9}>
            <FormControl
              name="immediate_max"
              type="number"
              value={this.state.immediate_max}
              onChange={this.handleFieldChange.bind(this)}
              onFocus={this.handleFocus.bind(this)}
            />
          </Col>
        </FormGroup>
        <FormGroup controlId="formHorizontalMarket">
          <Col componentClass={ControlLabel} sm={3}>
            <span>Request Expiration:</span>
          </Col>
          <Col sm={9}>
            <FormControl
              name="request_expiration"
              type="number"
              value={this.state.request_expiration}
              onChange={this.handleFieldChange.bind(this)}
              onFocus={this.handleFocus.bind(this)}
            />
          </Col>
        </FormGroup>
        <FormGroup controlId="formHorizontalMarket" className="marketDensity">
          <Col componentClass={ControlLabel} sm={3}>
            <span>Density Factor:</span>
          </Col>
          <Col sm={9}>
            <FormControl
              name="density_factor"
              type="number"
              value={this.state.density_factor}
              onChange={this.handleFieldChange.bind(this)}
              onFocus={this.handleFocus.bind(this)}
            />
          </Col>
        </FormGroup>
        <FormGroup controlId="formHorizontalMarket" className="marketFee">
          <Col componentClass={ControlLabel} sm={3}>
            <span>Fee (in cents):</span>
          </Col>
          <Col sm={9}>
            <FormControl
              name="fee"
              type="number"
              value={this.state.fee}
              onChange={this.handleFieldChange.bind(this)}
              onFocus={this.handleFocus.bind(this)}
            />
          </Col>
        </FormGroup>
        {this.positionList}
        {this.groupButton}
        {this.delModal}
      </Form>
    );
  }

  render() {

    return (
      this.props.isLoading
        ? <Loading/>
        : this.content
    );
  }
}
