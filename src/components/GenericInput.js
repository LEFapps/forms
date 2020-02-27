import React from 'react'
import { Input, CustomInput } from 'reactstrap'
import get from 'lodash/get'
import isString from 'lodash/isString'

const GenericInput = ({ bindInput, element, attributes, children, custom }) => {
  const { name: names, type, attributes: elementAttributes } = element
  const name = (isString(names) && names) || (name && name._id) || name
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
  const { name: names, type, attributes: elementAttributes } = element
  const name = (isString(names) && names) || name._id
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
