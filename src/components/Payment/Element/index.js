import React from 'react'
import { Row, Col, Button } from 'react-bootstrap'
import { Link } from 'react-router'
import * as NOTIFICATION_CONSTANT from '../../../constants/notification'
import Modal, {Footer, Header, Title, Body} from 'react-bootstrap/lib/Modal'
import ComponentInterface from '../../../components/ComponentInterface'
import Loading from '../../Loading'
import Moment from 'moment'

export default class PaymentItem extends ComponentInterface {

  constructor(props) {
    super(props);

    this.state = {
      element: this.props.data,
      showConfirm: false,
      isLoading: false,
      debtText: ''
    };
  }

  shouldComponentUpdate(nextState,nextProps){
    if(this.state.element!==nextState.element){
      return true
    }else{
      return false
    }
  }

  showConfirm(type,prof_id){
    this.setState({
      showConfirm: true,
      type: type,
      id: prof_id
    })
  }

  closeConfirm(){
    this.setState({
      showConfirm: false
    })
  }

  addNotification(type){
    if(type==='danger'){
      this.props.appActions.addNotification({
        type: NOTIFICATION_CONSTANT.TYPE.DANGER,
        message: 'Something went wrong!'
      });
    }else {
      this.props.appActions.addNotification({
        type: NOTIFICATION_CONSTANT.TYPE.SUCCESS,
        message: `Successful ${type}`
      });
    }
  }

  setLoading(){
    this.setState({
      isLoading: !this.state.isLoading
    })
  }

  paymentAction(){
    let id = {shift_payment_ids:[this.state.id]}
    this.setLoading();
    if(this.state.type==='payment') {
      this.props.componentActions.payProfessional(id)
        .then(response=>{
          if(response.status===200){
            this.getData(response.data[0]);
            this.setLoading();
            this.addNotification(this.state.type);
          }else{
            this.addNotification('danger');
            this.setLoading();
          }
        })
    }
    if(this.state.type==='charge'){
      this.props.componentActions.chargeVenue(id)
        .then(response=>{
          if(response.status===200){
            this.getData(response.data[0]);
            this.setLoading();
            this.addNotification(this.state.type);
          }else{
            this.addNotification('danger');
            this.setLoading();
          }
        })
    }
    if(this.state.type==='reset'){
      this.props.componentActions.resetProfsPayment(id)
        .then(response=>{
          if(response.status===200){
            this.getData(response.data[0]);
            this.setLoading();
            this.addNotification(this.state.type);
          }else{
            this.addNotification('danger');
            this.setLoading();
          }
        })
    }
    this.closeConfirm();
  }

  checkDebt(debt){
    if(debt===1){
      return true
    }else{
      return false
    }
  }

  debtStyle(debt){
    if(debt===1){
      return <span className="label label-danger">DEBT</span>
    }else{
      return <span className="label label-info">NO DEBT</span>
    }
  }

  get modalConfirm(){
    return(
      <Modal show={this.state.showConfirm}
             onHide={this.closeConfirm.bind(this)}>
        <Header closeButton>
          <Title>Confirm</Title>
        </Header>
        <Body>
        Do you want to do {this.state.type}?
        </Body>
        <Footer>
          <Button bsStyle="success" onClick={this.paymentAction.bind(this)}>Yes</Button>
          <Button bsStyle="danger" onClick={this.closeConfirm.bind(this)}>No</Button>
        </Footer>
      </Modal>
    );
  }

  getData(data){
    let old_value = this.state.element;
    if(data) {
      this.setState({
        element: data
      })
    }else{
      this.setState({
        element: old_value
      })
    }
  }

  checkDebtTime(date){
    let date1 = Moment(date, "YYYYMMDD");
    let date2 = Date.now();
    if(date1.diff(date2,'days')<-1.5){
      return  '#FFE9E8'
    }
  }

  checkBalance(prof_balance,venue_balance){
    if(prof_balance!==0&&venue_balance!==0&&venue_balance!==undefined&&prof_balance!==undefined){
      return true
    }else{
      return false
    }
  }

  disableButton(debt,balance_prof,balance_venue){
    if(this.checkDebt(debt)&&this.checkBalance(balance_prof,balance_venue)){
      return false
    }else{
      return true
    }
  }

  get content() {

    return (
      <Link key={this.state.element.uuid} className="payment-list-row" style={{backgroundColor: this.checkDebtTime(this.state.element.created_at)}}>
        <Row>
          <Col className="cell" lg={2} md={2} sm={2} xs={2}>
            {this.state.element.shift_id}<br/>
            {this.state.element.prof_id}<br/>
            {this.state.element.venue_id}
          </Col>
          <Col className="cell value" lg={2} md={2} sm={2} xs={2}>
            {this.debtStyle(this.state.element.debt_prof_exists)}
          </Col>
          <Col className="cell value" lg={1} md={1} sm={1} xs={1}>
            {this.debtStyle(this.state.element.debt_venue_exists)}
          </Col>
          <Col className="cell value" lg={1} md={1} sm={1} xs={1}>
            {this.state.element.charge_venue_reason}
          </Col>
          <Col className="cell value" lg={2} md={2} sm={2} xsHidden>
            {this.state.element.balance_prof/100 || ''}
          </Col>
          <Col className="cell value" lg={1} md={1} sm={1} xsHidden>
            {this.state.element.balance_venue/100 || ''}
          </Col>
          <Col className="cell" lg={3} md={3} sm={3} xs={3}>
            <Button
              disabled={this.disableButton(this.state.element.debt_prof_exists,this.state.element.balance_prof,this.state.element.balance_venue)}
              className="paymentButton"
              bsSize="xsmall"
              onClick={this.showConfirm.bind(this,'reset',this.state.element.uuid)}
            >
              Reset
            </Button>
            <Button
              disabled={this.disableButton(this.state.element.debt_prof_exists,this.state.element.balance_prof,this.state.element.balance_venue)||this.checkDebt(this.state.element.debt_venue_exists)}
              className="paymentButton"
              bsSize="xsmall"
              onClick={this.showConfirm.bind(this,'payment',this.state.element.uuid)}
            >
              Pay
            </Button>
            <Button
              disabled={this.disableButton(this.state.element.debt_venue_exists,this.state.element.balance_prof,this.state.element.balance_venue)}
              className="paymentButton"
              bsSize="xsmall"
              onClick={this.showConfirm.bind(this,'charge',this.state.element.uuid)}
            >
              Charge
            </Button>
          </Col>
        </Row>
        {this.modalConfirm}
      </Link>
    );
  }

  render() {
    super.render();
    return this.state.isLoading ? <Loading className="isLoading"/> : this.content;
  }
}

