import * as React from 'react'
import * as classNames from 'classnames'

const Input = ({
  id,
  label,
  placeholder,
  type = 'text',
  icon,
  value,
  isPristine = true,
  isValid = true,
  hideValidationIcon = false,
  errorMessage,
  onChange,
  minLength,
  autoComplete = 'on'
}) => (
  <div className="field is-horizontal">
    {label && (
      <div className="field-label is-normal">
        <label htmlFor={id}>{label}</label>
      </div>
    )}
    <div className="field-body">
      <div className="field">
        <p
          className={classNames('control', {
            'has-icons-left': icon,
            'has-icons-right': !isPristine && !hideValidationIcon
          })}>
          <input
            className={classNames('input', { 'is-danger': !isPristine && !isValid })}
            type={type}
            placeholder={placeholder || label}
            id={id}
            value={value}
            minLength={minLength}
            onChange={/* istanbul ignore next */ e => onChange && onChange(e.target.value, e)}
            readOnly={!onChange}
            autoComplete={autoComplete}
          />
          {icon && (
            <span className="icon is-small is-left">
              <i className={`fa fa-${icon}`} />
            </span>
          )}
          {!hideValidationIcon &&
            !isPristine &&
            isValid && (
              <span className="icon is-small is-right">
                <i className="fa fa-check" />
              </span>
            )}
          {!hideValidationIcon &&
            !isPristine &&
            !isValid && (
              <span className="icon is-small is-right">
                <i className="fa fa-warning" />
              </span>
            )}
        </p>
      </div>
    </div>
    {errorMessage && <p className="help is-danger">{errorMessage}</p>}
  </div>
)

export default Input
