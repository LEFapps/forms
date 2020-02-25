import React from 'react'
import flip from 'lodash/flip'
import union from 'lodash/union'
import upperCase from 'lodash/upperCase'
import kebabCase from 'lodash/kebabCase'
import isString from 'lodash/isString'

const NameDecorator = WrappedComponent => props => (
  <WrappedComponent {...props} />
)
export default NameDecorator

export const combine = flip(union)

export const config = ({ translator, model }) => {
  const { languages } = translator || {}
  const base = [
    {
      key: 'name._id',
      name: 'name._id',
      type: 'text',
      label: {
        default: '',
        nl: 'Interne benaming',
        fr: 'Nom interne',
        en: 'Internal name'
      },
      attributes: {
        readOnly: true,
        disabled: true
      },
      required: true,
      layout: { col: { xs: 12 } }
    }
  ]
  const langs = languages.map((l = '') => ({
    name: `name.${l}`,
    type: 'text',
    label: upperCase(l),
    layout: {
      col: { xs: Math.max(3, Math.round(12 / languages.length)) }
    }
  }))
  return base.concat(langs)
}

export const transform = (element, { translator }, saving) => {
  const { name } = element
  if (name && !isString(name)) {
    const { _id, ...names } = name
    if (!_id) element.name._id = kebabCase(head(map(names)))
  }
  return element
}
