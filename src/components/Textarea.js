import React from 'react'

import { GenericInputNoChildren } from './GenericInput'
import MarkDown from './markdown/MarkDown'
import Text from '../helpers/Text'

const Textarea = ({ middleware, ...props }) => {
  const element = { ...props.element }
  element.type = 'textarea'
  const { md } = props.element
  props.middleware =
    middleware &&
    middleware({
      element: props.element,
      model: props.model
    })
  if (md) return <MarkDown {...props} element={element} />
  return <GenericInputNoChildren {...props} element={element} />
}
export default Textarea

const TextareaResult = ({
  element = {},
  initialModel: model,
  middleware = () => ({})
}) => {
  const { name, md } = element
  const content = model[name]
  return md ? (
    <Text
      className='lefappsForms-results__answer'
      content={content || ''}
      {...(middleware && middleware({ element, model }))}
    />
  ) : (
    <p>{content}</p>
  )
}
export { TextareaResult as result }

export const config = () => [
  {
    key: 'textarea.divider',
    type: 'divider',
    layout: { col: { xs: 12 } }
  },
  {
    key: 'textarea.rows',
    name: 'attributes.rows',
    type: 'text',
    label: 'Size',
    attributes: {
      placeholders: {
        nl: 'Aantal lijnen, bv. 5',
        fr: 'Combien de lignes, ex. 5',
        en: 'Number of lines, e.g. 5'
      }
    },
    layout: { col: { xs: 6, md: 4 } }
  }
]

export const icon = 'paragraph'
