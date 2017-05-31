import * as CONSTANT from '../constants/dictionary';
import sendRequest from '../services/api';

export function getList() {

  return (dispatch) => {
    return sendRequest(`dictionary`, 'GET')
      .then(response => {

        if (response.status === 200) {
          dispatch({
            type: CONSTANT.GET_LIST,
            payload: {
              dictionary: response.data,
            },
          });
          return true;
        } else {
          return false;
        }
      });
  }
}

export function getElementByType(type) {

  return (dispatch) => {
    return sendRequest(`dictionary/${type}`, 'GET')
      .then(response => {

        if (response.status === 200) {
          dispatch({
            type: CONSTANT.GET_ELEMENT_BY_TYPE,
            payload: {
              type: type,
              data: response.data,
            },
          });
          return true;
        } else {
          return false;
        }
      });
  }
}

export function addDictionary(type, name) {
  const requestBody = name;
  return (dispatch) => {
    return sendRequest(`dictionary/${type}`,'POST',requestBody)
      .then(response => {
        if (response.status === 200 || response.status === 404) {
          dispatch({
            type: CONSTANT.ADD_DICTIONARY,
            payload: {
              data: response.data,
              type: type
            },
          });
          return true;
        } else {
          return false;
        }
      });
  }
}

export function deleteDictionary(type,id) {
  return (dispatch) => {
    return sendRequest(`dictionary/${type}/${id}`, 'DELETE')
      .then(response => {
        if (response.status === 204) {
            dispatch({
              type: CONSTANT.DELETE_DICTIONARY,
              payload: {
                uuid: id,
                type: type,
              },
            });
            return true;
          } else {
            return false;
         }
        });
  }
}

export function setRequired(type,id) {
  return (dispatch) => {
    const requestBody = {
      required: true
    };

    return sendRequest(`dictionary/${type}/${id}`, 'PUT', requestBody)
      .then(response => {
        if (response.status === 200) {
          dispatch({
            type: CONSTANT.SET_REQUIRED,
            payload: {
              data: response.data,
              type: type
            },
          });
          return true;
        } else {
          return false;
        }
      });
  }
}

export function changeItem(type, order) {
  return (dispatch) => {
    const requestBody = order;

    return sendRequest(`dictionary/${type}`, 'PUT', requestBody)
      .then(response => {

        if (response.status === 200) {
          dispatch({
            type: CONSTANT.CHANGE_ITEM,
            payload: {
              data: response.data,
              type: type
            },
          });
          return true;
        } else {
          return false;
        }
      });
  }
}
