import React from 'react'
import { PageHeader, Row, Col, Button, Panel, Accordion } from 'react-bootstrap'
import Modal, { Header, Title, Body } from 'react-bootstrap/lib/Modal'

import ComponentInterface from '../../ComponentInterface'
import Loading from '../../Loading'
import Market from '../Element/Market'

export default class MarketsList extends ComponentInterface {

  constructor(props, context) {
    super(props, context);

    this.state = {
      isLoading: false,
      marketLoading: true,
      addModal: false,
      add: true
    }

    this.getMarketInfo.bind(this);
  }

  componentDidMount() {
    super.componentDidMount();
    this.props.marketsActions.getList();
    this.props.dictionaryActions.getElementByType('position');
  }

  addModalMarket(){
    this.setState({
      addModal:true,
      add: true
    })
  }

  closeConfirm(){
    this.setState({
      addModal:false
    })
  }

  getMarketInfo(id){
    this.setState({
      add: true
    })
    this.props.marketsActions.getElement(id)
      .then(response=>{
        this.setState({
          marketLoading: false
        })
      })
  }

  marketLoad(){
    this.setState({
      marketLoading: true
    })
  }

  checkMarketStatus(status){
   if(status) return 'success'
    else
      return 'danger'
  }

  get addModal(){
    return(
      <Modal show={this.state.addModal}
             onHide={this.closeConfirm.bind(this)}
             className="add-modal"
      >
        <Header closeButton>
          <Title>Add new market</Title>
        </Header>
        <Body>
          <Market
            marketsReducer={{}}
            positions={this.props.dictionaryReducer.dictionary.position}
            marketsActions={this.props.marketsActions}
            showModal={this.state.addModal}
            callbackParent={(newState) => this.closeConfirm(newState) }
            appActions={this.props.appActions}
          />
        </Body>
      </Modal>
    );
  }

  get content() {
    return(
      <div>
        <Row>
          <Col xs={12} sm={12} md={12} lg={12}>
            <PageHeader>Markets</PageHeader>
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={12} md={12} lg={12}>
            <Button bsStyle="primary" className="addMarket" onClick={this.addModalMarket.bind(this)}>Add new Market</Button>
          </Col>
          <Col xs={12} sm={12} md={12} lg={12}>
            <Accordion className="markets-list">
            {
              this.props.marketsReducer.markets.map((element, index) => {
                return (
                  <Panel collapsible
                         key={index}
                         eventKey={element.uuid}
                         header={<span>Market {element.name}</span>}
                         className="market"
                         onEntering={(event) => this.getMarketInfo(element.uuid, event)}
                         onExiting={this.marketLoad.bind(this)}
                         bsStyle={this.checkMarketStatus(element.is_usable)}
                  >
                    <Market
                      marketsReducer={this.props.marketsReducer}
                      marketsActions={this.props.marketsActions}
                      type={this.state.add}
                      isLoading={this.state.marketLoading}
                      appActions={this.props.appActions}
                    />
                  </Panel>
                );
              })
            }
            </Accordion>
          </Col>
        </Row>
        {this.addModal}
        {this.delModal}
      </div>
    )
  }

  render() {
    super.render();

    return this.state.isLoading
      ? <Loading />
      : this.content;
  }
}
