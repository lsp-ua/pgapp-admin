import React from 'react'
import { Link } from 'react-router'
import {PageHeader, Panel, Row, Col, ListGroup, ListGroupItem } from 'react-bootstrap'
import Moment from 'moment'

import ComponentInterface from '../../ComponentInterface'
import Loading from '../../Loading'
import {venueStatuses} from '../../../constants/dicts/statuses'
import PersonalInfo from './PersonalInfo'

import phoneService from '../../../services/phone';


export default class ManagerElement extends ComponentInterface {

  constructor(props) {
    super(props);

    this.state = {
      isLoading: true
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.params.uuid !== this.props.params.uuid) {
      this.getData(nextProps.params.uuid);
    }
  }

  componentDidMount() {
    super.componentDidMount();

    this.getData(this.props.params.uuid);
  }

  getData(id) {
    if (!this.state.isLoading) {
      this.setState({
        isLoading: true
      });
    }
    this.canRender(false);
    this.props.componentActions.getElement(id)
      .then(() => {
        return this.props.componentActions.getVenues(id);
      })
      .then(() => {
        this.canRender(true);
        this.setState({
          isLoading: false
        });
      });
  }

  get elementNotFound() {
    return (
      <Row>
        <Col lg={12} className="text-center">
          <PageHeader>Manager not found</PageHeader>
        </Col>
      </Row>
    );
  }

  formatDate(date) {
    return Moment(date).format('MM/DD/YYYY');
  }

  get venuesNotFound() {
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

  renderVenueElement(element) {
    return (
      <Link key={element.uuid} to={`/venue/${element.uuid}`}>
        <Col className="cell" lg={3} md={3} sm={4} xs={6} title={element.name}>{element.name}</Col>
        <Col className="cell" lg={3} md={3} sm={4} xsHidden>{phoneService.phoneMask(element.phone)}</Col>
        <Col className="cell" lg={3} md={3} smHidden xsHidden>{this.formatDate(element.created_at)}</Col>
        <Col className="cell" lg={3} md={3} sm={4} xs={6}>{venueStatuses[element.status]}</Col>
      </Link>
    );
  }

  venuesList(venues, owned) {
    venues = venues.filter((item) => {
      return item.owner === owned;
    });

    if (!venues.length) {
      return this.venuesNotFound;
    }

    return (
      <Panel header={
        <Row>
          <Col lg={3} md={3} sm={4} xs={6}>Name</Col>
          <Col lg={3} md={3} sm={4} xsHidden>Phone</Col>
          <Col lg={3} md={3} smHidden xsHidden>Date created</Col>
          <Col lg={3} md={3} sm={4} xs={6}>Status</Col>
        </Row>
      }>
        {venues.map(element => {
          return this.renderVenueElement(element);
        })}
      </Panel>
    );
  }

  get content() {
    let manager = this.props.componentReducer.manager;

    return (
      <div>
        {manager.uuid
          ? <div>
            <Row>
              <Col lg={12}>
                <PageHeader>Manager: {manager.firstname || null}  {manager.lastname || null}</PageHeader>
              </Col>
            </Row>
            <Row>
              <Col lg={12}>
                <PersonalInfo manager={manager} />
              </Col>
              <Col lg={12}>
                <Panel collapsible defaultExpanded header={<span>Venues</span>}>
                  <h3>Owned</h3>
                  {this.venuesList(manager.venues, 'true')}
                  <h3>Not Owned</h3>
                  {this.venuesList(manager.venues, 'false')}
                </Panel>
              </Col>
            </Row>
          </div>
          : this.elementNotFound
        }
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
