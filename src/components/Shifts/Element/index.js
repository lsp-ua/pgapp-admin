import React from 'react'
import { Row, Col, PageHeader } from 'react-bootstrap'

import ComponentInterface from '../../../components/ComponentInterface'
import Loading from '../../../components/Loading'

import General from './General'
import Professional from './Professional'
import Venue from './Venue'
import Map from './Map'

export default class ShiftItem extends ComponentInterface {

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

    this.props.dictionaryActions.getList()
      .then(() => {
        return this.props.componentActions.getShiftProfessionals(id);
      })
      .then(() => {
        return this.props.componentActions.getElement(id);
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
    let { dictionary } = this.props.dictionaryReducer;
    return (
      <div>
        <Row>
          <Col md={ 12 } lg={ 12 } >
            <PageHeader>Shift: {shift.venue.name}</PageHeader>
          </Col>
        </Row>
        <Row style={{paddingTop: 10}}>
          <Col xs={12} sm={12} md={4} lg={4}>
            <General shift={shift}
                     dictionary={dictionary}/>
          </Col>
          <Col xs={12} sm={12} md={4} lg={4}>
            <Professional professional={shift.professional}/>
          </Col>
          <Col xs={12} sm={12} md={4} lg={4}>
            <Venue venue={shift.venue}
                   dictionary={dictionary}/>
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
