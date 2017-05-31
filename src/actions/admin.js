import * as CONSTANT from '../constants/admin';
import sendRequest from '../services/api';

export function getList(data) {
  return dispatch => {
    let {filterField, filterSearchText, lastKey} = data;
    const requestBody = lastKey || {};
    let url = 'admins';
    if(filterField && filterSearchText) {
      url += `?field=${filterField}&search_text=${filterSearchText}`;
    }

    return sendRequest(url, 'POST', requestBody)
      .then(response => {
        if (response.status === 200 || response.status === 404) {
          dispatch({
            type: CONSTANT.GET_LIST,
            admins: response.data.admins
          });
          return response.data.lastKey
        } else {
          return false;
        }
      })
  }

}

export function getAll(id) {
  return (dispatch) => {
    return sendRequest(`users/${id}`, 'GET')
      .then(response => {

        if (response.status === 200) {
          dispatch({
            type: CONSTANT.GET_ALL,
            payload: {
              users: response.data
            },
          });
          return true;
        } else {
          return false;
        }
      });
  }
}

export function getAdmin(id) {
  return (dispatch) => {
    return sendRequest(`admin/${id}`, 'GET')
      .then(response => {

        if (response.status === 200) {
          dispatch({
            type: CONSTANT.GET_ELEMENT,
            payload: {
              admin: response.data
            },
          });
          return true;
        } else {
          return false;
        }
      });
  }
}
