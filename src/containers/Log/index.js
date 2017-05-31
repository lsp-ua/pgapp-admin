import React from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as logActions from '../../actions/log'
import * as appActions from '../../actions/app'

class Log extends React.Component {
  render() {
    return (
      <div>
        {
          React.cloneElement(this.props.children, {
            appReducer: this.props.appReducer,
            appActions: this.props.appActions,
            componentActions: this.props.logActions,
            componentReducer: this.props.logReducer,
          })
        }
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {
    appReducer: state.appReducer,
    logReducer: state.logReducer,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    appActions: bindActionCreators(appActions, dispatch),
    logActions: bindActionCreators(logActions, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Log);
