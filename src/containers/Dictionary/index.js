import React from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

// import './css/font1.css';
// import './css/font2.css';
// import './css/bootstrap.min.css';
// import './css/sb-admin.css';

import * as dictionaryActions from '../../actions/dictionary'
import * as settingsActions from '../../actions/settings'
import * as appActions from '../../actions/app'

class Dictionary extends React.Component {

  render() {

    return (
      <div>
        {
          React.cloneElement(this.props.children, {
            appActions: this.props.appActions,
            dictionaryReducer: this.props.dictionaryReducer,
            dictionaryActions: this.props.dictionaryActions,
            settingsReducer: this.props.settingsReducer,
            settingsActions: this.props.settingsActions
          })
        }
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {
    dictionaryReducer: state.dictionaryReducer,
    settingsReducer: state.settingsReducer
  }
}

function mapDispatchToProps(dispatch) {
  return {
    appActions: bindActionCreators(appActions, dispatch),
    dictionaryActions: bindActionCreators(dictionaryActions, dispatch),
    settingsActions: bindActionCreators(settingsActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dictionary);
