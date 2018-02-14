import * as React from 'react'
import { connect } from '@cerebral/react'
import { form } from '@cerebral/forms'
import { state, signal } from 'cerebral/tags'
import * as classNames from 'classnames'
import Input from '../Input'

const PasswordResetRequest = ({
  isLoading,
  passwordResetRequestForm,
  fieldChanged,
  passwordResetRequestFormSubmitted
}) => (
  <section className="section">
    <form
      className="container"
      onSubmit={
        /* istanbul ignore next */ e => {
          e.preventDefault()
          passwordResetRequestFormSubmitted()
        }
      }>
      <h1 className="title">Reset Password</h1>
      <Input
        label="Email"
        type="email"
        icon="envelope"
        {...passwordResetRequestForm.email}
        onChange={/* istanbul ignore next */ value => fieldChanged({ name: 'passwordResetRequestForm.email', value })}
      />
      <div className="field is-grouped is-grouped-right">
        <div className="control">
          <a className="button is-text" href="/login">
            Cancel
          </a>
        </div>
        <div className="control">
          <button
            type="submit"
            className={classNames('button', 'submit-button', 'is-success', { 'is-loading': isLoading })}
            disabled={!passwordResetRequestForm.isValid}>
            Request Reset
          </button>
        </div>
      </div>
    </form>
  </section>
)

export default connect(
  {
    isLoading: state`auth.isLoading`,
    passwordResetRequestForm: form(state`auth.passwordResetRequestForm`),
    fieldChanged: signal`auth.fieldChanged`,
    passwordResetRequestFormSubmitted: signal`auth.passwordResetRequestFormSubmitted`
  },
  PasswordResetRequest
)
