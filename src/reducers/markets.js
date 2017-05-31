import * as CONSTANT from '../constants/markets';

const marketObj = {
  positions: [],
  isUsable: true,
  name: '',
  created_at: '',
  uuid: '',
  requestExpiration: '',
  densityFactor: '',
  immediateMax: '',
  zipCodes: []
};

const initialState = {
  markets: [],
  market: marketObj

};

export default function (state = initialState, action) {

  switch (action.type) {

    case CONSTANT.GET_LIST:
      return {
        ...state,
        markets: action.markets
      };

    case CONSTANT.GET_ELEMENT:
      return {
        ...state,
        market: action.payload.market
      };

    case CONSTANT.CREATE:
      return {
        ...state,
        market: {
          ...state.market,
          market: action.market
        }
      };

    case CONSTANT.UPDATE:
      return {
      ...state,
      market: action.payload.data
      };

    default:
      return state;
  }
}
