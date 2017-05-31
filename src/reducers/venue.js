import * as CONSTANT from '../constants/venue';

const venueObj = {
  managers: [],
  payment: {},
};

const initialState = {
  venues: [],
  venue: venueObj,
};

export default function (state = initialState, action) {

  switch (action.type) {

    case CONSTANT.GET_LIST:
      return {
        ...state,
        venues: action.venues
      };

    case CONSTANT.GET_ELEMENT:
      return {
        ...state,
        venue: action.payload.venue
      };

    case CONSTANT.SET_STATUS:
      return {
        ...state,
        venue: {
          ...state.venue,
          ...action.payload.venue
        }
      };

    case CONSTANT.GET_MANAGERS:
      return {
        ...state,
        venue: {
          ...state.venue,
          managers: action.payload.data
        }
      };

    case CONSTANT.GET_PAYMENT:
      return {
        ...state,
        venue: {
          ...state.venue,
          payment: action.payload.data
        }
      };

    default:
      return state;
  }
}
