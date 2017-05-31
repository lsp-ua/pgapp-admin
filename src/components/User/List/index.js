import React from 'react';
import { Link } from 'react-router'
import { PageHeader, Panel, Row, Col, Button, FormControl, ControlLabel, Form, FormGroup } from 'react-bootstrap';
import BaseTable from '../../Base/Table';
import SearchBox from '../SearchBox';
import { Header, Title, Body } from 'react-bootstrap/lib/Modal';

export default class UserList extends BaseTable {
  constructor(props) {
    super(props);

    this.state = {
      lastKey: null,
      isInfiniteLoading: false,
      items: [],
      modalShow: false,
      email: ''
    };
  }

  componentDidMount() {
    super.componentDidMount.call(this);
  }

  componentWillReceiveProps(newProps) {
    super.receiveProps.call(this, newProps.componentReducer.users);
  }

  render() {
    return(
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <PageHeader>Users List</PageHeader>
        <SearchBox listState={this.state} onNeedUpdateList={this.updateList}/>
        <div style={{ flex: '1 1 auto' }}>
          <Panel className="prof-list" header={<Row>
            <Col lg={6} md={6} sm={6} xs={6}>Name</Col>
            <Col lg={6} md={6} sm={6} xs={6}>Date created</Col>
          </Row>}>
              {
                this.state.items.map((element, index) => {
                  return <Link key={element._id} className="prof-list-row" to={`/users/${element._id}`}>
                    <Row>
                      <Col className="cell" lg={3} md={3} sm={3} xs={4} title={`${element.firstname} ${element.lastname}`} >{element.firstname} {element.lastname}</Col>
                      <Col className="cell" lg={2} md={2} sm={2} xsHidden>{this.formatDate(element.created_at)}</Col>
                    </Row>
                  </Link>
                })
              }
          </Panel>
        </div>
      </div>
    )
  }
}
