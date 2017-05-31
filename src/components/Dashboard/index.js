import React, { Component } from 'react';
import {
  PageHeader,
  Row,
  Col,
  Panel } from 'react-bootstrap';

import './Dashboard.css'

const appUser = JSON.parse(localStorage.getItem('app_user'));

export default class Dashboard extends Component {

  get adminInfo() {
    if (appUser) {
      return (
        <div>
          <div>uuid: <span>{appUser.uuid}</span></div>
          <div>Name: <span>{appUser.firstname}</span> <span>{appUser.lastname}</span></div>
          <div>Email: <span>{appUser.email}</span></div>
          <div>Type: <span>{appUser.type}</span></div>
        </div>
      );
    } else {
      return null;
    }
  }

  render() {
    return (
      <div>
        <Row className="row">
          <Col lg={12}>
            <PageHeader>Dashboard</PageHeader>
          </Col>
        </Row>
        <Row className="row">
          <Col lg={6}>
            <Panel collapsible defaultExpanded header={<span>Admin Profile</span>} className="admin-info">
              {this.adminInfo}
            </Panel>
          </Col>
          <Col lg={6}>
            <Panel collapsible defaultExpanded header={<span>Metric (How did you hear about us?)</span>} className="admin-info">
              test
            </Panel>
          </Col>
        </Row>
      </div>
    );
  }
}
