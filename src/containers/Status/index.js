import React from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'


import * as statusActions from '../../actions/status'
import * as appActions from '../../actions/app'


class Status extends React.Component {

  render() {

    return (
      <div>
        {
          React.cloneElement(this.props.children, {
            appReducer: this.props.appReducer,
            appActions: this.props.appActions,
            statusReducer: this.props.statusReducer,
            statusActions: this.props.statusActions
          })
        }
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {
    appReducer: state.appReducer,
    statusReducer: state.statusReducer
  }
}

function mapDispatchToProps(dispatch) {
  return {
    appActions: bindActionCreators(appActions, dispatch),
    statusActions: bindActionCreators(statusActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Status);

