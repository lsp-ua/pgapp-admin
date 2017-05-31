import React from 'react';
import Infinite from 'react-infinite';
import BaseTable from '../../Base/Table';
import SearchBox from '../SearchBox';
import { PageHeader, Panel, Row, Col } from 'react-bootstrap';

export default class HistoryList extends BaseTable {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      filterField:'',
      date_start:'',
      date_end:'',
      filterSearchText: '',
      lastKey: null,
      isInfiniteLoading: false
    }
  }

  componentDidMount() {
    super.componentDidMount.call(this);
  }
  componentWillReceiveProps(newProps) {
    super.receiveProps.call(this, newProps.componentReducer.logs);
  }

  render() {
    return(
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <PageHeader>History List</PageHeader>
        <SearchBox listState={this.state} onNeedUpdateList={this.updateList}/>
        <div style={{ flex: '1 1 auto' }}>
          <Panel
            className="prof-list"
            header={
              <Row>
                <Col lg={2} md={2} sm={2} xs={4}>Event</Col>
                <Col lg={2} md={2} sm={2} xs={4}>Date</Col>
                <Col lg={2} md={2} sm={2} xs={4}>Event user id</Col>
                <Col lg={3} md={3} sm={3} xsHidden>SHIFT ID</Col>
                <Col lg={3} md={3} sm={3} xsHidden>Venue ID</Col>
              </Row>
            }>
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
                  return <span key={element.uuid} className="prof-list-row">
                      <Row>
                        <Col className="cell" lg={2} md={2} sm={2} xs={4} title={element.event}>{element.event}</Col>
                        <Col className="cell" lg={1} md={1} sm={2} xs={4} >{this.formatDate(element.created_at)}</Col>
                        <Col className="cell" lg={3} md={3} sm={2} xs={4}>{element.user_id}</Col>
                        <Col className="cell" lg={3} md={3} sm={3} xsHidden>{element.shift_id}</Col>
                        <Col className="cell" lg={3} md={3} sm={3} xsHidden>{element.venue_id}</Col>
                      </Row>
                  </span>
                })
              }
            </Infinite>
          </Panel>
        </div>
      </div>
    )
  }
}
