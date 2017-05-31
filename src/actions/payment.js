import * as CONSTANT from '../constants/payment';
import sendRequest from '../services/api';

export function getList(data) {
  let {filterField, filterSearchText, lastKey} = data;

  return (dispatch) => {
    const requestBody = lastKey || {};
    let url = `shift_payments`;
    if(filterField !== '' && filterSearchText !== '') {
      url += `?field=${filterField}&search_text=${filterSearchText}`;
    }

    return sendRequest(url, 'POST', requestBody)
      .then(response => {
        if (response.status === 200 || response.status === 404) {
          dispatch({
            type: CONSTANT.GET_LIST,
            payload: {
              payments: response.data.shiftPayments,
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

export function payProfessional(shift_payment_ids) {
  return (dispatch) => {
    const requestBody = shift_payment_ids;
    return sendRequest(`shift/pay_to_profs`, 'PUT', requestBody)
      .then(response => {
        if (response.status === 200) {
          dispatch({
            type: CONSTANT.PAY_PROFESSIONAL,
            payload: {
              data: response.data
            },
          });
          return response;
        } else {
          return false;
        }
      });
  }
}

export function chargeVenue(shift_payment_ids) {
  return (dispatch) => {
    const requestBody = shift_payment_ids;
      console.log(requestBody)
    return sendRequest(`shift/charge_venues`, 'PUT', requestBody)
      .then(response => {
        if (response.status === 200) {
          dispatch({
            type: CONSTANT.CHARGE_VENUE,
            payload: {
              data: response.data
            },
          });
          return response;
        } else {
          return false;
        }
      });
  }
}

export function resetProfsPayment(shift_payment_ids) {
  return (dispatch) => {
    const requestBody = shift_payment_ids;
    return sendRequest(`shift/reset_profs_payments`, 'PUT', requestBody)
      .then(response => {
        if (response.status === 200) {
          dispatch({
            type: CONSTANT.RESET_PROFESSIONAL,
            payload: {
              data: response.data
            },
          });
          return response;
        } else {
          return false;
        }
      });
  }
}
