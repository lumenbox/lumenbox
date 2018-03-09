import * as React from 'react'
import { connect } from '@cerebral/react'
import { state, signal } from 'cerebral/tags'
import * as classNames from 'classnames'

const Menu = ({ user, showMobileMenu, page, isLogoutLoading, logoutClicked }) => (
  <div className={classNames('navbar-menu', { 'is-active': showMobileMenu })}>
    <div className="navbar-start">
      {user
        ? [
            <a key="dashboard" className={classNames('navbar-item', { 'is-active': page === 'dashboard' })} href="/">
              Dashboard
            </a>
          ]
        : [
            <a
              key="register"
              className={classNames('navbar-item', { 'is-active': page === 'register' })}
              href="/register">
              Register
            </a>
          ]}
    </div>
    <div className="navbar-end">
      {user ? (
        [
          <a
            key="myAccount"
            className={classNames('navbar-item', { 'is-active': page === 'changePassword' })}
            href="/change-password">
            Change Password
          </a>,
          <a
            key="logout"
            className={classNames('navbar-item', { 'is-loading': isLogoutLoading })}
            onClick={/* istanbul ignore next */ () => logoutClicked()}>
            Logout
          </a>
        ]
      ) : (
        <a key="login" className="navbar-item" href="/">
          Login
        </a>
      )}
    </div>
  </div>
)

export default connect(
  {
    user: state`auth.user`,
    isLogoutLoading: state`auth.isLoading`,
    showMobileMenu: state`app.showMobileMenu`,
    page: state`app.page`,
    logoutClicked: signal`auth.logoutClicked`
  },
  Menu
)
