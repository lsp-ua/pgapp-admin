import React from 'react'
import { Row, Col, PageHeader } from 'react-bootstrap'

import ComponentInterface from '../../../components/ComponentInterface'
import Loading from '../../../components/Loading'

import Map from './Map'

export default class ShiftMap extends ComponentInterface {

  constructor(props) {
    super(props);

    this.state = {
      isLoading: true
    };
  }

  componentDidMount(){
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

    this.props.componentActions.getElement(id)
      .then(() => {
        return this.props.componentActions.getShiftProfessionals(id);
      })
      .then(() => {
        this.canRender(true);
        this.setState({
          isLoading: false
        });
      });
  }

  get content() {
    let shift = this.props.componentReducer.shift;
    let shiftProf = this.props.componentReducer.shiftProf;
    return (
      <div>
        <Row>
          <Col md={ 12 } lg={ 12 } >
            <PageHeader>Map for shift: {shift.venue.name}</PageHeader>
          </Col>
        </Row>
        <Row>
          <Col md={ 12 } lg={ 12 } >
            <Map venue={shift.venue}
                 shiftProf={shiftProf}/>
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
