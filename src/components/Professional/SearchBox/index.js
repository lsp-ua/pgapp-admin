import React from 'react';
import {Panel, Row, Col, Form, FormGroup, FormControl, InputGroup, Button} from 'react-bootstrap';
import Search from '../../Base/Search';
import {professionalStatuses} from '../../../constants/dicts/statuses';

export default class SearchBox extends Search {
  render() {
    return (
      <div>
        <Panel header={<span>Filter</span>} >
          <Form ref="searchForm" onSubmit={this.formSubmit}>
            <div className="control-group help-block"></div>
            <FormGroup>
              <Row>
                <Col lg={3}>
                  <FormGroup>
                    <FormControl
                      componentClass="select"
                      placeholder="select"
                      onChange={this.statusChanged}
                      name="status"
                      value={this.state.status}
                      inputRef={ref => { this.statusSelector = ref; }}
                    >
                      <option value="all">{professionalStatuses.all}</option>
                      <option value="approve">{professionalStatuses.approve}</option>
                      <option value="ban">{professionalStatuses.ban}</option>
                      <option value="waiting_approval">{professionalStatuses.waiting_approval}</option>
                      <option value="profile_incomplete">{professionalStatuses.profile_incomplete}</option>
                      <option value="reject">{professionalStatuses.reject}</option>
                      <option value="not_available">{professionalStatuses.not_available}</option>
                      <option value="available">{professionalStatuses.available}</option>
                      <option value="omw_to_shift">{professionalStatuses.omw_to_shift}</option>
                      <option value="arrived_to_shift">{professionalStatuses.arrived_to_shift}</option>
                      <option value="working_shift">{professionalStatuses.working_shift}</option>
                    </FormControl>
                  </FormGroup>
                </Col>
                <Col lg={3}>
                  <FormGroup>
                    <FormControl
                      onChange={this.filterFieldChanged}
                      componentClass="select"
                      placeholder="Field for search"
                      value={this.state.filterField}
                    >
                      <option value="">Field for search</option>
                      <option value="email">Email</option>
                      <option value="firstname">Firstname</option>
                      <option value="lastname">Lastname</option>
                    </FormControl>
                  </FormGroup>
                </Col>
                <Col lg={4}>
                  <InputGroup >
                    <FormControl
                      disabled={this.state.filterField === ""}
                      type="text"
                      className="form-control"
                      placeholder="Search"
                      name="search_text"
                      onChange={this.filterSearchTextChanged}
                      value={this.state.filterSearchText}
                    />
                    <InputGroup.Button>
                      <Button disabled={this.state.filterField === "" || this.state.filterSearchText === ""} type="submit" bsStyle="primary">
                        <span><i className="fa fa-search fa-fw"></i></span> Start search
                      </Button>
                    </InputGroup.Button>
                  </InputGroup>
                </Col>
                <Col lg={2}>
                  <InputGroup>
                    <Button bsStyle="primary" onClick={this.clear}>
                      <span><i className="fa fa-search fa-fw"></i></span> Clear
                    </Button>
                  </InputGroup>
                </Col>
              </Row>
            </FormGroup>
          </Form>
        </Panel>
      </div>
    );
  }
}
