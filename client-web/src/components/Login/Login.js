import * as React from 'react'
import { connect } from '@cerebral/react'
import { form } from '@cerebral/forms'
import { state, signal } from 'cerebral/tags'
import * as classNames from 'classnames'
import Input from '../Input'

const Login = ({ isLoading, loginForm, fieldChanged, loginFormSubmitted }) => (
  <section className="section">
    <form
      className="container"
      onSubmit={
        /* istanbul ignore next */ e => {
          e.preventDefault()
          loginFormSubmitted()
        }
      }>
      <h1 className="title">{loginForm.activationKey.value ? 'Activate Your User' : 'Login'}</h1>
      <Input
        label="Email"
        type="email"
        icon="envelope"
        {...loginForm.email}
        onChange={/* istanbul ignore next */ value => fieldChanged({ name: 'loginForm.email', value })}
      />
      <Input
        label="Password"
        type="password"
        icon="key"
        {...loginForm.password}
        onChange={/* istanbul ignore next */ value => fieldChanged({ name: 'loginForm.password', value })}
      />
      <div className="field is-grouped is-grouped-right">
        <div className="control">
          <a className="button is-text" href="/password-reset-request">
            Forgot Password
          </a>
        </div>
        <div className="control">
          <button
            type="submit"
            className={classNames('button', 'submit-button', 'is-success', { 'is-loading': isLoading })}
            disabled={!loginForm.isValid}>
            Login
          </button>
        </div>
      </div>
    </form>
  </section>
)

export default connect(
  {
    isLoading: state`auth.isLoading`,
    loginForm: form(state`auth.loginForm`),
    fieldChanged: signal`auth.fieldChanged`,
    loginFormSubmitted: signal`auth.loginFormSubmitted`
  },
  Login
)
