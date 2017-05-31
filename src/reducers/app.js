import * as CONSTANT from '../constants/app';

const constantsObj = {
  DEEPLINK: {
    APP_NAME: 'pgapp-admin'
  },
  USER_TYPE: {
    'ADMIN': 'admin',
    MANAGER: 'manager',
    PROFESSIONAL: 'professional'
  },
  USER_STATUS: {
    CONFIRM: 'confirm',
    NOT_CONFIRM: 'not_confirm',
    BAN: 'ban'
  },
  PROFESSIONAL_STATUS: {
    PROFILE_INCOMPLETE: 'profile_incomplete',
    WAITING_APPROVAL: 'waiting_approval',
    AVAILABLE: 'available',
    NOT_AVAILABLE: 'not_available',
    APPROVE: 'approve',
    REJECT: 'reject',
    OMW_TO_SHIFT: 'omw_to_shift',
    ARRIVED_TO_SHIFT: 'arrived_to_shift',
    WORKING_SHIFT: 'working_shift',
    BAN: 'ban'
  },
  SHIFT_STATUS: {
    ACTIVE: 'active',
    ARRIVED: 'professional_arrived',
    LOOKING: 'looking_for_professionals',
    FOUND: 'professional_found',
    REJECTED: 'rejected',
    RATED: 'rated',
    NEW: 'new',
    NOT_FOUND: 'not_found',
    NOT_RATED: 'not_rated'
  },
  SHIFT_PROFESSIONAL_STATUS: {
    IN_QUEUE: 'in_queue',
    ACCEPTED: 'accepted',
    REJECTED: 'rejected',
    PN_SEND: 'pn_send'
  },
  VENUE_STATUS: {
    ACTIVE: 'active',
    NOT_ACTIVE: 'not_active',
    DELETED: 'deleted'
  },
  VENUE_MANAGER_STATUS: {
    PENDING: 'pending',
    REJECTED: 'rejected',
    ACTIVE: 'active'
  },
  DEVICE_TYPE: {
    ANDROID: 'android',
    IPHONE: 'iphone',
    OTHER: 'other'
  },
  DICTIONARY_TYPE: {
    POSITION: 'position',
    POS: 'pos',
    EXPERIENCE_TIME_FRAMES: 'experience_time_frames',
    DRESS_CODE_SHIRT: 'dress_code_shirt',
    DRESS_CODE_PANT: 'dress_code_pant',
    DRESS_CODE_SHOES: 'dress_code_shoes',
    REFERENCE_TYPE: 'reference_type',
    ABOUT_US_ANSWERS: 'about_us_answers'
  },
  METRIC: {
    KEY: {
      PROFESSIONAL: 'professional'
    },
    SUB_KEY: {
      ABOUT_US_ANSWER: 'about_us_answer'
    }
  },
  DEVICE_OS: {
    ANDROID: 'android',
    IOS: 'ios'
  },
  TOS_TYPE: {
    PROFESSIONAL: 'professional',
    MANAGER: 'manager'
  }
};

const initialState = {
  error: '',
  testData: [],
  notification: '',
  constants: constantsObj,
};

export default function appReducer(state = initialState, action) {
  switch (action.type) {

    case CONSTANT.SET_ERROR:
      return {
        ...state,
        error: action.payload.error
      };

    case CONSTANT.ADD_DATA:
      return {
        ...state,
        testData: [...state.testData, action.payload.data]
      };

    case CONSTANT.ADD_NOTIFICATION:
      return {
        ...state,
        notification: action.payload.notification
      };

    case CONSTANT.GET_CONSTANTS:
      return {
        ...state,
        constants: action.payload.constants
      };

    default:
      return state;
  }
};
