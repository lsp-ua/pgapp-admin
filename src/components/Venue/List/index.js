import React from 'react'
import { Link } from 'react-router'
import Infinite from 'react-infinite'
import { PageHeader, Panel, Row, Col, OverlayTrigger, Tooltip } from 'react-bootstrap'

import BaseTable from '../../Base/Table'
import SearchBox from '../SearchBox'

import phoneService from '../../../services/phone'
import {venueStatuses, venueShowStatuses} from '../../../constants/dicts/statuses'

export default class VenueList extends BaseTable {
  constructor(props, context) {
    super(props, context);
    this.state = {
      items: [],
      status: 'all',
      filterField: '',
      filterSearchText: '',
      lastKey: null,
      isInfiniteLoading: false
    }
  }

  componentDidMount() {
    super.componentDidMount.call(this);
  }
  componentWillReceiveProps(newProps) {
    super.receiveProps.call(this, newProps.componentReducer.venues);
  }

  checkStatus(status){
    const tooltipApproved = (
      <Tooltip id="tooltip"><strong>Approved</strong></Tooltip>
    );
    const tooltipNotApproved = (
      <Tooltip id="tooltip"><strong>Not approved</strong></Tooltip>
    );

    if(status === 'active'){
      return (
        <OverlayTrigger placement="top" overlay={tooltipApproved}>
          <i className="fa fa-thumbs-up fa-lg text-success indent-venue" aria-hidden="true"></i>
        </OverlayTrigger>)
    }else{
      return (
        <OverlayTrigger placement="top" overlay={tooltipNotApproved}>
          <i className="fa fa-thumbs-down fa-lg text-danger indent-venue" aria-hidden="true"></i>
        </OverlayTrigger>)
    }

  }

  checkPayment(stripe_card_id){
    const tooltip = (
      <Tooltip id="tooltip"><strong>No payment info</strong></Tooltip>
    );

    if(!stripe_card_id){
      return (
        <OverlayTrigger placement="top" overlay={tooltip}>
          <i className="fa fa-cc-stripe fa-lg text-warning indent-venue" aria-hidden="true"></i>
        </OverlayTrigger>)
    }

  }

 checkZip(zip){
   const tooltip = (
     <Tooltip id="tooltip"><strong>Invalid Zip code!</strong></Tooltip>
   );

if(zip !== 'market_is_usable'){
  return (
    <OverlayTrigger placement="top" overlay={tooltip}>
    <i className="fa fa-exclamation-triangle fa-lg text-warning indent-venue" aria-hidden="true"></i>
    </OverlayTrigger>)
}
  }

  render() {
    return(
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <PageHeader>Venues List</PageHeader>
        <SearchBox listState={this.state} onNeedUpdateList={this.updateList}/>
        <div style={{ flex: '1 1 auto' }}>
          <Panel
            className="prof-list"
            header={
              <Row>
                <Col lg={3} md={3} sm={3} xs={4}>Name</Col>
                <Col lg={3} md={3} sm={3} xs={5}>Phone</Col>
                <Col lg={3} md={3} sm={3} xsHidden>Date created</Col>
                <Col lg={3} md={3} sm={3} xs={3}>Status</Col>
              </Row>
            }
          >
            <Infinite
              style={{display:'table'}} elementHeight={30}
              containerHeight={600}
              infiniteLoadBeginEdgeOffset={200}
              onInfiniteLoad={this.handleInfiniteLoad}
              loadingSpinnerDelegate={this.elementInfiniteLoad()}
              isInfiniteLoading={this.state.isInfiniteLoading}
              timeScrollStateLastsForAfterUserScrolls={1000}
            >
              {
                this.state.items.map(element => {
                  return <Link key={element.uuid} className="prof-list-row" to={`/venue/${element.uuid}`}>
                    <Row>
                      <Col className="cell" lg={3} md={3} sm={3} xs={4} title={element.name}>{element.name}</Col>
                      <Col className="cell" lg={3} md={3} sm={3} xs={5}>{phoneService.phoneMask(element.phone)}</Col>
                      <Col className="cell" lg={3} md={3} sm={3} xsHidden>{this.formatDate(element.created_at)}</Col>
                      <Col className="cell" lg={3} md={3} sm={3} xsHidden>{venueStatuses[element.status]}
                        {this.checkStatus(element.status)}
                        {this.checkZip(element.market_usable_status)}
                        {this.checkPayment(element.stripe_card_id)}
                        </Col>
                    </Row>
                  </Link>

                })
              }
            </Infinite>
          </Panel>
        </div>
      </div>
    )
  }
}
