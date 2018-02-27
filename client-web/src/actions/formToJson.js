import transform from './transform'
import toJson from '@cerebral/forms/lib/helpers/formToJSON'

export default (targetTag, valueTag) => transform(targetTag, valueTag, value => toJson(value))
