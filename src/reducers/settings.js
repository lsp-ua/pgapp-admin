import * as CONSTANT from '../constants/settings';

const settingsObject = {
  tos_version_manager: 0,
  time_available: 0,
  distance_available: 0,
  setting_last_update: 0,
  required_reference_type: '',
  time_shift_accept: 0,//
  time_accepted: 0,
  tos_version_professional: 0,
  dictionary_last_update: 0,
  notification_profs_count: 0,//
  distance_accepted: 0
};

const initialState = {
  settings: settingsObject,
};

export default function statusReducer(state = initialState, action) {
  switch (action.type) {

    case CONSTANT.GET_LIST:
      return {
        ...state,
        settings: action.payload.values
      };

    case CONSTANT.GET_ELEMENT:
      return {
        ...state,
        settings:{
          ...state.settings,
          [action.payload.key]: action.payload.value
        }
      };

    case CONSTANT.SET_ELEMENT:
      return {
        ...state,
        settings:{
          ...state.settings,
          [action.payload.key]: action.payload.value
        }
      };
    default:
      return state;
  }
};
