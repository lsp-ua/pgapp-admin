import React from 'react';
import {Row, Col, PageHeader, Tab, Tabs} from 'react-bootstrap';

import ComponentInterface from '../../../components/ComponentInterface'

import Tables from './TableTemplate';
import Reference from './Reference';
import Settings from './Settings';
import Dresscode from './Dresscode';

export default class Dictionary extends ComponentInterface {

  constructor(props){
    super(props);

    this.state = {
      key: 1,
      title: 'Data tables'
    }
  }

  componentDidMount() {
    super.componentDidMount();

    this.props.dictionaryActions.getList()
      .then(() => {
        return this.props.settingsActions.getList();
      })
      .then(() => {
      });
  }

  handleSelect(key) {
    let title;
    if (key === 1) {
      title = 'Data tables';
    } else {
      title = 'Setting';
    }
    this.setState({
      key: key,
      title: title
    })
  }

  get content() {
    let { dictionary } = this.props.dictionaryReducer;
    let { settings } =  this.props.settingsReducer;

    return (
      <div>
        <Row>
          <Col md={ 12 } lg={ 12 } >
            <PageHeader> {this.state.title} </PageHeader>
          </Col>
        </Row>

        <Tabs activeKey={this.state.key} onSelect={this.handleSelect.bind(this)} id="dictionary-tabs" >
          <Tab eventKey={1} title={"Data Tables"} >
            <Row>
              <Col md={ 4 } lg={ 4 } >
                <Tables
                  data={dictionary.position}
                  title="Positions"
                  dictionaryAction={this.props.dictionaryActions}
                  type={`position`}
                />
              </Col>
              <Col md={ 4 } lg={ 4 } >
                <Tables
                  data={dictionary.pos}
                  title="POS"
                  dictionaryAction={this.props.dictionaryActions}
                  type={`pos`}
                />
              </Col>
              <Col md={ 4 } lg={ 4 } >
                <Tables
                  data={dictionary.experience_time_frames}
                  title="Experience"
                  dictionaryAction={this.props.dictionaryActions}
                  type={`experience_time_frames`}
                />
              </Col>
            </Row>
            <Row>
              <Col md={ 4 } lg={ 4 } >
                <Tables
                  data={dictionary.about_us_answers}
                  title="How did you hear about us?"
                  dictionaryAction={this.props.dictionaryActions}
                  type={`about_us_answers`}
                />
              </Col>
              <Col md={ 4 } lg={ 4 } >
                <Reference
                  data={dictionary.reference_type}
                  title="Reference"
                  dictionaryAction={this.props.dictionaryActions}
                  type={`reference_type`}
                />
              </Col>
            </Row>
            <Row>
              <Col md={ 12 } lg={ 12 } >
                <Dresscode
                  shirt_title="Shirts"
                  shoes_title="Shoes"
                  pant_title="Pants"
                  shirt={dictionary.dress_code_shirt}
                  shoes={dictionary.dress_code_shoes}
                  pant={dictionary.dress_code_pant}
                  shirt_type="dress_code_shirt"
                  shoes_type="dress_code_shoes"
                  pant_type="dress_code_pant"
                  dictionaryAction={this.props.dictionaryActions}
                />
              </Col>
            </Row>
          </Tab>
          <Tab eventKey={2} title={"Setting"}>
            <Row>
              <Col md={ 6 } lg={ 6 } >
                <Settings
                  data={settings}
                  settingsActions={this.props.settingsActions}
                  appActions={this.props.appActions}
                  canRender={value => this.canRender(value)}
                />
              </Col>
            </Row>
          </Tab>
        </Tabs>
      </div>
    );
  }

  render() {
    super.render();

    return this.content;
  }
}
