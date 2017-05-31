import * as CONSTANT from '../constants/terms';
import sendRequest from '../services/api';

export function setElement(text,  version) {
  return (dispatch) => {
    const requestBody = {
      text: text,
      version: version,
    };

    return sendRequest(`tos`, 'POST', requestBody)
      .then(response => {

        if (response.status === 200) {
          dispatch({
            type: CONSTANT.SET_ELEMENT,
            payload: {
              text: text,
              version: response.data.version
            },
          });
          return true;
        } else {
          return false;
        }
      })
      .catch(error => {
        return false;
      });
  }
}

export function getElement() {
  return (dispatch) => {
    return sendRequest(`tos`, 'GET')
      .then(response => {

        if (response.status === 200) {
          dispatch({
            type: CONSTANT.GET_ELEMENT,
            payload: {
              data: response.data,
            },
          });
          return response.data;
        } else {
          return false;
        }
      })
      .catch(error => {
        return false;
      });
  }
}
