import React from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Header from '../../components/Header';
import Notification from '../../components/Notification';

import * as appActions from '../../actions/app'
import * as authActions from '../../actions/auth'

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.menuItems = [
      {
        link: '/',
        icon: 'fa-dashboard',
        text: 'Dashboard'
      },
      {
        link: '/users',
        icon: 'fa-users',
        text: 'Users'
      },
      {
        link: '/application',
        icon: 'fa-table',
        text: 'Application'
      },
      {
        link: '/category',
        icon: 'fa-map-marker',
        text: 'Category'
      },
      {
        link: '/setting',
        icon: 'fa-cogs',
        text: 'Settings'
      }
    ]
  }

  render() {

    return (
      <div id="main-layout">
        {(this.props.appReducer.notification !== '')
          ? <Notification data={this.props.appReducer.notification}
                          appActions={this.props.appActions} />
          : null
        }
        <Header menuItems={this.menuItems} authActions={this.props.authActions}/>
        <div id="page-wrapper" className="page-wrapper">
          {this.props.children}
        </div>
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {
    appReducer: state.appReducer,
    authReducer: state.authReducer,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    appActions: bindActionCreators(appActions, dispatch),
    authActions: bindActionCreators(authActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
