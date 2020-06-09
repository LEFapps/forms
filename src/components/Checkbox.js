import React from 'react'
import get from 'lodash/get'
import kebabCase from 'lodash/kebabCase'

import random from '../helpers/random'
import { GenericInputNoChildren } from './GenericInput'
import translatorText from '../helpers/translator'

const Checkbox = props => {
  const { bindInput, ...xProps } = props
  xProps.checked = get(props.model, props.element.name, false)
  xProps.custom = {
    id: `${props.element.name}-${random()}`,
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
export default Checkbox

const CheckboxResult = ({
  element = {},
  initialModel: model = {},
  middleware = () => ({})
}) => {
  const isChecked = model[element.name]
  return (
    <span
      className={'text-' + (isChecked ? 'success' : 'danger')}
      {...(middleware && middleware({ element, model }))}
    >
      {isChecked ? '✓' : '×'}
    </span>
  )
}
export { CheckboxResult as result }

export const transform = (element, { translator }, saving) => {
  if (element.label) {
    element.value = `~${kebabCase(
      translatorText(element.label, { getDefault: true })
    )}`
  }
  return element
}

export const filter = d => ['placeholder'].includes(d)

export const icon = 'toggle-on'
