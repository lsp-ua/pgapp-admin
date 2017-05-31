import React, { Component } from 'react';
import { Panel, Glyphicon, Button, Form, FormGroup, ControlLabel, FormControl, Radio } from 'react-bootstrap';
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

export default class Reference extends Component {

  constructor(props) {
    super(props);

    this.state = {
      showAlert: false,
      showModal: false,
      ModalText: '',
      draggingIndex: null,
      title:'',
      isLoading: true
    };

    this.deleteReference.bind(this);
    this.setReq.bind(this);

  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      isLoading: false,
      data: nextProps.data,

    });
  }

  updateState = (obj) => {
    this.setState(obj);
    if(obj.draggingIndex === null){
      let id = (this.state.data) ? this.state.data.map((element, index) => {
          return ( element.uuid);
        }) : 'Not found';

      this.props.dictionaryAction.changeItem(this.props.type, id);

    }
  };

  closeModal() {
    this.setState({ showModal: false });
  }

  openModal() {
    this.setState({ showModal: true });
  }

  handleChangeText(event) {
    this.setState({ModalText: event.target.value});
  }

  addReference(){
    let dictionaryObj={
      name: this.state.ModalText
    }
    this.props.dictionaryAction.addDictionary(this.props.type,dictionaryObj)
      .then(response=>{this.closeModal()});
  }

  deleteReference(id,event,required){
    if(required===true){
      this.openAlert();
    }
    else {
      event.preventDefault();
      this.openConfirm();
      this.setState({id: id});
    }
  }


  confirmDelete(){
    this.setState({ confirmDelete: true });
    this.props.dictionaryAction.deleteDictionary(this.props.type,this.state.id)
      .then(response=>{this.closeConfirm()});
  }

  closeConfirm(){
    this.setState({ showConfirm: false });
  }

  openConfirm(){
    this.setState({ showConfirm: true });
  }

  openAlert(){
    this.setState({ showAlert: true })
  }

  closeAlert(){
    this.setState({ showAlert: false })
  }

  get modalAlert(){
    return(
      <Modal show={this.state.showAlert}
             onHide={this.closeAlert.bind(this)}>
        <Header closeButton>
          <Title>Required field</Title>
        </Header>
        <Body>
        Can`t delete this field!
        </Body>
        <Footer>
          <Button onClick={this.closeAlert.bind(this)}>OK</Button>
        </Footer>
      </Modal>
    );
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
          <Title>Add {this.props.title}</Title>
        </Header>
        <Body>
        <Form>
          <FormGroup controlId="formControlsTextarea">
            <ControlLabel>Please enter new {this.props.title}</ControlLabel>
            <FormControl
              type="text"
              placeholder={'Enter new '+this.props.title}
              value={this.state.rejectModalText}
              onChange={this.handleChangeText.bind(this)}
            />
          </FormGroup>
        </Form>
        </Body>
        <Footer>
          <Button onClick={this.addReference.bind(this)}>Add</Button>
          <Button onClick={this.closeModal.bind(this)}>Close</Button>
        </Footer>
      </Modal>
    );
  }

  setReq(type,id,event){
    event.preventDefault();
    this.props.dictionaryAction.setRequired(type, id)
  }

  render() {

    let childProps = { className: 'myClass1' };
    let listItems = (this.state.data) ? this.state.data.map((element, index) => {

        return (
          <SortableListItem
            key={index}
            updateState={this.updateState}
            items={this.state.data}
            draggingIndex={this.state.draggingIndex}
            sortId={index}
            outline="list"
            childProps={childProps}>
            <Radio className="radio-btn" checked={element.required ? 'checked' : ''} onChange={(event) => this.setReq(element.type, element.uuid, event)}>
              <Glyphicon glyph="align-justify" className="icon-margin"/>
              {element.name}
              <Glyphicon glyph="remove" className="align-r" value={element.uuid} onClick={(event) => this.deleteReference(element.uuid, event, element.required)}/>
            </Radio>
          </SortableListItem>

        );
      }) : 'Not found';

    return (
      <div>
        <Panel collapsible defaultExpanded header={<span>{this.props.title}</span>} className="experience">
          <div>
            {(this.state.isLoading)
              ? <Loading />
              : <div className="list">{listItems}</div>
            }
            <Button className="button-margin" onClick={this.openModal.bind(this)}> Add {this.props.title}</Button>
          </div>
        </Panel>
        {this.modalBlock}
        {this.modalConfirm}
        {this.modalAlert}
      </div>
    )
  }

}
