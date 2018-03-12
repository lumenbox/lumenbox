import * as React from 'react'
import classNames from 'classnames'

const Icon = ({ className, name, noWrap }) =>
  noWrap ? (
    <i className={classNames('fas', `fa-${name}`, className)} />
  ) : (
    <span className={classNames('icon', className)}>
      <i className={classNames('fas', `fa-${name}`)} />
    </span>
  )

export default Icon
