import React from 'react'
import {
  NavDropdown,
  MenuItem,
} from 'react-bootstrap'
import Navbar, {Brand} from 'react-bootstrap/lib/Navbar'

import Sidebar from '../Sidebar'
// import * as APP_CONSTANT from '../../constants/app'

// const logo = require('./logo.png');

export default class Header extends React.Component {

  constructor(props) {
    super(props);
    this.onMenuSelect = this.onMenuSelect.bind(this);
  }

  onMenuSelect(eventKey, event) {
    this.context.router.push(this.props.menuItems[eventKey].link);
  }

  render() {
    console.log(this.props.authActions)
    return (
      <div id="wrapper" className="content">
        <Navbar fluid={true} style={ {margin: 0} }>
          <ul className="nav navbar-top-links navbar-left visible-sm visible-xs" style={ {float: "left"} }>
            <NavDropdown title={<i className="fa fa-bars fa-fw"></i> } id='navDropdown1'
            onSelect={this.onMenuSelect}>
              {this.props.menuItems.map((item, index)=>{
                return (
                  <MenuItem key={item.link} eventKey={index}>
                    <span> <i className={`fa ${item.icon} fa-fw`}></i> &nbsp;{item.text}</span>
                  </MenuItem>
                )
              })}
            </NavDropdown>
          </ul>
          <Brand>
            <span>
              <span>&nbsp;{`PgApp-admin`}</span>
            </span>
          </Brand>
          <ul className="nav navbar-top-links navbar-right">
            <NavDropdown title={<i className="fa fa-user fa-fw"></i> } id='navDropdown4'>
              <MenuItem eventKey="1">
                <span> <i className="fa fa-user fa-fw"></i> User Profile </span>
              </MenuItem>
              <MenuItem eventKey="2">
                <span><i className="fa fa-gear fa-fw"></i> Settings </span>
              </MenuItem>
              <MenuItem divider/>
              <MenuItem eventKey="4" onClick={(e) => {
                this.props.authActions.logout()
                  .then(response=>{
                    localStorage.removeItem('api_token');
                    localStorage.removeItem('app_user');
                    window.location = '/';
                  })

              }}>
                <span> <i className="fa fa-sign-out fa-fw"/> Logout </span>
              </MenuItem>
            </NavDropdown>
          </ul>
          <Sidebar menuItems={this.props.menuItems} />
        </Navbar>
      </div>
    );
  }
}

Header.contextTypes = {
  router: React.PropTypes.object.isRequired
};
