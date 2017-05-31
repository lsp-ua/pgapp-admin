import React from 'react'
import { Panel } from 'react-bootstrap'

import { DecoratorAddress, DecoratorDictionary } from '../../../services/Decorator'
import * as helpers from '../../../services/helpers'

export default class ShiftElement extends React.Component {

  render() {
    let { venue, dictionary } = this.props;

    return (
      <Panel collapsible defaultExpanded header='Venue details'>
        <div>
          <span className="text-muted">Name:</span>
          <span className="text-value">{helpers.getObjValue(venue, 'name', 'N/A')}</span>
        </div>
        <div>
          <span className="text-muted">Address:</span>
          <span className="text-value">{DecoratorAddress.getValue(venue.address)}</span>
        </div>
        <div>
          <span className="text-muted">Dress code shoes:</span>
          <span className="text-value">{DecoratorDictionary.getValue(venue.dress_code_shoes, dictionary.dress_code_shoes)}</span>
        </div>
        <div>
          <span className="text-muted">Dress code pant:</span>
          <span className="text-value">{DecoratorDictionary.getValue(venue.dress_code_pant, dictionary.dress_code_pant)}</span>
        </div>
        <div>
          <span className="text-muted">Dress code shirt:</span>
          <span className="text-value">{DecoratorDictionary.getValue(venue.dress_code_shirt, dictionary.dress_code_shirt)}</span>
        </div>
      </Panel>
    );
  }
}

