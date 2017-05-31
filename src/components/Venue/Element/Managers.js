import React, {Component} from "react"
import { Panel } from "react-bootstrap"

export default class VenueManagers extends Component {

  renderElement(element, index) {
    return (
      <p key={index}>
        {
          (element.manager_id)
            ? <a href={`/#/manager/${element.manager_id}`}> {element.manager_email}</a>
            : element.manager_email
        }
        &nbsp;
        {element.owner === 'true' ? <span className="label label-danger">Owner</span> : null}
        &nbsp;
        <span className="label label-info">{element.status}</span>
      </p>
    );
  }

  render() {
    let managers = this.props.data;

    return (
      <Panel collapsible defaultExpanded header='Managers'>
          <div>
            {
              (managers && managers.map((element, index) => {
                return this.renderElement(element, index)
              })) || 'Not found'
            }
          </div>
      </Panel>
    );
  }
}


