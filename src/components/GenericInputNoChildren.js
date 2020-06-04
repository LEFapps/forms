import React from 'react'

import { config, GenericInputNoChildren } from './GenericInput'

export default GenericInputNoChildren

const GenericInputNoChildrenResult = ({
  element: { name },
  initialModel: model = {}
}) => <p className='text-primary'>{model[name]}</p>
export { GenericInputNoChildrenResult as result }

export { config }
