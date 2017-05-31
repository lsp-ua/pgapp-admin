import React from 'react'
import * as CONSTANT from '../../constants/app';

export default class ComponentInterface extends React.Component {

  constructor(props) {
    super(props);

    this._canRender = true;
    this.showDebugLog = true;
  }

  componentDidMount() {
    if (CONSTANT.DEVELOPMENT_MODE && this.showDebugLog) {
      console.warn(`${this.constructor.name}:componentDidMount`);
    }
  }

  componentWillReceiveProps(props) {
    if (CONSTANT.DEVELOPMENT_MODE && this.showDebugLog) {
      console.warn(`${this.constructor.name}:componentWillReceiveProps`);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (CONSTANT.DEVELOPMENT_MODE && this.showDebugLog) {
      console.warn(`${this.constructor.name}:shouldComponentUpdate`);
    }
    return this._canRender;
  }

  canRender(value) {
    this._canRender = value;
  }

  render() {
    if (CONSTANT.DEVELOPMENT_MODE && this.showDebugLog) {
      console.warn(`${this.constructor.name}:render`);
    }

    return null;
  }

}
