import * as React from 'react'
import * as classNames from 'classnames'

const Field = ({
  id,
  label,
  icon,
  isLoading,
  isPristine = true,
  isValid,
  hideValidationIcon = false,
  errorMessage,
  children
}) => (
  <div className="field is-horizontal">
    {label && (
      <div className="field-label is-normal">
        <label htmlFor={id}>{label}</label>
      </div>
    )}
    <div className="field-body">
      <div className="field">
        <div
          className={classNames('control', {
            'is-loading': isLoading,
            'has-icons-left': !isLoading && icon,
            'has-icons-right': !isLoading && !isPristine && !hideValidationIcon
          })}>
          {children}
        </div>
        {errorMessage && !isValid && !isPristine && <p className="help is-danger">{errorMessage}</p>}
      </div>
    </div>
  </div>
)

export default Field
