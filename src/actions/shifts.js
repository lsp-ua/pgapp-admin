import * as CONSTANT from '../constants/shifts';
import sendRequest from '../services/api';

export function getList(data) {
  let {status, filterField, filterSearchText, lastKey, date_start, date_end} = data;

  return (dispatch) => {
    const requestBody = lastKey || {};
    let url = `shifts?status=${status}`;
    if(filterField !== '' && filterSearchText !== '') {
      url += `&field=${filterField}&search_text=${filterSearchText}`;
    }
    if(filterField !== '' && date_start !== '' && date_end !== ''){
      url += `&date_start=${date_start}&date_end=${date_end}`;
    }

    return sendRequest(url, 'POST', requestBody)
      .then(response => {
        if (response.status === 200 || response.status === 404) {
          dispatch({
            type: CONSTANT.GET_LIST,
            payload: {
              shifts: response.data.shifts,
            },
          });
          return response.data.lastKey || false;
        } else {
          return false;
        }
      })
      .catch(() => {
        return false;
      });
  }
}

export function getElement(id) {
  return (dispatch) => {

    return sendRequest(`shift/${id}`)
      .then(response => {

        if (response.status === 200) {
          dispatch({
            type: CONSTANT.GET_ELEMENT,
            payload: {
              shift: response.data,
            },
          });

          return true;
        } else {
          return false;
        }
      })
      .catch(() => {
        return false;
      });
  }
}

export function getShiftProfessionals(id) {
  return (dispatch) => {

    return sendRequest(`shift/${id}/shift_prof`)
      .then(response => {

        if (response.status === 200) {
          dispatch({
            type: CONSTANT.GET_PROF_LIST,
            payload: {
              shiftProf: response.data
            },
          });

          return true;
        } else {
          return false;
        }
      })
      .catch(() => {
        return false;
      });
  }
}
