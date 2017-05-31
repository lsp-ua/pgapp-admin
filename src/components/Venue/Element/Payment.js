import React from 'react'
import { Panel } from 'react-bootstrap'

export default class VenuePayment extends React.Component {

  render() {
    let payment = this.props.data || {};

    return (
      <Panel collapsible defaultExpanded header="Payment">
        <p>
          <span className="text-muted">CC number</span>: {payment.last4 ? `************${payment.last4}` : "Not found"}
        </p>
        <p>
          <span className="text-muted">CCV</span>: {payment.cvc_check ? payment.cvc_check : "Not found"}
        </p>
        <p>
          <span className="text-muted"> Expiration date</span>: {payment.exp_month ? `${payment.exp_month}/${payment.exp_year}` : "Not found"}
        </p>
      </Panel>
    );
  }
}

