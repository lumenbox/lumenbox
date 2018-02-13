import { state, props } from 'cerebral/tags'
import { setField } from '@cerebral/forms/operators'

export default path => [setField(state`${path}.${props`name`}`, props`value`)]
