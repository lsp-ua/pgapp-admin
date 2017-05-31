import * as CONSTANT from '../constants/professional';
import sendRequest from '../services/api';

export function getList(data) {
  console.log('Data For Request', data);

  let {status, filterField, filterSearchText, lastKey} = data;

  return (dispatch) => {
    const requestBody = lastKey || {};

    let url = `professionals?status=${status}`;

    if(filterField !== '' && filterSearchText !== '') {
      url += `&field=${filterField}&search_text=${filterSearchText}`;
    }

    return sendRequest(url, 'POST', requestBody)
      .then(response => {

        if (response.status === 200 || response.status === 404) {
          dispatch({
            type: CONSTANT.GET_LIST,
            professionals: response.data.professionals
          });
          return response.data.lastKey || false;
        } else {
          return false;
        }
      });
  }
}

export function getElement(uuid) {
  return (dispatch) => {
    return sendRequest(`professional/${uuid}`, 'GET')
      .then(response => {
        if (response.status === 200 || response.status === 404) {
          dispatch({
            type: CONSTANT.GET_ELEMENT,
            payload: {
              professional: response.data,
            },
          });
          return true;
        } else {
          return false;
        }
      });
  }
}

export function changeStatus(uuid, body) {
  return (dispatch) => {
    const requestBody = body;

    return sendRequest(`professional/${uuid}/status`, 'PUT', requestBody)
      .then(response => {

        if (response.status === 200) {
          dispatch({
            type: CONSTANT.CHANGE_STATUS,
            payload: {
              professional: response.data,
            },
          });
          return true;
        } else {
          return false;
        }
      });
  }
}

export function saveReference(uuid, body) {
  return (dispatch) => {
    const requestBody = body;

    return sendRequest(`professional/${uuid}/reference`, 'PUT', requestBody)
      .then(response => {
        if (response.status === 200) {
          dispatch({
            type: CONSTANT.SAVE_REFERENCE,
            payload: {
              reference: response.data.reference,
            },
          });
          return true;
        } else {
          return false;
        }
      });
  }
}

export function getInvite(user_id) {
  return (dispatch) => {
    return sendRequest(`invite_code/${user_id}`, 'GET')
      .then(response => {
        if (response.status === 200) {
          dispatch({
            type: CONSTANT.GET_INVITE_CODE,
            payload: {
              invite: response.data,
            },
          });
          return true;
        } else {
          return false;
        }
      });
  }
}

export function addInvite(user_id, code) {
  return (dispatch) => {
    const requestBody = {code};

    return sendRequest(`invite_code/${user_id}`, 'POST', requestBody)
      .then(response => {
        if (response.status === 200) {
          dispatch({
            type: CONSTANT.ADD_INVITE_CODE,
            payload: {
              invite: response.data,
            },
          });
          return true;
        } else {
          return false;
        }
      });
  }
}

export function getTrackingHistory(uuid, requestBody) {
  return (dispatch) => {
    return sendRequest(`tracking/get_tracking_history/${uuid}`, 'POST', requestBody || {})
      .then(response => {
        if (response.status === 200 || response.status === 404) {
          dispatch({
            type: CONSTANT.GET_TRACKING_HISTORY,
            payload: {
              trackingHistory: response.data.trackingHistory,
            },
          });
          return true;
        } else {
          return false;
        }
      });
  }
}
