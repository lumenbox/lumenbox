import * as React from 'react'
import classNames from 'classnames'

const Icon = ({ className, name, noWrap, title }) =>
  noWrap ? (
    <i className={classNames('fas', `fa-${name}`, className)} title={title} />
  ) : (
    <span className={classNames('icon', className)} title={title}>
      <i className={classNames('fas', `fa-${name}`)} />
    </span>
  )

export default Icon
