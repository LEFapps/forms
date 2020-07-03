import React from 'react'

import { config, GenericInputNoChildren } from './GenericInput'

export default GenericInputNoChildren

const GenericInputNoChildrenResult = ({
  element = {},
  initialModel: model = {},
  middleware = () => ({})
}) => (
  <p
    className='lefappsForms-results__answer'
    {...(middleware && middleware({ element, model }))}
  >
    {model[element.name]}
  </p>
)
export { GenericInputNoChildrenResult as result }

export { config }
