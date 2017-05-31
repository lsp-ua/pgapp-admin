import * as CONSTANT from '../constants/markets';
import sendRequest from '../services/api';

export function getList() {
  return (dispatch) => {
    return sendRequest('markets','POST')
      .then(response => {
        if (response.status === 200) {
          dispatch({
            type: CONSTANT.GET_LIST,
            markets: response.data.markets
          });

          return true;
        } else {
          return false;
        }
      })
  }
}

export function getElement(id) {
  return (dispatch) => {
    return sendRequest(`market/${id}`,'GET')
      .then(response => {

        if (response.status === 200) {
          dispatch({
            type: CONSTANT.GET_ELEMENT,
            payload: {
              market: response.data
            },
          });

          return true;
        } else {
          return false;
        }
      });
  }
}

export function delElement(id) {
  return (dispatch) => {
    return sendRequest(`market/${id}`,'DELETE')
      .then(response => {
        if (response.status === 200) {
          dispatch({
            type: CONSTANT.DELETE,
          });

          return true;
        } else {
          return false;
        }
      })
  }
}

export function save(market) {
  const requestBody = market;
  return (dispatch) => {
    return sendRequest('market','POST',requestBody)
      .then(response => {
        if (response.status === 200) {
          dispatch({
            type: CONSTANT.CREATE,
            market: response.data
          });
          return response;
        } else {
          return response;
        }
      })
  }
}

export function update(id,market) {
  return (dispatch) => {
    const requestBody = market;

    return sendRequest(`market/${id}`, 'PUT', requestBody)
      .then(response => {

        if (response.status === 200) {
          dispatch({
            type: CONSTANT.UPDATE,
            payload: {
              data: response.data,
            },
          });
          return response;
        } else {
          return response;
        }
      });
  }
}
