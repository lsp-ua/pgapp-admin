import * as configureStore from '../store';
import * as APP_CONSTANT from '../constants/app';
import * as appActions from '../actions/app'

const DEVELOPMENT_MODE = process.env.NODE_ENV === 'development';

function checkStatus(response) {
  if (!response || response.status === 500) {
    return Promise.reject(response);
  } else if (response.status === 403 || response.status === 401) {
    localStorage.removeItem('api_token');
    localStorage.removeItem('app_user');
    window.location = '/';
  } else {
    return Promise.resolve(response);
  }
}

function parseJSON(response) {
  //todo - need to clarify
  if (response.status === 204) {
    return Promise.resolve({
      status: response.status
    });
  }

  return response.json().then(json => {
    return {
      data: json,
      status: response.status,
      headers: response.headers.map,
    };
  }).catch(error => {
    //handle when we don't have a data in response

    return Promise.resolve({
      data: {},
      status: response.status,
      headers: response.headers.map,
    });
  });
}

function preProcessResponse(url, response) {
  if (DEVELOPMENT_MODE) {
    let responseForLog = {
      url: url,
      ...response
    };
    console.info('Received', responseForLog);
  }
  return Promise.resolve(response);
}

export default function sendRequest(url = '', method = 'GET', data = {}) {
  const apiToken = localStorage.getItem('api_token') || '';

  //setting headers
  let headers = {
    'Content-Type': 'application/json',
    'api_token': apiToken,
  };
  //setting params
  let params = {
    method,
    headers
  };

  //If data is an empty object, we don't need to pass it through body
  if (JSON.stringify(data) !== JSON.stringify({})) {
    params.body = JSON.stringify(data);
  }

  if (DEVELOPMENT_MODE) {
    console.info('Send', {
      url: url,
      method: method,
      data: data,
      headers: headers
    });
  }
  return (fetch(APP_CONSTANT.API_URL + url, params)
      .then(checkStatus)
      .then(parseJSON)
      .then(response => {
        return preProcessResponse(url, response);
      })
      .catch(response => {
        configureStore.STORE.dispatch(appActions.setError('error'));
        return Promise.reject(response);
      })
  );
}
