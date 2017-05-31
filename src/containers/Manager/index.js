import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as managerActions from '../../actions/manager'
import * as appActions from '../../actions/app'

class Manager extends React.Component {
  render() {
    return(
      <div>
        {
          React.cloneElement(this.props.children, {
            appActions: this.props.appActions,
            componentReducer: this.props.managerReducer,
            componentActions: this.props.managerActions
          })
        }
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    managerReducer: state.managerReducer
  }
}

function mapDispatchToProps(dispatch) {
  return {
    appActions: bindActionCreators(appActions, dispatch),
    managerActions: bindActionCreators(managerActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Manager);
