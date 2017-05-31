import React from 'react'
import { Panel } from 'react-bootstrap'

import { DecoratorBase, DecoratorDictionary, DecoratorDateTime } from '../../../services/Decorator'
import { shiftsStatuses } from '../../../constants/dicts/statuses'

export default class ShiftElement extends React.Component {

   render() {
    let shift = this.props.shift || {};
    let dictionary = this.props.dictionary;

    return (
      <Panel collapsible defaultExpanded header='General'>
        <div>
          <span className="text-muted">Position:</span>
          <span className="text-value">{DecoratorDictionary.getValue(shift.position_id, dictionary.position)}</span>
        </div>
        <div>
          <span className="text-muted">Status:</span>
          <span className="text-value">{shiftsStatuses[shift.status]}</span>
        </div>
        <div>
          <span className="text-muted">Arrival time:</span>
          <span className="text-value">{DecoratorDateTime.getShiftArrivalDate(shift.arrival_time)} {DecoratorDateTime.getShiftArrivalTime(shift.arrival_time)}</span>
        </div>
        <div>
          <span className="text-muted">Created by:</span>
          <span className="text-value">{DecoratorBase.concatValues([shift.created_by.firstname, shift.created_by.lastname])}</span>
        </div>
        <div>
          <span className="text-muted">Created time:</span>
          <span className="text-value">{DecoratorDateTime.getShiftArrivalDate(shift.created_at)} {DecoratorDateTime.getShiftArrivalTime(shift.created_at)}</span>
        </div>
        <div>
          <span className="text-muted">Work duration:</span>
          <span className="text-value">{`${shift.work_duration} hours`}</span>
        </div>
      </Panel>
    );
  }
}

