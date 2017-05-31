import React from 'react'
import {Row, Col, Button, Alert} from 'react-bootstrap'

export default class VenueStatus extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonCondition: false
    };
  }
  componentDidMount(){
this.handleButtonCondition();
  }

  handleButtonCondition(){
    if(!this.props.venue.payment || this.props.venue.market_usable_status === 'market_is_absent'){
      this.setState({
        buttonCondition: true
      });
    }
  }
  get showPayBanner(){
    if(!this.props.venue.payment) {
      return(
        <Row>
        <Alert bsStyle="warning">
          There is no payment info added yet. Can't Approve.
        </Alert>
        </Row>
      )
    }
  }

  get showZipBanner(){
    if(this.props.venue.market_usable_status === 'market_is_absent') {
      return(
        <Row>
          <Alert bsStyle="warning">
            Current zip code is not in range of our market zip codes. Can't Approve.
          </Alert>
        </Row>
      )
    }
  }

  handleActivateBtnClick() {
    this.props.venueAction.setStatus(this.props.venue.uuid, 'active');
  }

  handleDeactivateBtnClick() {
    this.props.venueAction.setStatus(this.props.venue.uuid, 'not_active');
  }

  get bottomBtnBlock() {

    return (
      <div className="well text-center">
        <Row>
          <Col lg={12} xs={12}>
            {this.props.venue.status === 'active'
              ? <Button bsStyle="danger"
                        bsSize="large"
                        disabled={this.state.buttonCondition}
                        onClick={this.handleDeactivateBtnClick.bind(this)}>Deactivate</Button>
              : <Button bsStyle="success"
                        bsSize="large"
                        disabled={this.state.buttonCondition}
                        onClick={this.handleActivateBtnClick.bind(this)}>Activate</Button>
            }
          </Col>

        </Row>
      </div>
    )
  }

  render() {

    return (
      <div>
        {this.showPayBanner}
        {this.showZipBanner}
        {this.bottomBtnBlock}
      </div>
    );
  }
}

