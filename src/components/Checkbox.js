import React from 'react'
import { GenericInputNoChildren } from './GenericInput'
import { get, kebabCase } from 'lodash'
import { translatorText } from '../helpers/translator'

const Checkbox = props => {
  const { bindInput, ...xProps } = props
  xProps.checked = get(props.model, props.element.name, false)
  xProps.custom = {
    id: props.element.name,
    type: 'switch',
    label: translatorText(props.element.label),
    checked: get(props.model, name, false),
    inline: !!get(props.element, 'layout.inline', undefined)
  }
  const bindCheckedInput = name => {
    return {
      name,
      checked: get(props.model, name, false),
      onChange: e => props.setProperty(name, e.target.checked)
    }
  }
  if (get(xProps, 'value', '')) {
    xProps.value = translatorText(xProps.value)
  }
  return <GenericInputNoChildren {...xProps} bindInput={bindCheckedInput} />
}

Checkbox.displayName = 'Checkbox'

const transform = (element, { translator }, saving) => {
  if (element.label) {
    element.value = `~${kebabCase(
      translatorText(element.label, { getDefault: true })
    )}`
  }
  return element
}

export default Checkbox
export { transform }
