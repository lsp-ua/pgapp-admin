import * as CONSTANT from '../constants/dictionary';

const initialState = {
  dictionary: {},
  dictionaries: {},
  status: {},
};

export default function dictionaryReducer(state = initialState, action) {
  switch (action.type) {

    case CONSTANT.GET_LIST:
      return {
        ...state,
        dictionary: action.payload.dictionary
      };

    case CONSTANT.GET_ELEMENT_BY_TYPE:
      return {
        ...state,
        dictionary: {
          ...state.dictionary,
          [action.payload.type]: action.payload.data
        }
      };

    case CONSTANT.ADD_DICTIONARY:
      return{
        ...state,
        dictionary: {
          ...state.dictionary,
          [action.payload.type]: [...(state.dictionary[action.payload.type] ? state.dictionary[action.payload.type] : {}), action.payload.data]
        }
      };

    case CONSTANT.DELETE_DICTIONARY:
      return{
        ...state,
        dictionary: {
          ...state.dictionary,
          [action.payload.type]: state.dictionary[action.payload.type].filter(item => item.uuid !== action.payload.uuid)
        }
      };

    case CONSTANT.SET_REQUIRED:
      return{
        ...state,
        dictionary: {
          ...state.dictionary,
          [action.payload.type]: action.payload.data
        }
      };

    case CONSTANT.CHANGE_ITEM:
      return {
        ...state,
        dictionaries: {
          ...state.dictionaries,
          [action.payload.type]: action.payload.data
        }
      };

    default:
      return state;
  }
};
