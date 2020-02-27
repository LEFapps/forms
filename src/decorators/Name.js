import React from 'react'
import flip from 'lodash/flip'
import union from 'lodash/union'

const NameDecorator = WrappedComponent => props => (
  <WrappedComponent {...props} />
)
export default NameDecorator

export const combine = flip(union)

export const config = ({ translator, model }) => [
  {
    key: 'name',
    name: 'name',
    type: 'text',
    label: {
      default: 'reference',
      nl: 'Referentie',
      fr: 'Référence',
      en: 'Reference'
    },
    required: true
  }
]
