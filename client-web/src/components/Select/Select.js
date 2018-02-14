import * as React from 'react'

const Select = ({ id, label, placeholder, onChange, options, value, isPristine, isValid, errorMessage }) => (
  <div className="field">
    {label && <label>{label}</label>}
    <div className="control">
      <div className="select">
        <select
          id={id}
          onChange={e => onChange && onChange(e.target.value, e)}
          value={typeof value === 'undefined' || value === null ? placeholder : value}>
          {placeholder && (
            <option value={undefined} disabled={true}>
              {placeholder}
            </option>
          )}
          {options &&
            options.map((opt, i) => {
              return (
                <option key={i} value={opt.value} disabled={opt.disabled}>
                  {opt.label}
                </option>
              )
            })}
        </select>
      </div>
    </div>
    {errorMessage && <p className="help is-danger">{errorMessage}</p>}
  </div>
)

export default Select
