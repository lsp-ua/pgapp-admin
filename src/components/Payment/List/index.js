import React from 'react'
import Infinite from 'react-infinite'
import { PageHeader, Panel, Row, Col } from 'react-bootstrap'

import BaseTable from '../../Base/Table'
import SearchBox from '../SearchBox'


import PaymentItem from '../Element';
import './List.css';

export default class ShiftPayments extends BaseTable {

  constructor(props, context) {
    super(props, context);

    this.state = {
      items: [],
      status: 'all',
      filterField: '',
      filterSearchText: '',
      lastKey: null,
      isInfiniteLoading: false,
      showConfirm: false,
      type: '',
      id: '',
      index: ''
    }
  }

  componentDidMount() {
    super.componentDidMount.call(this);
  }
  componentWillReceiveProps(newProps) {
    super.receiveProps.call(this, newProps.componentReducer.payments);
  }


  renderHeader() {
    return (
      <Row>
        <Col lg={2} md={2} sm={2} xs={2}>Relationship</Col>
        <Col lg={2} md={2} sm={2} xs={2}>Debt professional</Col>
        <Col lg={1} md={1} sm={1} xs={1}>Debt venue</Col>
        <Col lg={1} md={1} sm={1} xs={1}>Charge reason</Col>
        <Col lg={2} md={2} sm={2} xsHidden>Balance professional</Col>
        <Col lg={1} md={1} sm={1} xsHidden>Balance venue</Col>
        <Col lg={3} md={3} sm={3} xs={3}>Actions</Col>
      </Row>
    );
  }

  render() {

    return(
      <div className="list-page">
        <PageHeader>Shift Payments</PageHeader>
        <SearchBox listState={this.state} onNeedUpdateList={this.updateList}/>
        <div className="list-container">
          <Panel
            className="prof-list"
            header={this.renderHeader()}>
            <Infinite
              style={{display:'table'}}
              elementHeight={50}
              containerHeight={600}
              infiniteLoadBeginEdgeOffset={200}
              onInfiniteLoad={this.handleInfiniteLoad}
              loadingSpinnerDelegate={this.elementInfiniteLoad()}
              isInfiniteLoading={this.state.isInfiniteLoading}
              timeScrollStateLastsForAfterUserScrolls={1000} >
              {
                this.state.items.map((element,index) => {
                  return <PaymentItem
                    key={index}
                    data={element}
                    componentActions={this.props.componentActions}
                    appActions={this.props.appActions}
                  />
                })
              }
            </Infinite>
          </Panel>
        </div>
      </div>
    )
  }
}
