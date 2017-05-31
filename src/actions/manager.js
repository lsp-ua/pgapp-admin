import * as CONSTANT from '../constants/manager'
import sendRequest from '../services/api'

export function getList(data) {
  return (dispatch) => {
    let {filterField, filterSearchText, lastKey} = data;
    const requestBody = lastKey || {};
    let url = 'managers';
    if(filterField && filterSearchText) {
      url += `?field=${filterField}&search_text=${filterSearchText}`;
    }
    return sendRequest(url, 'POST', requestBody)
      .then(response => {
        if (response.status === 200 || response.status === 404) {
          dispatch({
            type: CONSTANT.GET_LIST,
            managers: response.data.managers
          });
          return response.data.lastKey
        } else {
          return false;
        }
      });
  }
}

export function getElement(uuid) {
  return (dispatch) => {

    return sendRequest(`manager/${uuid}`)
      .then(response => {
        if (response.status === 200) {
          dispatch({
            type: CONSTANT.GET_ELEMENT,
            payload: {
              data: response.data,
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

export function getVenues(uuid) {
  return (dispatch) => {

    return sendRequest(`manager/${uuid}/venue?status=all`)
      .then(response => {
        if (response.status === 200) {
          dispatch({
            type: CONSTANT.GET_VENUES,
            payload: {
              data: response.data,
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
