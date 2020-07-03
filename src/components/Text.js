import React from 'react'

import { GenericInputNoChildren } from './GenericInput'

const TextComponent = props => <GenericInputNoChildren {...props} />
export default TextComponent

const TextResult = ({
  element = {},
  initialModel: model,
  middleware = () => ({})
}) => (
  <p
    className='lefappsForms-results__answer'
    {...(middleware && middleware({ element, model }))}
  >
    {model[element.name]}
  </p>
)
export { TextResult as result }

export const icon = 'question'
