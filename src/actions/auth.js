import * as CONSTANT from '../constants/auth';
import sendRequest from '../services/api';

export function login(username, password) {
  return dispatch => {
    const requestBody = { username, password };

    return sendRequest('auth/login', 'POST', requestBody)
      .then(response => {
        if (response.status === 200) {
          dispatch({
            type: CONSTANT.LOGIN,
          });
          return response.data;
        } else {
          let error = new Error(response.statusText);
          error.response = response.data;
          throw error;
        }
      })
  }
}

export function logout() {
  return dispatch => {

    return sendRequest('admin/logout', 'POST')
      .then(response => {
        if (response.status === 200) {
          dispatch({
            type: CONSTANT.LOGOUT,
          });
          return response.data;
        } else {
          let error = new Error(response.statusText);
          error.response = response.data;
          throw error;
        }
      })
  }
}


export function forgotPassword(email) {
  return dispatch => {
    const requestBody = {
      email: email
    };

    return sendRequest('admin/reset_password', 'POST', requestBody)
      .then(response => {
        if (response.status === 200) {
          dispatch({
            type: CONSTANT.FORGOT_PASSWORD,
          });
          return true;
        } else {
          let error = new Error(response.statusText);
          error.response = response.data;
          throw error;
        }
      })
  }
}

export function resetPassword(token, new_password) {
  return dispatch => {
    const requestBody = {
      new_password: new_password
    };

    return sendRequest(`admin/reset_password/${token}`, 'PUT', requestBody)
      .then(response => {
        if (response.status === 200) {
          dispatch({
            type: CONSTANT.RESET_PASSWORD,
          });
          return true;
        } else {
          let error = new Error(response.statusText);
          error.response = response.data;
          throw error;
        }
      })
  }
}

export function acceptInviteAdmin(admin) {
  return dispatch => {
    const requestBody = admin;

    return sendRequest(`admin/accept_invite`, 'POST', requestBody)
      .then(response => {
        if (response.status === 200) {
          dispatch({
            type: CONSTANT.ACCEPT_INVITE,
          });
          return true;
        } else {
          let error = new Error(response.statusText);
          error.response = response.data;
          throw error;
        }
      })
  }
}
