import React from 'react'

import { GenericInputNoChildren } from './GenericInput'

const TextComponent = props => <GenericInputNoChildren {...props} />
export default TextComponent

const TextResult = ({ element: { name }, initialModel: model }) => (
  <p>{model[name]}</p>
)
export { TextResult as result }

export const icon = 'question'
