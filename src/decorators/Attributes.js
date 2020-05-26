import React from 'react'
import flip from 'lodash/flip'
import union from 'lodash/union'

const AttributesDecorator = WrappedComponent => props => {
  const { getAttributes } = props
  if (typeof getAttributes !== 'function') {
    return <WrappedComponent {...props} />
  }
  return (
    <WrappedComponent {...props} attributes={getAttributes(props.element)} />
  )
}
export default AttributesDecorator

export const combine = flip(union)
