import React from 'react'

import { GenericInputNoChildren } from './GenericInput'
import MarkDown from './markdown/MarkDown'
import Text from '../helpers/Text'
import translate from '../helpers/translator'

const Textarea = props => {
  const element = { ...props.element }
  element.type = 'textarea'
  const { md } = props.element
  if (md) return <MarkDown {...props} element={element} />
  return <GenericInputNoChildren {...props} element={element} />
}
export default Textarea

const TextareaResult = ({ element: { name, md }, initialModel: model }) => {
  const content = model[name]
  return md ? <Text content={content || ''} /> : <p>{content}</p>
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
