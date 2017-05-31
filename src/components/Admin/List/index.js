import React from 'react';
import { Link } from 'react-router'
import { PageHeader, Panel, Row, Col, Button, FormControl, ControlLabel, Form, FormGroup } from 'react-bootstrap';
import Infinite from 'react-infinite';
import BaseTable from '../../Base/Table';
import SearchBox from '../SearchBox';
import Modal, { Header, Title, Body } from 'react-bootstrap/lib/Modal';

export default class AdminList extends BaseTable {
  constructor(props) {
    super(props);

    this.state = {
      lastKey: null,
      isInfiniteLoading: false,
      items: [],
      modalShow: false,
      email: ''
    };
  }

  componentDidMount() {
    super.componentDidMount.call(this);
  }

  componentWillReceiveProps(newProps) {
    super.receiveProps.call(this, newProps.componentReducer.admins);
  }

  modalShow(){
    this.setState({
      modalShow: true
    });
  }

  modalHide(){
    this.setState({
      modalShow: false
    });
  }

  inviteAdmin(e){
    e.preventDefault();
    let form = e.target;
    let email ={
      email: form.email.value
    }
    this.props.componentActions.inviteAdmin(email)
      .then(response=>{
        this.modalHide();
      });
  }

  get inviteAdminModal(){
    return(
      <Modal show={this.state.modalShow}
             onHide={this.modalHide.bind(this)}>
        <Header closeButton>
          <Title>Invite admin</Title>
        </Header>
        <Body>
        <Form horizontal onSubmit={this.inviteAdmin.bind(this)}>
          <FormGroup controlId="formHorizontalEmail">
            <Col componentClass={ControlLabel} sm={2}>
              Email
            </Col>
            <Col sm={10}>
              <FormControl type="email" placeholder="Email" name="email" />
            </Col>
          </FormGroup>
          <FormGroup>
            <Col sm={12}>
              <Button type="submit" className="invite-admin-btn" bsStyle="success">
                Invite
              </Button>
            </Col>
          </FormGroup>
          </Form>
        </Body>
      </Modal>
    );
  }

  render() {
    return(
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <PageHeader>Admins List <Button className="invite-admin" onClick={this.modalShow.bind(this)}>Invite admin</Button></PageHeader>
        <SearchBox listState={this.state} onNeedUpdateList={this.updateList}/>
        <div style={{ flex: '1 1 auto' }}>
          <Panel className="prof-list" header={<Row>
            <Col lg={6} md={6} sm={6} xs={6}>Name</Col>
            <Col lg={6} md={6} sm={6} xs={6}>Date created</Col>
          </Row>}>
            <Infinite style={{display:'table'}} elementHeight={30}
              containerHeight={600}
              infiniteLoadBeginEdgeOffset={200}
              onInfiniteLoad={this.handleInfiniteLoad}
              loadingSpinnerDelegate={this.elementInfiniteLoad()}
              isInfiniteLoading={this.state.isInfiniteLoading}
              timeScrollStateLastsForAfterUserScrolls={1000}
            >
              {
                this.state.items.map((element, index) => {
                  return <Link key={element.uuid} className="prof-list-row" to={`/admin/${element.uuid}`}>
                    <Row>
                      <Col className="cell" lg={3} md={3} sm={3} xs={4} title={`${element.firstname} ${element.lastname}`} >{element.firstname} {element.lastname}</Col>
                      <Col className="cell" lg={2} md={2} sm={2} xsHidden>{this.formatDate(element.created_at)}</Col>
                    </Row>
                  </Link>
                })
              }
            </Infinite>
          </Panel>
        </div>
        {this.inviteAdminModal}
      </div>
    )
  }
}
