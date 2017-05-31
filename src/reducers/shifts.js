import * as CONSTANT from '../constants/shifts';

const shiftObject = {
  arrival_time: '',
  created_at: '',
  created_by: {
    uuid: '',
    firstname: '',
    lastname: ''
  },
  position: '',
  position_id: '',
  professional: {
    uuid: '',
    firstname: '',
    lastname: ''
  },
  status: '',
  uuid: '',
  venue: {
    address: {
      address: '',
      city: '',
      state: '',
      zip: ''
    },
    dress_code_pant: '',
    dress_code_shirt: '',
    dress_code_shoes: ''
  },
  work_duration: ''
};

const initialState = {
  shifts: [],
  shift: shiftObject
};

export default function (state = initialState, action) {
  switch (action.type) {

    case CONSTANT.GET_LIST:
      return {
        ...state,
        shifts: action.payload.shifts
      };

    case CONSTANT.GET_ELEMENT:
      return {
        ...state,
        shift: action.payload.shift
      };

    case CONSTANT.GET_PROF_LIST:
      return {
        ...state,
        shiftProf: action.payload.shiftProf
      };

    default:
      return state;
  }
}
