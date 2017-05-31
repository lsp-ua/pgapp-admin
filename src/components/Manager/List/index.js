import React from 'react';
import { Link } from 'react-router'
import { PageHeader, Panel, Row, Col } from 'react-bootstrap';
import SearchBox from '../SearchBox';
import BaseTable from '../../Base/Table';
import Infinite from 'react-infinite';
import phoneService from '../../../services/phone'

export default class ManagersList extends BaseTable {
  constructor (props, context) {
    super(props, context);

    this.state = {
      lastKey: null,
      isInfiniteLoading: false,
      items: []
    };
  }

  componentDidMount() {
    super.componentDidMount.call(this);
  }

  componentWillReceiveProps(newProps) {
    super.receiveProps.call(this, newProps.componentReducer.managers);
  }

  render () {
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <PageHeader>Managers List</PageHeader>
        <SearchBox listState={this.state} onNeedUpdateList={this.updateList}/>
        <div style={{ flex: '1 1 auto' }}>
          <Panel className="prof-list" header={<Row>
            <Col lg={3} md={3} sm={3} xs={4}>Name</Col>
            <Col lg={3} md={3} sm={3} xs={5}>Email</Col>
            <Col lg={3} md={3} sm={3} xs={5}>Phone</Col>
            <Col lg={2} md={2} sm={2} xsHidden>Date created</Col>
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
                  return <Link key={element.uuid} className="prof-list-row" to={`/manager/${element.uuid}`}>
                    <Row>
                      <Col className="cell" lg={3} md={3} sm={3} xs={4} title={`${element.firstname} ${element.lastname}`} >{element.firstname} {element.lastname}</Col>
                      <Col className="cell" lg={3} md={3} sm={3} xs={5} title={element.email}>{element.email}</Col>
                      <Col className="cell" lg={3} md={3} sm={3} xsHidden>{phoneService.phoneMask(element.phone)}</Col>
                      <Col className="cell" lg={3} md={3} sm={3} xsHidden>{this.formatDate(element.created_at)}</Col>
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
