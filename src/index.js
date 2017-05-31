import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, useRouterHistory } from 'react-router'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'
import { createHashHistory } from 'history'
import * as configureStore from './store'

import MainLayout from './containers/Main'

import AuthLayout from './containers/Auth'
import LoginPage from './components/Auth/Login'

import NotFoundLayout from './containers/NotFound'

import DashboardContainer from './containers/Dashboard'
import Dashboard from './components/Dashboard'

import AdminContainer from './containers/Admin'
import AdminList from './components/Admin/List'
import AdminElement from './components/Admin/Element'

import UserContainer from './containers/User'
import UserList from './components/User/List'
import UserElement from './components/User/Element'

import ManagerContainer from './containers/Manager'
import ManagerList from './components/Manager/List'
import ManagerElement from './components/Manager/Element'

import ProfessionalContainer from './containers/Professional'
import ProfessionalList from './components/Professional/List'
import ProfessionalElement from './components/Professional/Element'
import ProfessionalTrackingHistory from './components/Professional/TrackingHistory'

import DictionaryContainer from './containers/Dictionary'
import DictionaryList from './components/Dictionary/List'

import VenueContainer from './containers/Venue'
import VenueList from './components/Venue/List'
import VenueElement from './components/Venue/Element'

import ShiftsContainer from './containers/Shifts'
import ShiftsList from './components/Shifts/List'
import ShiftsElement from './components/Shifts/Element'
import ShiftsMap from './components/Shifts/Map'

import TermsContainer from './containers/Terms'
import TermsElement from './components/Terms'

import MarketsContainer from './containers/Markets'
import MarketsList from './components/Markets/List'

import LogContainer from './containers/Log'
import LogList from './components/Log/List'

import PaymentContainer from './containers/Payment'
import PaymentList from './components/Payment/List'

import * as appActions from './actions/app'

import './styles/font-awesome.min.css'
import './styles/bootstrap.min.css'
import './styles/sb-admin.css'
import './styles/custom.css'
// import './styles/style.css'

const appHistory = useRouterHistory(createHashHistory)({ queryKey: false });
const store = configureStore.STORE;
const history = syncHistoryWithStore(appHistory, store);

function requireAuth(nextState, replace) {
  if (!localStorage.getItem('api_token')) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}

function notRequireAuth(nextState, replace) {
  if (localStorage.getItem('api_token')) {
    replace({
      pathname: '/',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}

function preload() {
  // store.dispatch(appActions.getСonstants());
}

window.onload = function() {
  preload();

  ReactDOM.render(
    <Provider store={store}>
      <Router history={history}>
        <Route name='Auth' component={AuthLayout} >
          <Route name="Login Page" path="/login" component={LoginPage} onEnter={notRequireAuth} />
        </Route>

        <Route name='MainLayout' component={MainLayout} onEnter={requireAuth}>

          <Route name='DashboardContainer' component={DashboardContainer} >
            <Route path="/" name="Dashboard" component={Dashboard} />
          </Route>

          <Route name='User' component={UserContainer}>
            <Route path="/users" name="UserList" cUserent={UserList}/>
            <Route path="/users/:_id" name="UserElement" component={UserElement}/>
          </Route>

          <Route name='Admin' component={AdminContainer}>
            <Route path="/admin" name="AdminList" component={AdminList}/>
            <Route path="/admin/:uuid" name="AdminElement" component={AdminElement}/>
          </Route>

          <Route name='Professional' component={ProfessionalContainer}>
            <Route path="/professional" name="ProfessionalList" component={ProfessionalList} />
            <Route path="/professional/:uuid" name="ProfessionalElement" component={ProfessionalElement} />
            <Route path="/professional/:uuid/tracking" name="ProfessionalTrackingHistory" component={ProfessionalTrackingHistory} />
          </Route>

          <Route name='Manager' component={ManagerContainer}>
            <Route path="/manager" name="ManagerList" component={ManagerList} />
            <Route path="/manager/:uuid" name="ManagerElement" component={ManagerElement} />
          </Route>

          <Route name='Venue' component={VenueContainer}>
            <Route path="/venue" name="VenueList" component={VenueList}/>
            <Route path="/venue/:uuid" name="VenueItem" component={VenueElement}/>
          </Route>

          <Route name='Shifts' component={ShiftsContainer}>
            <Route path="/shifts" name="ShiftsList" component={ShiftsList}/>
            <Route path="/shift/:uuid" name="ShiftsElement" component={ShiftsElement}/>
            <Route path="/shift/:uuid/map" name="ShiftsMap" component={ShiftsMap}/>
          </Route>

          <Route name='Dictionary' component={DictionaryContainer}>
            <Route path="/dictionary" component={DictionaryList}/>
          </Route>

          <Route name='Log' component={LogContainer}>
            <Route path="/logs" name="LogList" component={LogList} />
          </Route>

          <Route name='Terms' component={TermsContainer}>
            <Route path="/tos" name="TermsElement" component={TermsElement} />
          </Route>

          <Route name='Markets' component={MarketsContainer}>
            <Route path="/markets" name="MarketsElement" component={MarketsList} />
          </Route>

          <Route name='Payment' component={PaymentContainer}>
            <Route path="/payments" name="PaymentElement" component={PaymentList} />
          </Route>
        </Route>

        <Route path="*" component={NotFoundLayout} />
      </Router>
    </Provider>,
    document.getElementById('root'))
};
