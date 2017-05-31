import React, { Component } from 'react';

import Moment from 'moment';

export default class BaseTable extends Component {
  constructor (props, context) {
    super(props, context);

    this.state = {
      lastKey: null,
      isInfiniteLoading: false
    };

    this.getList = this.props.componentActions.getList;

    this.formatDate = this.formatDate.bind(this);
    this.updateList = this.updateList.bind(this);
    this.handleInfiniteLoad = this.handleInfiniteLoad.bind(this);
    this.elementInfiniteLoad = this.elementInfiniteLoad.bind(this);
  }

  componentDidMount() {
    this.setState({
      isInfiniteLoading: true
    });

    this.getList(this.state)
      .then((lastKey) => {
        let newState = {
          isInfiniteLoading: false
        };

        if (lastKey) {
          newState.lastKey = lastKey;
        }
        this.setState(newState);
      });
  }

  handleInfiniteLoad () {
    if (this.state.lastKey) {
      this.setState({
        isInfiniteLoading: true
      });
      this.getList(this.state)
        .then(lastKey => {
          this.setState(() => {
            let newState = {
              isInfiniteLoading: false
            };

            if (lastKey) {
              newState.lastKey = lastKey;
            } else {
              newState.lastKey = null;
            }

            return newState;
          });
        });
    } else {
      this.setState({
        isInfiniteLoading: false
      });
    }
  }

  elementInfiniteLoad() {
    return (
      <div className="prof-list-row" style={{textAlign: "center"}}>
        <b>Loading...</b>
      </div>
    )
  }

  receiveProps(newItems) {
    this.setState({
      items: [...new Set([...this.state.items, ...(newItems || [])])]
    })
  }

  updateList(filterState) {
    this.setState(filterState);
    this.getList(filterState)
      .then(lastKey => {
        if (lastKey) {
          this.setState({
            lastKey: lastKey,
            isInfiniteLoading: false
          })
        } else {
          this.setState({
            lastKey: null,
            isInfiniteLoading: false
          })
        }
      });
  }

  formatDate(date) {
    return Moment(date).format('MM/DD/YYYY');
  }
}
