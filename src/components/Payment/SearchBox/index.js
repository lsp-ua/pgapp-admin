import React from 'react'
import {Panel, Row, Col, Form, FormGroup, FormControl, InputGroup, Button} from 'react-bootstrap'
import Search from '../../Base/Search'

export default class SearchBox extends Search {

  filterFieldChanged(e){
    this.setState({
      filterField: e.target.value,
      fieldName: e.target.name
    })
   if(e.target.name==='debt'){
     this.setState({
       filterField: e.target.value,
       filterSearchText: '1'
     },() => {
       this.needUpdateList(e);
       this.setState({
         filterSearchText: ''
       })
     })
   }
  }

  render() {
    return (
      <div>
        <Panel>
          <Form ref="searchForm" onSubmit={this.formSubmit}>
            <div className="control-group help-block"></div>
            <FormGroup>
              <Row>
                <Col lg={3}>
                  <FormGroup>
                    <FormControl onChange={this.filterFieldChanged}
                                 componentClass="select"
                                 placeholder="Field for search"
                                 value={this.state.filterField}>
                      <option value="">Field for search</option>
                      <option value="shift_id">Shift id</option>
                      <option value="prof_id">Professional id</option>
                      <option value="venue_id">Venue id</option>
                      <option value="charge_venue_reason">Charge venue reason</option>
                    </FormControl>
                  </FormGroup>
                  </Col>
                <Col lg={3}>
                  <FormGroup>
                    <FormControl
                      onChange={this.filterFieldChanged}
                      componentClass="select"
                      placeholder="Debt venue"
                      name="debt"
                      value={this.state.filterField}>
                      <option value="">Field to search</option>
                      <option value="debt_venue_exists">Debt venue</option>
                      <option value="debt_prof_exists">Debt professional</option>
                    </FormControl>
                  </FormGroup>
                </Col>
                <Col lg={4}>
                  <InputGroup >
                    <FormControl disabled={this.state.filterField === ""}
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
