import React from 'react'
import { Link } from 'react-router'
import Infinite from 'react-infinite'
import { PageHeader, Panel, Row, Col } from 'react-bootstrap'

import BaseTable from '../../Base/Table'
import SearchBox from '../SearchBox'

import { shiftsStatuses } from '../../../constants/dicts/statuses'
import * as helpers from '../../../services/helpers'

export default class ShiftsList extends BaseTable {

  constructor(props, context) {
    super(props, context);

    this.state = {
      items: [],
      data: [],
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
    super.receiveProps.call(this, newProps.componentReducer.shifts);
  }

  renderHeader() {
    return (
      <Row>
        <Col lg={3} md={3} sm={3} xs={3}>Venue</Col>
        <Col lg={2} md={2} sm={2} xsHidden>Shift date</Col>
        <Col lg={3} md={3} sm={3} xs={3}>Professional assigned</Col>
        <Col lg={2} md={2} sm={2} xs={2}>Manager creator</Col>
        <Col lg={2} md={2} sm={2} xs={2}>Shift status</Col>
      </Row>
    );
  }

  renderItem(element,index) {
    return (
      <Link key={index} className="prof-list-row" to={`/shift/${element.uuid}`}>
        <Row>
          <Col className="cell" lg={3} md={3} sm={3} xs={3}>
            {helpers.getObjValue(element, 'venue.name')}
            </Col>
          <Col className="cell" lg={2} md={2} sm={2} xsHidden>
            {this.formatDate(element.created_at)}
            </Col>
          <Col className="cell" lg={3} md={3} sm={3} xs={3}>
            {helpers.concatValues([
              helpers.getObjValue(element, 'professional.firstname'),
              helpers.getObjValue(element, 'professional.lastname')
            ])}
          </Col>
          <Col className="cell" lg={2} md={2} sm={2} xs={2}>
            {helpers.concatValues([
              helpers.getObjValue(element, 'created_by.firstname'),
              helpers.getObjValue(element, 'created_by.lastname')
            ])}
          </Col>
          <Col className="cell" lg={2} md={2} sm={2} xs={2}>
            {shiftsStatuses[element.status]}
          </Col>
        </Row>
      </Link>
    );
  }


  removeDuplicates(myArr, prop) {
    return myArr.filter((obj, pos, arr) => {
      return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
    });
  }

  getManagersList(managers){
    let data = [];
    managers.map((element)=>{
      data.push(element.created_by)
      return true;
    })
    return this.removeDuplicates(data,'uuid');
  }

  render() {
    let managers = this.getManagersList(this.state.items||[]);

    return(
      <div className="list-page">
        <PageHeader>Shifts List</PageHeader>
        <SearchBox listState={this.state} onNeedUpdateList={this.updateList} managers={managers}/>
        <div className="list-container">
          <Panel
            className="prof-list"
            header={this.renderHeader()}>
            <Infinite
              style={{display:'table'}}
              elementHeight={30}
              containerHeight={600}
              infiniteLoadBeginEdgeOffset={200}
              onInfiniteLoad={this.handleInfiniteLoad}
              loadingSpinnerDelegate={this.elementInfiniteLoad()}
              isInfiniteLoading={this.state.isInfiniteLoading}
              timeScrollStateLastsForAfterUserScrolls={1000} >
              {
                this.state.items.map((element,index) => {
                  return this.renderItem(element,index)
                })
              }
            </Infinite>
          </Panel>
        </div>
      </div>
    )
  }
}
