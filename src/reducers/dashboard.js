import * as CONSTANT from '../constants/dashboard';

const initialState = {
  metrics: {}
};

export default function dashboardReducer(state = initialState, action) {
  switch (action.type) {

    case CONSTANT.GET_METRIC_BY_KEY:
      return {
        ...state,
        metrics: {
          ...state.metrics,
          [action.payload.key]: action.payload.data
        }
      };

    default:
      return state;
  }
};
