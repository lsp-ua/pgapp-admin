import * as CONSTANT from '../constants/dashboard'
import sendRequest from '../services/api'

export function getMetricByKey(key) {
  return (dispatch) => {
    return sendRequest(`metric/${key}`, 'GET')
      .then(response => {
        if (response.status === 200) {
          dispatch({
            type: CONSTANT.GET_METRIC_BY_KEY,
            payload: {
              key: key,
              data: response.data,
            },
          });
          return true;
        } else {
          return false;
        }
      });
  }
}
