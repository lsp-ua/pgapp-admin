import React, {Component} from 'react';
import * as NOTIFICATION_CONSTANT from '../../../constants/notification';
import {
  Button,
  Panel,
  Row,
  Col,
  FormGroup,
  FormControl
} from 'react-bootstrap';
import Moment from 'moment';

export default class Invite extends Component {

  constructor(props) {
    super(props);
    this.state = {
      inviteCode: ''
    };
    this.formatDate = this.formatDate.bind(this);
  }

  componentDidMount(){
    this.props.professionalActions.getInvite(this.props.professional.user_id);
  }

  handleInviteChange(event) {
    this.setState({
      inviteCode: event.target.value
    });
  }

  addInviteCode() {
    if (this.state.inviteCode.trim() === ''){
      this.props.appActions.addNotification({
        type: NOTIFICATION_CONSTANT.TYPE.DANGER,
        message: 'Field is empty!'
      });
    } else {
      this.props.professionalActions.addInvite(this.props.professional.user_id, this.state.inviteCode)
        .then(response => {
          if (response) {
            this.props.appActions.addNotification({
              type: NOTIFICATION_CONSTANT.TYPE.SUCCESS,
              message: 'Data save successful!'
            });
            this.setState({inviteCode: ''});
          } else {
            this.props.appActions.addNotification({
              type: NOTIFICATION_CONSTANT.TYPE.DANGER,
              message: 'Duplicate code!'
            });
            this.setState({inviteCode: ''});
          }
        });
    }
  }

  handleKeyPress(e){
    if (e.charCode === 13) {
      this.addInviteCode();
    }
  }

  formatDate(date) {
    return Moment(date).format('MM/DD/YYYY');
  }

  render(){
    let invite = this.props.professionalReducer.invite;
    return(
      <div>
        <Panel collapsible defaultExpanded header={<span>Invite Code</span>} className="references">
          <Row>
            <Col lg={12} md={12} sm={12} xs={12} style={{display:'inline-flex'}}>
              <FormGroup style={{width:'100%', marginRight:5}}>
                <FormControl
                  type="text"
                  value={this.state.inviteCode}
                  onChange={this.handleInviteChange.bind(this)}
                  onKeyPress={this.handleKeyPress.bind(this)}
                />
              </FormGroup>
              <FormGroup>
                <Button onClick={this.addInviteCode.bind(this)}>Add code</Button>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <table className="table table-striped">
              <thead>
              <tr>
                <th>Code</th>
                <th>Created at</th>
                <th>Redeemed</th>
              </tr>
              </thead>
              <tbody>
                { (invite)
                  ? invite.map((element, index) => {
                    return (
                      <tr key={index}>
                        <td>{element.code}</td>
                        <td>{this.formatDate(element.created_at)}</td>
                        <td>{element.redeemed}</td>
                      </tr>
                    );
                  })
                  : this.notFound
                }
              </tbody>
            </table>
          </Row>
        </Panel>
      </div>
    );
  }
}
