import React from 'react'
import { Input, CustomInput } from 'reactstrap'
import { get } from 'lodash'

const GenericInput = ({ bindInput, element, attributes, children, custom }) => {
  const { name, type, attributes: elementAttributes } = element
  if (get(elementAttributes, 'multiple', false)) {
    console.debug(
      '“Multiple” is not supported on elements. Use “checkbox-mc” instead.'
    )
    return null
  }
  const Tag = custom ? CustomInput : Input
  return (
    <Tag
      type={type}
      {...custom}
      {...bindInput(name)}
      {...elementAttributes}
      {...attributes}
    >
      {children}
    </Tag>
  )
}

const GenericInputNoChildren = ({ bindInput, element, attributes, custom }) => {
  const { name, type, attributes: elementAttributes } = element
  const Tag = custom ? CustomInput : Input
  return (
    <Tag
      type={type}
      {...custom}
      {...bindInput(name)}
      {...elementAttributes}
      {...attributes}
    />
  )
}

GenericInput.displayName = 'Input'
GenericInputNoChildren.displayName = 'Input'

export default GenericInput
export { GenericInputNoChildren }
