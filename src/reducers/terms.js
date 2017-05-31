import * as CONSTANT from '../constants/terms';

const initialState = {
  text: '',
  version: 0,
};

export default function termsReducer(state = initialState, action) {
  switch (action.type) {

    case CONSTANT.SET_ELEMENT:
      return {
        ...state,
        text: action.payload.text,
        version: action.payload.version,
      };

    case CONSTANT.GET_ELEMENT:
      return {
        ...state,
        ...action.payload.data
      };

    default:
      return state;
  }
};
