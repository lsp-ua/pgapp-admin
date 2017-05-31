import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'
import appReducer from './app'
import authReducer from './auth'
import adminReducer from './admin'
import managerReducer from './manager'
import professionalReducer from './professional'
import dictionaryReducer from './dictionary'
import settingsReducer from './settings'
import termsReducer from './terms'
import venueReducer from './venue'
import dashboardReducer from './dashboard'
import shiftsReducer from './shifts'
import logReducer from './log';
import marketsReducer from './markets'
import paymentsReducer from './payment'

export default combineReducers({
  routing,
  appReducer,
  authReducer,
  adminReducer,
  managerReducer,
  professionalReducer,
  dictionaryReducer,
  settingsReducer,
  termsReducer,
  dashboardReducer,
  venueReducer,
  shiftsReducer,
  marketsReducer,
  logReducer,
  paymentsReducer
});
