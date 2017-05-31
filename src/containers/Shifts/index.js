import React from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as shiftsActions from '../../actions/shifts'
import * as dictionaryActions from '../../actions/dictionary'
import * as managerActions from '../../actions/manager'
import * as appActions from '../../actions/app'

class Shifts extends React.Component {
  render() {
    return (
      <div>
        {
          React.cloneElement(this.props.children, {
            appReducer: this.props.appReducer,
            appActions: this.props.appActions,
            componentReducer: this.props.shiftsReducer,
            componentActions: this.props.shiftsActions,
            dictionaryReducer: this.props.dictionaryReducer,
            dictionaryActions: this.props.dictionaryActions,
            managerActions: this.props.managerActions,
            managerReducer: this.props.managerReducer,
          })
        }
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {
    appReducer: state.appReducer,
    shiftsReducer: state.shiftsReducer,
    dictionaryReducer: state.dictionaryReducer,
    managerReducer: state.managerReducer
  }
}

function mapDispatchToProps(dispatch) {
  return {
    appActions: bindActionCreators(appActions, dispatch),
    shiftsActions: bindActionCreators(shiftsActions, dispatch),
    dictionaryActions: bindActionCreators(dictionaryActions, dispatch),
    managerActions: bindActionCreators(managerActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Shifts);
