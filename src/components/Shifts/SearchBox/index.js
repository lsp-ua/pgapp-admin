import React from 'react'
import {Panel, Row, Col, Form, FormGroup, FormControl, InputGroup, Button} from 'react-bootstrap'
import Search from '../../Base/Search'
import { shiftsStatuses } from '../../../constants/dicts/statuses'
import DatePicker from 'react-bootstrap-date-picker'
import Moment from 'moment'
import {Typeahead} from 'react-bootstrap-typeahead';
export default class SearchBox extends Search {

  constructor(props) {
    super(props);
    this.filterFieldChanged = this.filterFieldChanged.bind(this);
    this.clear = this.clear.bind(this);
    this.state = {
      displaySearch: 'block',
      displayManager: 'none',
      display: 'none',
      date_start: '',
      date_end: '',
      filterField: '',
      filterSearchText: '',
      data: [],
      items: [],
      filterBy: 'callback',
      managerText: '',
      managerId:'',
      status:'all'
    }
  }

  clear(){
    let newState = {
      displaySearch: 'block',
      displayManager:'none',
      display:'none',
      date_start:'',
      date_end: '',
      filterField: '',
      filterSearchText:'',
      items: [],
      status: 'all',
      managerText: '',
      uuid:''
    };
    this._typeahead.getInstance().clear();
    this.setState(newState, () => {
      this.needUpdateList()
    })
  }

  filterFieldChanged(e) {
    this.setState({
      filterField: e.target.value,
      display: 'none',
      displayManager:'none',
      displaySearch: 'block'
    });
    if(e.target.value === 'date'){
      this.setState({
        display: 'block',
        displayManager:'none',
        displaySearch: 'none'
      });
    } else
    if(e.target.value === 'manager_id'){
      this.setState({
        display: 'none',
        displayManager: 'block',
        displaySearch: 'none'
      });
    }
    if(e.target.value === 'date'){
      this.setState({
        filterSearchText: ''
      })
    }
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
  }

  getId(value){
    let id;
    this.props.managers.map((element)=>{
       if(element.firstname === value || element.lastname === value){
         id=element.uuid;
       }
       return true;
    })
    this.setState({
      filterSearchText: id
    })
  }

  handleManager(e){
    this.getId(e);
    this.setState({
      managerText: e
    })
  }

  render() {
    let {filterBy} = this.state.filterBy;
    let filterByFields = ['firstname', 'lastname'];
    let filterByCallback = (option, text) => {
      return (
        option.firstname.toLowerCase().indexOf(text.toLowerCase()) !== -1 ||
        option.lastname.toLowerCase().indexOf(text.toLowerCase()) !== -1
      );
    };

    return (
      <div>
        <Panel>
          <Form ref="searchForm" onSubmit={this.formSubmit}>
            <div className="control-group help-block"></div>
            <FormGroup>
              <Row>
                <Col lg={3}>
                  <FormGroup>
                    <FormControl componentClass="select"
                                 placeholder="select"
                                 onChange={this.statusChanged}
                                 name="status"
                                 value={this.state.status}>
                      <option value="all">{shiftsStatuses.all}</option>
                      <option value="active">{shiftsStatuses.active}</option>
                      <option value="new">{shiftsStatuses.new}</option>
                      <option value="not_found">{shiftsStatuses.not_found}</option>
                      <option value="not_rated">{shiftsStatuses.not_rated}</option>
                      <option value="professional_arrived">{shiftsStatuses.professional_arrived}</option>
                      <option value="looking_for_professionals">{shiftsStatuses.looking_for_professionals}</option>
                      <option value="professional_found">{shiftsStatuses.professional_found}</option>
                      <option value="error">{shiftsStatuses.error}</option>
                      <option value="rejected">{shiftsStatuses.rejected}</option>
                      <option value="rated">{shiftsStatuses.rated}</option>
                    </FormControl>
                  </FormGroup>
                </Col>
                <Col lg={3}>
                  <FormGroup>
                    <FormControl onChange={this.filterFieldChanged}
                                 componentClass="select"
                                 placeholder="Field for search"
                                 value={this.state.filterField}>
                      <option value="">Field for search</option>
                      <option value="venue_name">Venue</option>
                      <option value="position_name">Position name</option>
                      <option value="professional_first_name">Professional first name</option>
                      <option value="professional_last_name">Professional last name</option>
                      <option value="date">Date</option>
                      <option value="manager_id">Manager</option>
                    </FormControl>
                  </FormGroup>
                </Col>
                <Col lg={4}>
                  <InputGroup >
                    <FormControl disabled={this.state.filterField === ""}
                                 type={this.state.filterField === "date" ? "hidden": "text"}
                                 className="form-control"
                                 placeholder="Search"
                                 name="search_text"
                                 onChange={this.filterSearchTextChanged}
                                 value={this.state.filterSearchText}
                                 style={{display: this.state.displaySearch}}

                    />

                    <Col lg={6} sm={6} xs={6} className="dateRange">
                      <DatePicker id="date_start"
                                  value={this.state.date_start}
                                  dateFormat="MM/DD/YYYY"
                                  onChange={this.handleChangeStart.bind(this)}
                                  style={{display: this.state.display}}
                                  showClearButton={false}
                                  className="date_start"
                      />
                    </Col>
                    <Col lg={6} sm={6} xs={6} className="dateRange">
                      <DatePicker id="date_end"
                                  value={this.state.date_end}
                                  dateFormat="MM/DD/YYYY"
                                  onChange={this.handleChangeEnd.bind(this)}
                                  style={{display: this.state.display}}
                                  showClearButton={false}
                                  className={"datepick"}/>
                    </Col>
                    <Col lg={12} className="managerField">
                      <div style={{display: this.state.displayManager}}>
                        <Typeahead
                          filterBy={filterBy === 'callback' ? filterByCallback : filterByFields}
                          labelKey="firstname"
                          placeholder="Type name of manager"
                          options={this.props.managers}
                          onInputChange={this.handleManager.bind(this)}
                          ref={ref => this._typeahead = ref}
                          renderMenuItemChildren={option => (
                            <div>
                                <span>{option.firstname} {option.lastname}</span>
                            </div>
                          )}
                        />
                      </div>
                    </Col>
                    <InputGroup.Button>
                      <Button disabled={this.state.filterField === "" || this.state.filterSearchText === "" && this.state.date_start === '' && this.state.managerText === ''} type="submit" bsStyle="primary" className="search-button">
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
