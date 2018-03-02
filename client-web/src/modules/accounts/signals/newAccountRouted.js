import { set } from 'cerebral/operators'
import { props } from 'cerebral/tags'
import accountRouted from './accountRouted'

export default [set(props`accountId`, null), accountRouted]
