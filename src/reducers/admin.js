import * as CONSTANT from '../constants/admin';
const initialState = {
  admins: [],
  admin: {}
};

export default function adminReducer(state = initialState, action) {
  switch (action.type){
    case CONSTANT.GET_LIST:
      return {
        ...state,
        admins: action.admins
      };
    case CONSTANT.GET_ELEMENT:
      return{
        ...state,
        admin: action.payload.admin
      };
    default:
      return state;
  }
}
