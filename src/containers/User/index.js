import React from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as userActions from '../../actions/user';
import * as appActions from '../../actions/app'

class User extends React.Component {

  render() {

    return (
      <div>
        {
          React.cloneElement(this.props.children, {
            appReducer: this.props.appReducer,
            appActions: this.props.appActions,
            componentReducer: this.props.userReducer,
            componentActions: this.props.userActions
          })
        }
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {
    appReducer: state.appReducer,
    userReducer: state.userReducer
  }
}

function mapDispatchToProps(dispatch) {
  return {
    appActions: bindActionCreators(appActions, dispatch),
    userActions: bindActionCreators(userActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(User);

