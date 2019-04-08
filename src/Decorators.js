import { DecoratorLibrary } from './Library'
import { union, stubTrue, stubArray, identity, isFunction } from 'lodash'

/* Note: the sequence here determines the sequence
 * in which they are applied in EasyForm!
 */

const library = new DecoratorLibrary([
  ['attributes', require('./decorators/Attributes')],
  ['validate', require('./decorators/Validate')],
  ['placeholder', require('./decorators/Placeholder')],
  ['formgroup', require('./decorators/FormGroup')],
  ['name', require('./decorators/Name')],
  ['layout', require('./decorators/Layout')],
  ['dependent', require('./decorators/Dependent')]
])

library.forEach((decorator, name) => {
  library.set(name, {
    decorator: decorator.default,
    config: isFunction(decorator.config) ? decorator.config : stubArray,
    combine: isFunction(decorator.combine) ? decorator.combine : union,
    filter: isFunction(decorator.filter) ? decorator.filter : stubTrue,
    transform: isFunction(decorator.transform) ? decorator.transform : identity
  })
})

export default library
