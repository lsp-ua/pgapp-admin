import * as CONSTANT from '../constants/payment';

const initialState = {
  payments: []
};

export default function (state = initialState, action) {
  switch (action.type) {

    case CONSTANT.GET_LIST:
      return {
        ...state,
        payments: action.payload.payments
      };
    default:
      return state;
  }
}

