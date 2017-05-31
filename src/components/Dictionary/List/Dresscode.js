import React, { Component } from 'react';
import { Panel, Glyphicon, Button, Form, FormGroup, ControlLabel, FormControl,Col } from 'react-bootstrap';
import Modal, { Footer, Header, Title, Body } from 'react-bootstrap/lib/Modal';
import Loading from '../../Loading';

import './List.css';

import { sortable } from 'react-sortable';

class ListItem extends React.Component {

  render() {
    return (
      <div {...this.props} className="list-item">{this.props.children}</div>
    )
  }
}

let SortableListItem = sortable(ListItem);

export default class Dresscode extends Component {

  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      ModalText: '',
      draggingIndex: null,
      isLoading: true,
      type:'',
      id:'',
    };
    this.openModal.bind(this);
    this.deleteDresscode.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      shirt: nextProps.shirt,
      shoes: nextProps.shoes,
      pant: nextProps.pant,
      isLoading: false
    });
  }


  updateShirtState = (obj) => {
    this.setState(obj);
    if(obj.draggingIndex === null){
      let id = (this.state.shirt) ? this.state.shirt.map((element, index) => {
          return (element.uuid);
        }) : 'Not found';

      this.props.dictionaryAction.changeItem(this.props.shirt_type, id);

    }
  };


  updatePantState = (obj) => {
    this.setState(obj);
    if(obj.draggingIndex === null){
      let id = (this.state.pant) ? this.state.pant.map((element, index) => {
          return (element.uuid);
        }) : 'Not found';

      this.props.dictionaryAction.changeItem(this.props.pant_type, id);

    }
  };



  updateShoesState = (obj) => {
    this.setState(obj);
    if(obj.draggingIndex === null){
      let id = (this.state.shoes) ? this.state.shoes.map((element, index) => {
          return (element.uuid);
        }) : 'Not found';

      this.props.dictionaryAction.changeItem(this.props.shoes_type, id);

    }
  };

  closeModal() {
    this.setState({ showModal: false });
  }

  openModal(title,type,event) {
    event.preventDefault();
    this.setState({ showModal: true , type:type, title:title});
  }

  handleChangeText(event) {
    this.setState({ModalText: event.target.value});
  }

  addDresscode(){
    let dictionaryObj={
      name: this.state.ModalText
    }
    this.props.dictionaryAction.addDictionary(this.state.type,dictionaryObj)
      .then(response=>{this.closeModal()});
  }

  deleteDresscode(type,id,event){
    event.preventDefault();
    this.openConfirm();
    this.setState({id:id});
    this.setState({type:type});
  }


  confirmDelete(){
    this.props.dictionaryAction.deleteDictionary(this.state.type,this.state.id)
      .then(response=>{this.closeConfirm()});
  }

  closeConfirm(){
    this.setState({ showConfirm: false });
  }

  openConfirm(){
    this.setState({ showConfirm: true });
  }

  get modalConfirm(){
    return(
      <Modal show={this.state.showConfirm}
             onHide={this.closeConfirm.bind(this)}>
        <Header closeButton>
          <Title>Delete?</Title>
        </Header>
        <Body>
        Do you want to delete this item?
        </Body>
        <Footer>
          <Button onClick={this.confirmDelete.bind(this)}>Yes</Button>
          <Button onClick={this.closeConfirm.bind(this)}>No</Button>
        </Footer>
      </Modal>
    );
  }

  get modalBlock() {
    return (
      <Modal show={this.state.showModal}
             onHide={this.closeModal.bind(this)}>
        <Header closeButton>
          <Title>Add {this.state.title}</Title>
        </Header>
        <Body>
        <Form>
          <FormGroup controlId="formControlsTextarea">
            <ControlLabel>Please enter new {this.state.title}</ControlLabel>
            <FormControl
              type="text"
              placeholder={'Enter new '+this.state.title}
              value={this.state.rejectModalText}
              onChange={this.handleChangeText.bind(this)}
            />
          </FormGroup>
        </Form>
        </Body>
        <Footer>
          <Button onClick={this.addDresscode.bind(this)}>Add</Button>
          <Button onClick={this.closeModal.bind(this)}>Close</Button>
        </Footer>
      </Modal>
    );
  }

  render() {
    let childProps = { className: 'myClass1' };
    let Shirts = (this.state.shirt) ? this.state.shirt.map((element, index) => {

        return (
          <SortableListItem
            key={index}
            updateState={this.updateShirtState}
            items={this.state.shirt}
            draggingIndex={this.state.draggingIndex}
            sortId={index}
            outline="list"
            childProps={childProps}>
            <Glyphicon glyph="align-justify" className="icon-margin"/>
            {element.name}
            <Glyphicon glyph="remove" className="align-r" value={element.uuid} onClick={(event) => this.deleteDresscode(this.props.shirt_type,element.uuid, event)}/>
          </SortableListItem>

        );
      }) : 'Not found';
    let Shoes = (this.state.shoes) ? this.state.shoes.map((element, index) => {

        return (
          <SortableListItem
            key={index}
            updateState={this.updateShoesState}
            items={this.state.shoes}
            draggingIndex={this.state.draggingIndex}
            sortId={index}
            outline="list"
            childProps={childProps}>
            <Glyphicon glyph="align-justify" className="icon-margin"/>
            {element.name}
            <Glyphicon glyph="remove" className="align-r" value={element.uuid} onClick={(event) => this.deleteDresscode(this.props.shoes_type,element.uuid, event)}/>
          </SortableListItem>

        );
      }) : 'Not found';
    let Pants = (this.state.pant) ? this.state.pant.map((element, index) => {

        return (
          <SortableListItem
            key={index}
            updateState={this.updatePantState}
            items={this.state.pant}
            draggingIndex={this.state.draggingIndex}
            sortId={index}
            outline="list"
            childProps={childProps}>
            <Glyphicon glyph="align-justify" className="icon-margin"/>
            {element.name}
            <Glyphicon glyph="remove" className="align-r" value={element.uuid} onClick={(event) => this.deleteDresscode(this.props.pant_type,element.uuid, event)}/>
          </SortableListItem>

        );
      }) : 'Not found';

    return (
      <div>
        <Panel collapsible defaultExpanded header={<span>Dress Code Params</span>} className="experience">
          <div>
            <Col md={ 4 } lg={ 4 } className="vertical-line">
              <p><b>Shirts:</b></p>
              {(this.state.isLoading)
                ? <Loading />
                : <div className="list">{Shirts}</div>
              }
              <Button className="button-margin" onClick={(event) => this.openModal(this.props.shirt_title,this.props.shirt_type,event)}> Add Shirts</Button>
            </Col>
            <Col md={ 4 } lg={ 4 } className="vertical-line" >
              <p><b>Pants:</b></p>
              {(this.state.isLoading)
                ? <Loading />
                : <div className="list">{Pants}</div>
              }
              <Button className="button-margin" onClick={(event) => this.openModal(this.props.pant_title,this.props.pant_type,event)}> Add Pants</Button>
            </Col>
            <Col md={ 4 } lg={ 4 } >
              <p><b>Shoes:</b></p>
              {(this.state.isLoading)
                ? <Loading />
                : <div className="list">{Shoes}</div>
              }
              <Button className="button-margin" onClick={(event) => this.openModal(this.props.shoes_title,this.props.shoes_type,event)}> Add Shoes</Button>
            </Col>

          </div>
        </Panel>
        {this.modalBlock}
        {this.modalConfirm}
      </div>
    )
  }

}
