import { Library } from './Library'
import { isFunction, stubArray, identity } from 'lodash'

// cannot be used by require() since it's not imported anywhere else
import './components/GenericInputNoChildren'

const library = new Library([
  ['divider', require('./components/Divider')],
  ['infobox', require('./components/InfoBox')],
  ['number', require('./components/GenericInputNoChildren')],
  ['text', require('./components/Text')],
  ['textarea', require('./components/Textarea')],
  ['radio', require('./components/Radio')],
  ['checkbox', require('./components/Checkbox')],
  ['checkbox-mc', require('./components/CheckboxMC')],
  ['select', require('./components/Select')],
  ['phone', require('./components/GenericInputNoChildren')],
  ['email', require('./components/GenericInputNoChildren')],
  ['password', require('./components/GenericInputNoChildren')],
  ['url', require('./components/GenericInputNoChildren')],
  ['editor', require('./components/Editor')],
  ['subform', require('./components/subform/Subform')],
  ['datetime-local', require('./components/GenericInputNoChildren')]
])

// replace the paths with components and their config

library.forEach((component, name) => {
  library.set(name, {
    component: component.default,
    config: isFunction(component.config) ? component.config : stubArray,
    transform: isFunction(component.transform) ? component.transform : identity
  })
})

export default library
