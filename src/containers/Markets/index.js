import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as marketsActions from '../../actions/markets'
import * as dictionaryActions from '../../actions/dictionary'
import * as appActions from '../../actions/app'

class Markets extends React.Component {
  render() {
    return(
      <div>
        {
          React.cloneElement(this.props.children, {
            appActions: this.props.appActions,
            marketsReducer: this.props.marketsReducer,
            marketsActions: this.props.marketsActions,
            dictionaryReducer: this.props.dictionaryReducer,
            dictionaryActions: this.props.dictionaryActions,
          })
        }
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    marketsReducer: state.marketsReducer,
    dictionaryReducer: state.dictionaryReducer
  }
}

function mapDispatchToProps(dispatch) {
  return {
    appActions: bindActionCreators(appActions, dispatch),
    marketsActions: bindActionCreators(marketsActions, dispatch),
    dictionaryActions: bindActionCreators(dictionaryActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Markets);
