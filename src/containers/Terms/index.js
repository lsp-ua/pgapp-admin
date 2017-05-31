import React from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as termsActions from '../../actions/terms'
import * as appActions from '../../actions/app'

class Terms extends React.Component {

  render() {

    return (
      <div>
        {
          React.cloneElement(this.props.children, {
            appReducer: this.props.appReducer,
            appActions: this.props.appActions,
            termsReducer: this.props.termsReducer,
            termsActions: this.props.termsActions
          })
        }
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {
    appReducer: state.appReducer,
    termsReducer: state.termsReducer
  }
}

function mapDispatchToProps(dispatch) {
  return {
    appActions: bindActionCreators(appActions, dispatch),
    termsActions: bindActionCreators(termsActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Terms);
