import React from 'react'
import {Panel} from 'react-bootstrap'
import * as helpers from '../../../services/helpers'

export default class ProfessionalElement extends React.Component {

  render() {
    let { professional } = this.props;

    return (
      <Panel collapsible defaultExpanded header='Professional details'>
        <div>
          <span className="text-muted">First name:</span>
          <span className="text-value">{helpers.getObjValue(professional, 'firstname', 'N/A')}</span>
        </div>
        <div>
          <span className="text-muted">Last name:</span>
          <span className="text-value">{helpers.getObjValue(professional, 'lastname', 'N/A')}</span>
        </div>
      </Panel>
    );
  }
}

