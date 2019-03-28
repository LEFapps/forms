import React from 'react'

const DividerComponent = props => {
  const { element, attributes: propsAttributes } = props
  const { attributes: elementAttributes } = element
  return <hr {...elementAttributes} {...propsAttributes} />
}

export default DividerComponent
