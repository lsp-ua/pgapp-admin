import React, { Component } from 'react'
import { Panel, FormGroup, FormControl, Checkbox } from 'react-bootstrap'
import MaskedTextInput from 'react-text-mask'

import * as NOTIFICATION_CONSTANT from '../../../constants/notification'
import './List.css'

export default class Settings extends Component {

  constructor(props) {
    super(props);

    this.initData();
  }

  componentWillReceiveProps(props) {
    this.updateData(props.data);
    // this.setState({
    //   value: props.data.time_shift_accept || '',
    //   notification_value: props.data.notification_profs_count || ''
    // });
  }

  initData() {
    this.state = {
      time_shift_accept: '',
      notification_profs_count: 0,

      time_accepted: 0,
      distance_accepted: 0,

      time_available: 0,
      distance_available: 0,

      default_venue_rating: 0,
      default_prof_rating: 0,

      charge_cancelled_shifts: '',
      checked: '',

      distance_not_available: '',
      time_not_available: ''
    };
  }

  updateData(data) {
    this.setState({
      time_shift_accept: data.time_shift_accept,
      notification_profs_count: data.notification_profs_count,

      time_accepted: data.time_accepted,
      distance_accepted: data.distance_accepted,

      time_available: data.time_available,
      distance_available: data.distance_available,

      default_venue_rating: data.default_venue_rating,
      default_prof_rating: data.default_prof_rating,

      charge_cancelled_shifts: data.charge_cancelled_shifts,

      distance_not_available: data.distance_not_available,
      time_not_available: data.time_not_available
    });
    if(data.charge_cancelled_shifts==='0'){
      this.setState({
        checked: false
      })
    }
    else {
      this.setState({
        checked: true
      })
    }
  }

  focusOver(key){
    if (this.props.data[key] === this.state[key]) {
      return true;
    }

    if (!this.state[key]) {
      this.props.appActions.addNotification({
        type: NOTIFICATION_CONSTANT.TYPE.DANGER,
        message: 'Data is not valid'
      });
      return true;
    }

    this.props.canRender(false);
    this.props.settingsActions.setElement(key, this.state[key])
      .then(response => {
        this.props.canRender(true);
        this.props.appActions.addNotification({
          type: NOTIFICATION_CONSTANT.TYPE.SUCCESS,
          message: 'Data was saved successfully'
        });
      });
  }

  change(key, event){
    this.setState({
      [key]: event.target.value
    });
  }

  handleChargeVenue(key){
    let charge='0';
    if(this.state[key]==='0'){
      charge='1';
      this.setState({
        checked: true
      })
    }else{
      charge='0';
      this.setState({
        checked: false
      })
    }
    this.props.settingsActions.setElement(key,charge)
      .then(response => {
        this.props.appActions.addNotification({
          type: NOTIFICATION_CONSTANT.TYPE.SUCCESS,
          message: 'Data was saved successfully'
        });
      });
  }

  render() {

    return (
      <div>
        <Panel collapsible
               defaultExpanded
               header={<span>Settings</span>}
               className="experience">

          <p>Ammount of Service Pros getting Notification at a time:</p>
          <FormGroup bsSize="small">
            <FormControl type="number"
                         value={this.state.notification_profs_count}
                         onBlur={this.focusOver.bind(this, 'notification_profs_count')}
                         onChange={this.change.bind(this, 'notification_profs_count')} />
          </FormGroup>

          <p>Ammount of time to accept the shift:</p>
          <FormGroup bsSize="small">
            <FormControl type="text"
                         placeholder="Enter time in seconds..."
                         value={this.state.time_shift_accept}
                         onBlur={this.focusOver.bind(this, 'time_shift_accept')}
                         onChange={this.change.bind(this, 'time_shift_accept')} />
          </FormGroup>

          <p>Distance to trigger location update on available status (meters):</p>
          <FormGroup bsSize="small">
            <FormControl type="number"
                         value={this.state.distance_available}
                         onBlur={this.focusOver.bind(this, 'distance_available')}
                         onChange={this.change.bind(this, 'distance_available')} />
          </FormGroup>

          <p>Time to trigger location update on available status (minutes):</p>
          <FormGroup bsSize="small">
            <FormControl type="number"
                         value={this.state.time_available}
                         onBlur={this.focusOver.bind(this, 'time_available')}
                         onChange={this.change.bind(this, 'time_available')} />
          </FormGroup>

          <p>Distance to Venue to check arrival status (meters):</p>
          <FormGroup bsSize="small">
            <FormControl type="number"
                         value={this.state.distance_accepted}
                         onBlur={this.focusOver.bind(this, 'distance_accepted')}
                         onChange={this.change.bind(this, 'distance_accepted')} />
          </FormGroup>

          <p>Time to trigger location update on accepted status (minutes):</p>
          <FormGroup bsSize="small">
            <FormControl type="number"
                         value={this.state.time_accepted}
                         onBlur={this.focusOver.bind(this, 'time_accepted')}
                         onChange={this.change.bind(this, 'time_accepted')} />
          </FormGroup>
          <p>Start venue rating:</p>
          <FormGroup bsSize="small">
            <MaskedTextInput mask={[/[0-9]/,'.', /[0-9]/,/[0-9]/]}
                             className="form-control"
                             value={this.state.default_venue_rating}
                             onBlur={this.focusOver.bind(this, 'default_venue_rating')}
                             onChange={this.change.bind(this, 'default_venue_rating')}
                             guide={false}/>
          </FormGroup>
          <p>Start professional rating:</p>
          <FormGroup bsSize="small">
            <MaskedTextInput mask={[/[0-9]/,'.', /[0-9]/,/[0-9]/]}
                             className="form-control"
                             value={this.state.default_prof_rating}
                             onBlur={this.focusOver.bind(this, 'default_prof_rating')}
                             onChange={this.change.bind(this, 'default_prof_rating')}
                             guide={false}/>
          </FormGroup>
          <FormGroup bsSize="small">
            <Checkbox
              onChange={this.handleChargeVenue.bind(this, 'charge_cancelled_shifts')}
              checked={this.state.checked}>
              Charge venue on shift cancel
            </Checkbox>
          </FormGroup>
          <p>Distance to trigger location on not available status (meters):</p>
          <FormGroup bsSize="small">
            <FormControl type="number"
                         value={this.state.distance_not_available}
                         onBlur={this.focusOver.bind(this, 'distance_not_available')}
                         onChange={this.change.bind(this, 'distance_not_available')}/>
          </FormGroup>

          <p>Time to trigger location update on not available status (minutes):</p>
          <FormGroup bsSize="small">
            <FormControl type="number"
                         value={this.state.time_not_available}
                         onBlur={this.focusOver.bind(this, 'time_not_available')}
                         onChange={this.change.bind(this, 'time_not_available')}/>
          </FormGroup>
        </Panel>
      </div>
    );
  }
}
