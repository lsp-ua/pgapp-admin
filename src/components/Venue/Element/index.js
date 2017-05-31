import React from 'react'
import { Row, Col, PageHeader } from 'react-bootstrap'

import ComponentInterface from '../../../components/ComponentInterface'
import Loading from '../../../components/Loading'

import General from '../Element/General'
import Payment from '../Element/Payment'
import Managers from '../Element/Managers'
import Status from '../Element/Status'

export default class VenueElement extends ComponentInterface {

  constructor(props) {
    super(props);

    this.state = {
      isLoading: true
    };
  }

  componentDidMount() {
    super.componentDidMount();

    this.getData(this.props.params.uuid);
  }

  componentWillReceiveProps(nextProps) {
    super.componentWillReceiveProps();

    if (nextProps.params.uuid !== this.props.params.uuid) {
      this.getData(nextProps.params.uuid);
    }
  }

  getData(id) {
    if (!this.state.isLoading) {
      this.setState({
        isLoading: true
      });
    }
    this.canRender(false);
    this.props.dictionaryActions.getList()
      .then(() => {
        return this.props.componentActions.getElement(id);
      })
      .then(() => {
        return this.props.componentActions.getManagers(id);
      })
      .then(() => {
        return this.props.componentActions.getPayment(id);
      })
      .then(() => {
        this.canRender(true);
        this.setState({
          isLoading: false
        });
      });
  }

  get content() {
    let venue          = this.props.componentReducer.venue;
    let { dictionary } = this.props.dictionaryReducer;

    return (
      <div>
        <Row>
          <Col md={ 12 } lg={ 12 } >
            <PageHeader>Venue - {venue.name}</PageHeader>
          </Col>
        </Row>
        <Row style={{paddingTop: 10}}>
          <Col xs={12} sm={12} md={5} lg={5}>
            <General data={venue}
                     dictionary={dictionary} />
          </Col>
          <Col xs={12} sm={12} md={7} lg={7}>
            <Managers data={venue.managers} />
          </Col>
          <Col xs={12} sm={12} md={7} lg={7}>
            <Payment data={venue.payment} />
          </Col>

          <Col xs={12} sm={12} md={12} lg={12}>
            <Status venue={venue}
                    venueAction={this.props.componentActions}/>
          </Col>
        </Row>
      </div>
    );
  }

  render() {
    super.render();

    return this.state.isLoading
      ? <Loading />
      : this.content;
  }
}
