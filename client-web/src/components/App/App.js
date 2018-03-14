import React from 'react'
import { connect } from '@cerebral/react'
import { state, signal } from 'cerebral/tags'
import * as classNames from 'classnames'
import './App.css'
import logo from './logo.png'
import NotFound from '../NotFound'
import SplashScreen from '../SplashScreen'
import Menu from './Menu'
import Footer from './Footer'
import Notifications from '../Notifications'

import dashboard from '../Dashboard'
import account from '../Account'
import register from '../Register'
import registerComplete from '../RegisterComplete'
import login from '../Login'
import changePassword from '../ChangePassword'
import passwordResetRequest from '../PasswordResetRequest'
import passwordReset from '../PasswordReset'

let components = {
  dashboard,
  account,
  register,
  registerComplete,
  changePassword,
  passwordResetRequest,
  passwordReset
}

const App = ({ initialized, showMobileMenu, page, mobileMenuToggled, Component }) =>
  !initialized ? (
    <SplashScreen />
  ) : (
    <div>
      <nav className="navbar is-dark" aria-label="main navigation">
        <div className="navbar-brand">
          <a className={classNames('navbar-item', { 'is-active': page === 'dashboard' })} href="/">
            <img src={logo} alt="" />
          </a>
          <button
            className={classNames('button', 'navbar-burger', 'is-dark', { 'is-active': showMobileMenu })}
            onClick={/* istanbul ignore next */ () => mobileMenuToggled()}>
            <span />
            <span />
            <span />
          </button>
        </div>
        <Menu />
      </nav>
      <Component />
      <Notifications />
      <Footer />
    </div>
  )

export default connect(
  {
    initialized: state`app.initialized`,
    user: state`auth.user`,
    showMobileMenu: state`app.showMobileMenu`,
    page: state`app.page`,
    mobileMenuToggled: signal`app.mobileMenuToggled`
  },
  props =>
    Object.assign(
      {
        Component: props.user || props.page === 'register' ? components[props.page] || NotFound : login
      },
      props
    ),
  App
)
