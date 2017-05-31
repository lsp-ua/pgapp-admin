import React, {Component} from 'react';
import {Panel, Glyphicon, Button, Form, FormGroup, ControlLabel, FormControl} from 'react-bootstrap';
import Modal, {Footer, Header, Title, Body} from 'react-bootstrap/lib/Modal';
import Loading from '../../Loading';

import './List.css';

import {sortable} from 'react-sortable';

class ListItem extends React.Component {

  render() {
    return (
      <div {...this.props} className="list-item">{this.props.children}</div>
    )
  }
}

let SortableListItem = sortable(ListItem);

export default class TableTemplate extends Component {

  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      id:'',
      ModalText: '',
      confirmDelete: false,
      showConfirm: false,
      draggingIndex: null,
      title: '',
      isLoading: true
    };
    this.deleteDictionary.bind(this);
  }

  componentWillReceiveProps(nextProps) {
     this.setState({
      isLoading: false,
      data: nextProps.data
    });
  }

  deleteDictionary(id,event){
   event.preventDefault();
    this.openConfirm();
    this.setState({id:id});
  }

  addDictionary(){
    let dictionaryObj={
      name: this.state.ModalText
    }
    if(this.state.ModalText!==''){
      this.props.dictionaryAction.addDictionary(this.props.type, dictionaryObj)
        .then(response=>{this.closeModal()});
    }else{
      this.setState({validation:'has-error'})
    }

  }

  updateState = (obj) => {
   this.setState(obj);
   if(obj.draggingIndex === null){
         let id = (this.state.data) ? this.state.data.map((element, index) => {
          return ( element.uuid);
        }) : 'Esrror';
      this.props.dictionaryAction.changeItem(this.props.type, id);
   }
 };



  confirmDelete(){
    this.setState({ confirmDelete: true });
    this.props.dictionaryAction.deleteDictionary(this.props.type,this.state.id)
      .then(response=>{this.closeConfirm()});
  }

  closeConfirm(){
    this.setState({ showConfirm: false });
  }

  closeModal() {
    this.setState({ showModal: false, ModalText:'', validation:'' });
  }

  openConfirm(){
    this.setState({ showConfirm: true });
  }

  openModal() {
    this.setState({
      showModal: true,
    });
  }

  handleChangeText(event) {
    this.setState({ModalText: event.target.value});
    if(event.target.value!==''){
      this.setState({
        validation:'has-success'
      })
     } else {
       this.setState({
         validation:'has-error'
      })
     }
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
          <FormGroup controlId="formControlsTextarea" className={this.state.validation}>
            <ControlLabel>Please enter new {this.props.title}</ControlLabel>
            <FormControl
              type="text"
              placeholder={'Enter new '+this.props.title}
              value={this.state.ModalText}
              onChange={this.handleChangeText.bind(this)}
            />
          </FormGroup>
        </Form>
        </Body>
        <Footer>
          <Button onClick={this.addDictionary.bind(this)}>Add</Button>
          <Button onClick={this.closeModal.bind(this)}>Close</Button>
        </Footer>
      </Modal>
    );
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
            <Glyphicon glyph="align-justify" className="icon-margin"/>
            {element.name}
            <Glyphicon glyph="remove" className="align-r" value={element.uuid} onClick={(event) => this.deleteDictionary(element.uuid, event)}/>
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
      </div>
    )
  }

}
