import React from "react"
import { Panel } from "react-bootstrap"

import {DecoratorAddress, DecoratorDictionary} from "../../../services/Decorator"
import phoneService from "../../../services/phone"

export default class VenueElement extends React.Component {

  render() {
    let venues = this.props.data;
    let dictionary = this.props.dictionary;

    return (
      <Panel collapsible defaultExpanded header='General'>
        <p>
          <span className="text-muted"> Address </span>: {DecoratorAddress.getValue(venues.address)}
        </p>
        <p>
          <span className="text-muted"> Phone </span>: {phoneService.phoneMask(venues.phone)}
        </p>
        <p>
          <span
            className="text-muted"> Main POS </span>: {DecoratorDictionary.getValue(venues.main_pos, dictionary.pos) || "Not found"}
        </p>
        <p>
          <span
            className="text-muted"> Acceptable POSes </span>: {DecoratorDictionary.getValue(venues.acceptable_pos, dictionary.pos) || "Not found"}
        </p>
        <p>
          <span
            className="text-muted"> Dress code shirts </span>: {DecoratorDictionary.getValue(venues.dress_code_shirt, dictionary.dress_code_shirt) || "Not found"}
        </p>
        <p>
          <span
            className="text-muted"> Dress code pants </span>: {DecoratorDictionary.getValue(venues.dress_code_pant, dictionary.dress_code_pant) || "Not found"}
        </p>
        <p>
          <span
            className="text-muted"> Dress code shoes </span>: {DecoratorDictionary.getValue(venues.dress_code_shoes, dictionary.dress_code_shoes) || "Not found"}
        </p>
      </Panel>
    );
  }
}

