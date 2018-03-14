import * as React from 'react'
import { connect } from '@cerebral/react'
import { form } from '@cerebral/forms'
import { state, signal } from 'cerebral/tags'
import * as classNames from 'classnames'
import Input from '../Input'

const PasswordReset = ({ isLoading, passwordResetForm, fieldChanged, passwordResetFormSubmitted }) => (
  <section className="section">
    <form
      className="container"
      onSubmit={
        /* istanbul ignore next */ e => {
          e.preventDefault()
          passwordResetFormSubmitted()
        }
      }>
      <h1 className="title">Reset Password</h1>
      <Input label="Email" type="email" icon="envelope" {...passwordResetForm.email} />
      <Input
        label="New Password"
        type="password"
        icon="key"
        {...passwordResetForm.newPassword}
        errorMessage={'must be at least 8 characters long, password phrases are recomended'}
        onChange={/* istanbul ignore next */ value => fieldChanged({ name: 'passwordResetForm.newPassword', value })}
      />
      <Input
        label="Repeat Password"
        type="password"
        icon="key"
        {...passwordResetForm.repeatPassword}
        errorMessage={'passwords do not match'}
        onChange={/* istanbul ignore next */ value => fieldChanged({ name: 'passwordResetForm.repeatPassword', value })}
      />
      <div className="field is-grouped is-grouped-right">
        <div className="control">
          <button
            type="submit"
            className={classNames('button', 'submit-button', 'is-success', { 'is-loading': isLoading })}
            disabled={!passwordResetForm.isValid}>
            Reset
          </button>
        </div>
      </div>
    </form>
  </section>
)

export default connect(
  {
    isLoading: state`auth.isLoading`,
    passwordResetForm: form(state`auth.passwordResetForm`),
    fieldChanged: signal`auth.fieldChanged`,
    passwordResetFormSubmitted: signal`auth.passwordResetFormSubmitted`
  },
  PasswordReset
)
