import React from 'react'
import { get } from 'lodash'

import { GenericInputNoChildren } from './GenericInput'
import MarkDown from './_MarkDown'

const Textarea = props =>
  get(props, 'element.md') ? (
    <MarkDown {...props} />
  ) : (
    <GenericInputNoChildren {...props} />
  )

const config = () => [
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

export default Textarea
export { config }
