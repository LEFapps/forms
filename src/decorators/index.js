import { DecoratorLibrary } from '../Library'
import union from 'lodash/union'
import stubArray from 'lodash/stubArray'
import identity from 'lodash/identity'
import isFunction from 'lodash/isFunction'

/* Note: the sequence here determines the sequence
 * in which they are applied in EasyForm!
 */

const library = new DecoratorLibrary([
  ['attributes', require('./Attributes')],
  ['validate', require('./Validate')],
  ['placeholder', require('./Placeholder')],
  ['formgroup', require('./FormGroup')],
  ['name', require('./Name')],
  ['layout', require('./Layout')],
  ['dependent', require('./Dependent')]
])

library.forEach((decorator, name) => {
  library.set(name, {
    decorator: decorator.default,
    config: isFunction(decorator.config) ? decorator.config : stubArray,
    combine: isFunction(decorator.combine) ? decorator.combine : union,
    transform: isFunction(decorator.transform) ? decorator.transform : identity
  })
})

export default library
