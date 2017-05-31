import React from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as venueActions from '../../actions/venue'
import * as dictionaryActions from '../../actions/dictionary'
import * as appActions from '../../actions/app'

class Venue extends React.Component {
  render() {
    return (
      <div>
        {
          React.cloneElement(this.props.children, {
            appReducer: this.props.appReducer,
            appActions: this.props.appActions,
            componentReducer: this.props.venueReducer,
            componentActions: this.props.venueActions,
            dictionaryReducer: this.props.dictionaryReducer,
            dictionaryActions: this.props.dictionaryActions
          })
        }
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {
    appReducer: state.appReducer,
    venueReducer: state.venueReducer,
    dictionaryReducer: state.dictionaryReducer
  }
}

function mapDispatchToProps(dispatch) {
  return {
    appActions: bindActionCreators(appActions, dispatch),
    venueActions: bindActionCreators(venueActions, dispatch),
    dictionaryActions: bindActionCreators(dictionaryActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Venue);
