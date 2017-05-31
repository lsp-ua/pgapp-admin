import React from 'react';
import { Link } from 'react-router'
import { PageHeader, Panel, Row, Col } from 'react-bootstrap';
import Infinite from 'react-infinite';
import SearchBox from '../SearchBox';
import BaseTable from '../../Base/Table';
import {professionalStatuses} from '../../../constants/dicts/statuses'

import './ProfessionalList.css';

export default class ProfessionalList extends BaseTable {

  constructor(props, context) {
    super(props, context);

    this.state = {
      items: [],
      status: 'all',
      filterField: '',
      filterSearchText: '',
      lastKey: null,
      isInfiniteLoading: false
    };
  }

  componentDidMount() {
    super.componentDidMount.call(this);
  }

  componentWillReceiveProps(newProps) {
    super.receiveProps.call(this, newProps.componentReducer.professionals);
  }

  render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <PageHeader>Professionals List</PageHeader>
        <SearchBox listState={this.state} onNeedUpdateList={this.updateList}/>
        <div style={{ flex: '1 1 auto' }}>
            <Panel className="prof-list" header={<Row>
              <Col lg={3} md={3} sm={3} xs={4}>Name</Col>
              <Col lg={3} md={3} sm={3} xs={5}>Email</Col>
              <Col lg={2} md={2} sm={2} xsHidden>Date created</Col>
              <Col lg={2} md={2} sm={2} xsHidden>Date approved</Col>
              <Col lg={2} md={2} sm={2} xs={3}>Status</Col>
            </Row>}>
              <Infinite style={{display:'table'}} elementHeight={30}
                containerHeight={600}
                infiniteLoadBeginEdgeOffset={200}
                onInfiniteLoad={this.handleInfiniteLoad}
                loadingSpinnerDelegate={this.elementInfiniteLoad()}
                isInfiniteLoading={this.state.isInfiniteLoading}
                timeScrollStateLastsForAfterUserScrolls={1000}
              >
                {
                  this.state.items.map((element, index) => {
                    return <Link key={element.uuid} className="prof-list-row" to={`/professional/${element.uuid}`}>
                      <Row>
                        <Col className="cell" lg={3} md={3} sm={3} xs={4} title={`${element.firstname} ${element.lastname}`} >{element.firstname} {element.lastname}</Col>
                        <Col className="cell" lg={3} md={3} sm={3} xs={5} title={element.email}>{element.email}</Col>
                        <Col className="cell" lg={2} md={2} sm={2} xsHidden>{this.formatDate(element.created_at)}</Col>
                        <Col className="cell" lg={2} md={2} sm={2} xsHidden>{element.date_approve ? this.formatDate(element.date_approve) : 'N/A'}</Col>
                        <Col className="cell" lg={2} md={2} sm={2} xs={3} title={element.status}>{professionalStatuses[element.status]}</Col>
                      </Row>
                    </Link>
                  })
                }
              </Infinite>
            </Panel>
        </div>
      </div>
    );
  }
}
