import React from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as paymentsActions from '../../actions/payment'
import * as shiftsActions from '../../actions/shifts'
import * as appActions from '../../actions/app'

class Payment extends React.Component {
  render() {
    return (
      <div>
        {
          React.cloneElement(this.props.children, {
            appReducer: this.props.appReducer,
            appActions: this.props.appActions,
            componentReducer: this.props.paymentsReducer,
            componentActions: this.props.paymentsActions,
            shiftsReducer: this.props.shiftsReducer,
            shiftsActions: this.props.shiftsActions
          })
        }
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {
    appReducer: state.appReducer,
    paymentsReducer: state.paymentsReducer,
    paymentsActions: state.paymentsActions,
    shiftsActions: state.shiftsActions
  }
}

function mapDispatchToProps(dispatch) {
  return {
    appActions: bindActionCreators(appActions, dispatch),
    paymentsActions: bindActionCreators(paymentsActions, dispatch),
    shiftsActions: bindActionCreators(shiftsActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Payment);
