import * as CONSTANT from '../constants/manager'

const initialState = {
  managers: [],
  manager: {}
};

export default function managerReducer(state = initialState, action) {

  switch (action.type) {

    case CONSTANT.GET_LIST:
      return {
        ...state,
        managers: action.managers
      };

    case CONSTANT.GET_ELEMENT:
      return {
        ...state,
        manager: action.payload.data
      };

    case CONSTANT.GET_VENUES:
      return {
        ...state,
        manager: {
          ...state.manager,
          venues: action.payload.data
        }
      };

    default:
      return state;
  }
}
