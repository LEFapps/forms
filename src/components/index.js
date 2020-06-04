import { Library } from '../Library'
import isFunction from 'lodash/isFunction'
import stubArray from 'lodash/stubArray'
import stubFalse from 'lodash/stubFalse'
import identity from 'lodash/identity'

// cannot be used by require() since it's not imported anywhere else
import './GenericInputNoChildren'

const library = new Library([
  ['divider', require('./Divider')],
  ['infobox', require('./InfoBox')],
  ['number', require('./GenericInputNoChildren')],
  ['text', require('./Text')],
  ['textarea', require('./Textarea')],
  ['radio', require('./Radio')],
  ['checkbox', require('./Checkbox')],
  ['checkbox-mc', require('./CheckboxMC')],
  ['select', require('./Select')],
  ['phone', require('./GenericInputNoChildren')],
  ['email', require('./GenericInputNoChildren')],
  ['password', require('./GenericInputNoChildren')],
  ['url', require('./GenericInputNoChildren')],
  ['editor', require('./Editor')],
  ['subform', require('./subform/Subform')],
  ['time', require('./GenericInputNoChildren')],
  ['datetime-local', require('./GenericInputNoChildren')]
])

// replace the paths with components and their config

library.forEach((component, name) => {
  library.set(name, {
    component: component.default,
    result: component.result,
    config: isFunction(component.config) ? component.config : stubArray,
    transform: isFunction(component.transform) ? component.transform : identity,
    filter: isFunction(component.filter) ? component.filter : stubFalse,
    hideable: true,
    icon: component.icon || 'pen'
  })
})

export default library
