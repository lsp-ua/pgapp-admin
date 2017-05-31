import * as CONSTANT from '../constants/history'
import sendRequest from '../services/api'

export function getList(data) {
  let {filterField, filterSearchText, date_start, date_end, lastKey} = data;

  return (dispatch) => {
    const requestBody = lastKey || {};

    let url = `logs?`;

    if(date_start !== '' && date_end !== ''){
      url += `date_start=${date_start}&date_end=${date_end}`;
    }

    if(date_start !== '' && date_end === '') {
      url += `date_start=${date_start}`;
    }
    if(date_end !== '' && date_start === ''){
      url += `date_end=${date_end}`;
    }

    if(filterField !== '' && filterSearchText !== '' && date_start === '' && date_end === '') {
      url += `${filterField}=${filterSearchText}`;
    }

    return sendRequest(url, 'POST', requestBody)
      .then(response => {
        if (response.status === 200 || response.status === 404) {
          dispatch({
            type: CONSTANT.GET_LIST,
            logs: response.data.logs
          });
          return response.data.lastKey || false;
        } else {
          return false;
        }
      })
  }
}

