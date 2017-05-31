import React from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

// import './css/font1.css';
// import './css/font2.css';
// import './css/bootstrap.min.css';
// import './css/sb-admin.css';

import * as professionalActions from '../../actions/professional'
import * as appActions from '../../actions/app'

class Professional extends React.Component {

  render() {

    return (
      <div>
        {
          React.cloneElement(this.props.children, {
            appReducer: this.props.appReducer,
            appActions: this.props.appActions,
            componentReducer: this.props.professionalReducer,
            componentActions: this.props.professionalActions
          })
        }
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {
    appReducer: state.appReducer,
    professionalReducer: state.professionalReducer
  }
}

function mapDispatchToProps(dispatch) {
  return {
    appActions: bindActionCreators(appActions, dispatch),
    professionalActions: bindActionCreators(professionalActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Professional);
