import React from 'react';

export default class Search extends React.Component {

  constructor(props) {
    super(props);

    this.state = props.listState;

    this.clear = this.clear.bind(this);
    this.statusChanged = this.statusChanged.bind(this);
    this.filterFieldChanged = this.filterFieldChanged.bind(this);
    this.filterSearchTextChanged = this.filterSearchTextChanged.bind(this);
    this.formSubmit = this.formSubmit.bind(this);
    this.needUpdateList = this.needUpdateList.bind(this);
  }

  statusChanged(e) {
    if(this.state.status !== e.target.value) {
      this.setState({
        status: e.target.value,
        lastKey: null,
        filterField: '',
        filterSearchText: ''
      }, () => {
        this.needUpdateList(e)
      })
    }
  }

  filterFieldChanged(e) {
    this.setState({
      filterField: e.target.value
    })
  }

  filterSearchTextChanged(e) {
    this.setState({
      filterSearchText: e.target.value
    })
  }

  formSubmit(e) {
    e.preventDefault();
    this.needUpdateList();
  }

  clear(){
    let newState = {
      lastKey: null,
      filterField: '',
      filterSearchText: ''
    };
    this.state.status && (newState.status = 'all');
    this.setState(newState, () => {
      this.needUpdateList()
    })
  }

  needUpdateList() {
    this.props.onNeedUpdateList(this.state);
  }
}
