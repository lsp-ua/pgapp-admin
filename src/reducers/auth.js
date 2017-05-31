import * as CONSTANT from '../constants/auth'

const initialState = {
  user: {}
};

export default function authReducer(state = initialState, action) {
  switch (action.type){

    case CONSTANT.LOGIN:
      return state;

    default:
      return state;
  }
}
