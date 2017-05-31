import React from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as adminActions from '../../actions/admin';
import * as appActions from '../../actions/app'

class Admin extends React.Component {

  render() {

    return (
      <div>
        {
          React.cloneElement(this.props.children, {
            appReducer: this.props.appReducer,
            appActions: this.props.appActions,
            componentReducer: this.props.adminReducer,
            componentActions: this.props.adminActions
          })
        }
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {
    appReducer: state.appReducer,
    adminReducer: state.adminReducer
  }
}

function mapDispatchToProps(dispatch) {
  return {
    appActions: bindActionCreators(appActions, dispatch),
    adminActions: bindActionCreators(adminActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Admin);

