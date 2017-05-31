import * as CONSTANT from '../constants/user';
import sendRequest from '../services/api';

export function getAll() {
  return (dispatch) => {
    return sendRequest(`users`, 'GET')
      .then(response => {

        if (response.status === 200) {
          dispatch({
            type: CONSTANT.GET_ALL,
            payload: {
              users: response.data
            }
          });
          return true;
        } else {
          return false;
        }
      });
  }
}

export function getUser(id) {
  return (dispatch) => {
    return sendRequest(`users/${id}`, 'GET')
      .then(response => {

        if (response.status === 200) {
          dispatch({
            type: CONSTANT.GET_ELEMENT,
            payload: {
              user: response.data
            }
          });
          return true;
        } else {
          return false;
        }
      });
  }
}
