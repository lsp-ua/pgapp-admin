import * as CONSTANT from '../constants/settings';
import sendRequest from '../services/api';

export function getList() {
  return (dispatch) => {
    return sendRequest(`settings`, 'GET')
      .then(response => {
        if (response.status === 200) {
          dispatch({
            type: CONSTANT.GET_LIST,
            payload: {
              values: response.data,
            },
          });
          return true;
        } else {
          return false;
        }
      });
  }
}

export function setElement(key, data) {
  return (dispatch) => {
    const requestBody = {
      value: data
    };

    return sendRequest(`setting/${key}`, 'PUT', requestBody)
      .then(response => {

        if (response.status === 200) {
          dispatch({
            type: CONSTANT.SET_ELEMENT,
            payload: {
              key: key,
              value: response.data.value,
            },
          });
          return true;
        } else {
          return false;
        }
      });
  }
}

export function getElemnt(key) {
  return (dispatch) => {
    return sendRequest(`setting/${key}`, 'GET')
      .then(response => {

        if (response.status === 200) {
          dispatch({
            type: CONSTANT.GET_ELEMENT,
            payload: {
              key: key,
              value: response.data
            },
          });
          return true;
        } else {
          return false;
        }
      });
  }
}

