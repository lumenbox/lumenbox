import * as React from 'react'
import { connect } from '@cerebral/react'
import { form } from '@cerebral/forms'
import { state, signal } from 'cerebral/tags'
import * as classNames from 'classnames'
import Input from '../Input'

const ChangePassword = ({ isLoading, changePasswordForm, fieldChanged, changePasswordSubmitted }) => (
  <section className="section">
    <form
      onSubmit={
        /* istanbul ignore next */ e => {
          e.preventDefault()
          changePasswordSubmitted()
        }
      }>
      <h2 className="title">Change Password</h2>
      <Input
        label="Current Password"
        type="password"
        icon="key"
        {...changePasswordForm.password}
        onChange={/* istanbul ignore next */ value => fieldChanged({ name: 'changePasswordForm.password', value })}
        autoComplete="off"
      />
      <Input
        label="New Password"
        type="password"
        icon="key"
        {...changePasswordForm.newPassword}
        errorMessage={'must be at least 8 characters long, password phrases are recomended'}
        onChange={/* istanbul ignore next */ value => fieldChanged({ name: 'changePasswordForm.newPassword', value })}
        autoComplete="off"
      />
      <Input
        label="Repeat Password"
        type="password"
        icon="key"
        {...changePasswordForm.repeatNewPassword}
        errorMessage={'passwords do not match'}
        onChange={
          /* istanbul ignore next */ value => fieldChanged({ name: 'changePasswordForm.repeatNewPassword', value })
        }
        autoComplete="off"
      />
      <div className="field is-grouped is-grouped-right">
        <p className="control">
          <button
            type="submit"
            className={classNames('button', 'submit-button', 'is-success', { 'is-loading': isLoading })}
            disabled={!changePasswordForm.isValid}>
            Change Password
          </button>
        </p>
      </div>
    </form>
  </section>
)

export default connect(
  {
    isLoading: state`auth.isLoading`,
    changePasswordForm: form(state`auth.changePasswordForm`),
    fieldChanged: signal`auth.fieldChanged`,
    changePasswordSubmitted: signal`auth.changePasswordSubmitted`
  },
  ChangePassword
)
