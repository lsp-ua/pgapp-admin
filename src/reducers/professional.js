import * as CONSTANT from '../constants/professional';

const initialState = {
  professionals: [],
  professional: {},
  invite: []
};

export default function professionalReducer(state = initialState, action) {
  switch (action.type) {

    case CONSTANT.GET_LIST:
      return {
        ...state,
        professionals: action.professionals
      };

    case CONSTANT.GET_ELEMENT:
      return {
        ...state,
        professional: action.payload.professional
      };

    case CONSTANT.CHANGE_STATUS:
      return {
        ...state,
        professional: action.payload.professional
      };

    case CONSTANT.SAVE_REFERENCE:
      return {
        ...state,
        professional: {
          ...state.professional,
          reference: action.payload.reference
        }
      };

    case CONSTANT.GET_INVITE_CODE:
      return {
        ...state,
        invite: action.payload.invite
      };

    case CONSTANT.ADD_INVITE_CODE:
      return{
        ...state,
        invite: [action.payload.invite, ...state.invite]
      };

    case CONSTANT.GET_TRACKING_HISTORY:
      return{
        ...state,
        trackingHistory: action.payload.trackingHistory
      };

    default:
      return state;
  }
};
