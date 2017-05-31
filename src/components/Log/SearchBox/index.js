import React from 'react';
import {Panel, Row, Col, Form, FormGroup, FormControl, InputGroup, Button} from 'react-bootstrap';
import Search from '../../Base/Search';
import DatePicker from 'react-bootstrap-date-picker'
import Moment from 'moment'
import './custom.css'
export default class SearchBox extends Search {
  constructor(props) {
    super(props);
    this.filterFieldChanged = this.filterFieldChanged.bind(this);
    this.clear = this.clear.bind(this);

    this.state = {
      items: [],
      display: 'none',
      filterField:'',
      date_start:'',
      date_end:'',
      filterSearchText:''

    }
  };

  clear(){
    let newState = {
      lastKey: null,
      filterField: '',
      filterSearchText: '',
      date_start:'',
      date_end:'',
      display: 'none'
    };

    this.setState(newState, () => {
      this.needUpdateList()
    })
  }
  handleChangeStart(value, formattedValue) {
    this.setState({
      date_start: Moment(value).format('YYYY-MM-DD'),
      formattedValue: formattedValue
    });
  }

  handleChangeEnd(value, formattedValue) {
    this.setState({
      date_end: Moment(value).format('YYYY-MM-DD'),
      formattedValue: formattedValue
    });
    console.log(this.state.date_end)
  }

  filterFieldChanged(e) {
    this.setState({
      filterField: e.target.value,
      display: 'none'
    });
    if(e.target.value === 'date_start'){
      this.setState({
        display: 'block'
      });
    }
  }

  render() {
    return (
      <div>
        <Panel>
          <Form ref="searchForm" onSubmit={this.formSubmit}>
            <div className="control-group"></div>
            <FormGroup>
              <Row>
                <Col lg={3}>
                  <FormGroup>
                    <FormControl
                      onChange={this.filterFieldChanged}
                      componentClass="select"
                      placeholder="Field for search"
                      value={this.state.filterField}>
                      <option value="">Field for search</option>
                      <option value="date_start">Date</option>
                      <option value="venue_id">Venue id</option>
                      <option value="shift_id">Shift id</option>
                      <option value="user_id">User id</option>
                    </FormControl>
                  </FormGroup>
                </Col>
                <Col lg={4}>
                  <InputGroup >
                    <FormControl
                      disabled={this.state.filterField === ""}
                      type={this.state.filterField === "date_start" ? "hidden": "text"}
                      className="form-control"
                      placeholder="Search"
                      name="search_text"
                      onChange={this.filterSearchTextChanged}
                      value={this.state.filterSearchText}
                    />
                    <Col lg={6}>
                      <DatePicker id="date_start"
                                  value={this.state.date_start}
                                  dateFormat="MM/DD/YYYY"
                                  onChange={this.handleChangeStart.bind(this)}
                                  style={{display: this.state.display}}
                                  showClearButton={false}
                                  className="date_start"
                                 />
                    </Col>
                    <Col lg={6}>
                      <DatePicker id="date_end"
                                  value={this.state.date_end}
                                  dateFormat="MM/DD/YYYY"
                                  onChange={this.handleChangeEnd.bind(this)}
                                  style={{display: this.state.display}}
                                  showClearButton={false}
                      className={"datepick"}/>
                    </Col>
                    <InputGroup.Button>
                      <Button disabled={this.state.filterField === "" && this.state.filterSearchText === ""} type="submit" bsStyle="primary">
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
