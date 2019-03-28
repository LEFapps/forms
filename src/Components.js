import { Library } from './Library'
import { isFunction, stubArray, identity } from 'lodash'

// cannot be used by require() since it's not imported anywhere else
import './components/GenericInputNoChildren'

const library = new Library([
  ['divider', './components/Divider'],
  ['infobox', './components/InfoBox'],
  ['number', './components/GenericInputNoChildren'],
  ['text', './components/Text'],
  ['textarea', './components/Textarea'],
  ['radio', './components/Radio'],
  ['checkbox', './components/Checkbox'],
  ['checkbox-mc', './components/CheckboxMC'],
  ['select', './components/Select'],
  ['phone', './components/GenericInputNoChildren'],
  ['email', './components/GenericInputNoChildren'],
  ['password', './components/GenericInputNoChildren'],
  ['url', './components/GenericInputNoChildren'],
  ['datetime-local', './components/GenericInputNoChildren']
])

// replace the paths with components and their config

library.forEach((path, name) => {
  const component = require(path)
  library.set(name, {
    component: component.default,
    config: isFunction(component.config) ? component.config : stubArray,
    transform: isFunction(component.transform) ? component.transform : identity
  })
})

export default library
