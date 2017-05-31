import React, {Component} from "react";
import {Panel} from "react-bootstrap";
import Loading from "../../Loading";
import Moment from 'moment';

export default class AdminElement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    }
  }

  componentDidMount(){
    console.log(this.props);
  }

  componentWillReceiveProps() {
    this.setState({
      isLoading: false,
    });
  }

  formatDate(date) {
    return Moment(date).format('MM/DD/YYYY');
  }

  render(){
    let admin = this.props.data;
    return(
    <Panel collapsible defaultExpanded header='Personal Info'>
      { (this.state.isLoading)
        ? <Loading />
        :
        <div>
          <p>
            <span className="text-muted">User ID</span>: {(admin.user_id) ? (admin.user_id) : "Not found"}
          </p>
          <p>
            <span className="text-muted">UUID</span>: {(admin.uuid) ? (admin.uuid) : "Not found"}
          </p>
          <p>
            <span className="text-muted">First name</span>: {(admin.firstname) ? (admin.firstname) : "Not found"}
          </p>
          <p>
            <span className="text-muted">Last name</span>: {(admin.lastname) ? (admin.lastname) : "Not found"}
          </p>
          <p>
            <span className="text-muted">Email</span>: {(admin.email) ? (admin.email) : "Not found"}
          </p>
          <p>
            <span className="text-muted">Status</span>: {(admin.status) ? (<span className="label label-info">{admin.status}</span>) : "Not found"}
          </p>
          <p>
            <span className="text-muted">Created at</span>: {(admin.created_at) ? (this.formatDate(admin.created_at)) : "Not found"}
          </p>
        </div>}
    </Panel>
    );
  }
}

