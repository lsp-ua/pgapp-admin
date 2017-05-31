import * as CONSTANT from "../constants/history";

const initialState = {
  logs: {}
};


export default function historyReducer(state = initialState, action) {
  switch (action.type) {

    case CONSTANT.GET_LIST:
      return {
        ...state,
        logs: action.logs
      };
    default:
      return state;
  }
};
