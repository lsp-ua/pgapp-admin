import React, {Component} from 'react';
import Element from './Element';
import { Row, Col, PageHeader } from 'react-bootstrap';

export default class Item extends Component {

  componentDidMount(){
   this.getData(this.props.params.uuid);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.params.uuid !== this.props.params.uuid) {
      this.getData(nextProps.params.uuid);
    }
  }

  getData(id) {
    this.props.componentActions.getAdmin(id);
  }

  render() {
    let admin          = this.props.componentReducer.admin;

    return (
      <div>
        <Row>
          <Col md={ 12 } lg={ 12 } >
            <PageHeader>Admin: {admin.firstname || null}  {admin.lastname || null} </PageHeader>
          </Col>
        </Row>
        <Row style={{paddingTop: 10}}>
          <Col xs={12} sm={12} md={12} lg={12}>
            <Element data={admin}/>
          </Col>
        </Row>
      </div>
    );
  }
}

