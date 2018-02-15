import * as React from 'react'

const Checkbox = ({ label, value, name, isPristine, isValid, errorMessage, onChange }) => (
  <div className="field">
    <div className="control">
      <label className="checkbox">
        <input
          id={`cb-${name}`}
          className="is-checkradio"
          type="checkbox"
          checked={value}
          onChange={
            /* istanbul ignore next */ e => {
              onChange && onChange(e.target.checked, e)
            }
          }
        />{' '}
        {label}
      </label>
    </div>
    {errorMessage && <p className="help is-danger">{errorMessage}</p>}
  </div>
)

export default Checkbox
