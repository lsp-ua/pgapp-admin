import * as CONSTANT from '../constants/venue';
import sendRequest from '../services/api';

export function getList(data) {
  let {status, filterField, filterSearchText, lastKey} = data;

  return (dispatch) => {
    const requestBody = lastKey || {};

    let url = `venues?status=${status}`;

    if(filterField !== '' && filterSearchText !== '') {
      url += `&field=${filterField}&search_text=${filterSearchText}`;
    }

    return sendRequest(url, 'POST', requestBody)
      .then(response => {
        if (response.status === 200 || response.status === 404) {
          dispatch({
            type: CONSTANT.GET_LIST,
            venues: response.data.venues
          });
          return response.data.lastKey || false;
        } else {
          return false;
        }
      })
  }
}

export function getElement(id) {
  return (dispatch) => {
    return sendRequest(`venue/${id}`)
      .then(response => {

        if (response.status === 200) {
          dispatch({
            type: CONSTANT.GET_ELEMENT,
            payload: {
              venue: response.data
            },
          });

          return true;
        } else {
          return false;
        }
      });
  }
}

export function setStatus(id, status) {
  return (dispatch) => {

    const requestBody = {
      status: status
    };

    return sendRequest(`venue/${id}`, 'PATCH', requestBody)
      .then(response => {

        if (response.status === 200) {
          dispatch({
            type: CONSTANT.SET_STATUS,
            payload: {
              venue: response.data
            },
          });

          return true;
        } else {
          return false;
        }
      });
  }
}

export function getManagers(id) {
  return (dispatch) => {
    return sendRequest(`venue/${id}/managers`, 'GET')
      .then(response => {

        if (response.status === 200) {
          dispatch({
            type: CONSTANT.GET_MANAGERS,
            payload: {
              data: response.data
            },
          });
          return true;
        } else {
          return false;
        }
      });
  }
}

export function getPayment(id) {
  return (dispatch) => {
    return sendRequest(`venue/${id}/payment`, 'GET')
      .then(response => {

        if (response.status === 200 || response.status === 422) {
          dispatch({
            type: CONSTANT.GET_PAYMENT,
            payload: {
              data: response.data
            },
          });
          return true;
        } else {
          return false;
        }
      });
  }
}
