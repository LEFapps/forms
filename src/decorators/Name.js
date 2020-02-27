import React from 'react'
import flip from 'lodash/flip'
import union from 'lodash/union'
import upperCase from 'lodash/upperCase'
import kebabCase from 'lodash/kebabCase'
import isString from 'lodash/isString'
import map from 'lodash/map'

const NameDecorator = WrappedComponent => props => (
  <WrappedComponent {...props} />
)
export default NameDecorator

export const combine = flip(union)

export const config = ({ translator, model }) => {
  const { languages } = translator || {}
  return [
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
}

