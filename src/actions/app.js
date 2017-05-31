import * as CONSTANT from '../constants/app'
import sendRequest from '../services/api'

export function setError(error = '') {
  return (dispatch) => {
    dispatch({
      type: CONSTANT.SET_ERROR,
      payload: {
        error: error,
      },
    });

    return Promise.resolve();
  }
}

export function cleanError() {
  return setError();
}

export function addData(data) {
  return (dispatch) => {
    dispatch({
      type: CONSTANT.ADD_DATA,
      payload: {
        data: data,
      },
    });

    return Promise.resolve();
  }
}

export function addNotification(notification) {
  return (dispatch) => {
    dispatch({
      type: CONSTANT.ADD_NOTIFICATION,
      payload: {
        notification: notification,
      },
    });

    return Promise.resolve();
  }
}


export function getСonstants() {
  return (dispatch) => {
    return sendRequest(`constants`)
      .then(response => {
        if (response.status === 200) {
          dispatch({
            type: CONSTANT.GET_CONSTANTS,
            payload: {
              constants: response.data,
            },
          });
          return true;
        } else {
          return false;
        }
      });
  }
}
