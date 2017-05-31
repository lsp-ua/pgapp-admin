import React from 'react';
import {Panel, Row, Col, Form, FormGroup, FormControl, InputGroup, Button} from 'react-bootstrap';
import Search from '../../Base/Search';

export default class SearchBox extends Search {
  render() {
    return (
      <div>
        <Panel header={<span>Filter</span>}>
          <Form ref="searchForm" onSubmit={this.formSubmit}>
            <div className="control-group help-block"></div>
            <FormGroup>
              <Row>
                <Col lg={5}>
                  <FormGroup>
                    <FormControl
                      onChange={this.filterFieldChanged}
                      componentClass="select"
                      placeholder="Field for search"
                      value={this.state.filterField}
                    >
                      <option value="">Field for search</option>
                      <option value="firstname">Firstname</option>
                      <option value="lastname">Lastname</option>
                    </FormControl>
                  </FormGroup>
                </Col>
                <Col lg={5}>
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
    )
  }
}
