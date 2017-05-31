import React from 'react'
import {
  Row,
  Col,
  PageHeader,
  ListGroupItem,
  FormGroup,
  FormControl,
  Button } from 'react-bootstrap'

import ComponentInterface from '../../../components/ComponentInterface'
import Loading from '../../../components/Loading'

import Map from './Map'

export default class TrackingHistory extends ComponentInterface {

  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      from: '',
      to: ''
    };
  }

  componentDidMount(){
    super.componentDidMount();

    this.getData(this.props.params.uuid);
  }

  componentWillReceiveProps(nextProps) {
    super.componentWillReceiveProps();

    if (nextProps.params.uuid !== this.props.params.uuid) {
      this.getData(nextProps.params.uuid);
    }
  }

  getData(id) {
    if (!this.state.isLoading) {
      this.setState({
        isLoading: true
      });
    }
    this.canRender(false);

    let requestBody = {
      from: this.state.from || '',
      to: this.state.to || '',
    };

    this.props.componentActions.getTrackingHistory(id, requestBody)
      .then(() => {
        this.canRender(true);
        this.setState({
          isLoading: false
        });
      });
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

  handleDateChange(type, event) {
    console.log(type);
    this.setState({
      [type]: event.target.value
    });
  }

  searchTrackingHistory() {
    this.getData(this.props.params.uuid);
  }

  get content() {
    let trackingHistory = this.props.componentReducer.trackingHistory;
    return (
      <div>
        <Row>
          <Col md={ 12 } lg={ 12 } >
            <PageHeader>Tracking History Map</PageHeader>
          </Col>
        </Row>
        <Row>
          <Col lg={12} md={12} sm={12} xs={12} style={{display:'inline-flex'}}>
            <FormGroup style={{width:'100%', marginRight:5}}>
              <FormControl
                type="text"
                value={this.state.from}
                onChange={this.handleDateChange.bind(this, 'from')}
                placeholder="Date from"
              />
            </FormGroup>
            <FormGroup style={{width:'100%', marginRight:5}}>
              <FormControl
                type="text"
                value={this.state.to}
                onChange={this.handleDateChange.bind(this, 'to')}
                placeholder="Date to"
              />
            </FormGroup>
            <FormGroup>
              <Button onClick={this.searchTrackingHistory.bind(this)}>Search</Button>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={ 12 } lg={ 12 } >
            {(trackingHistory.length)
              ? <Map markersData={trackingHistory}/>
              : this.notFound
            }
          </Col>
        </Row>
      </div>
    );
  }

  render() {
    super.render();

    return this.state.isLoading
      ? <Loading />
      : this.content;
  }
}
