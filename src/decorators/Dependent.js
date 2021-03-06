import React from 'react'
import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'
import isUndefined from 'lodash/isUndefined'
import isArray from 'lodash/isArray'
import castArray from 'lodash/castArray'
import intersection from 'lodash/intersection'
import includes from 'lodash/includes'
import compact from 'lodash/compact'
import map from 'lodash/map'
import merge from 'lodash/merge'

export const dependency = ({ on, operator, values }) => model => {
  const value = get(model, on)
  if (isUndefined(operator) && isUndefined(values)) return !isEmpty(value)
  else if (isUndefined(operator)) {
    if (isEmpty(values)) return isEmpty(value)
    else {
      const arrayValue = castArray(value)
      if (isArray(values)) {
        return !isEmpty(intersection(arrayValue, values))
      } else if (includes(values, ',')) {
        return !isEmpty(intersection(arrayValue, values.split(',')))
      } else return !isEmpty(intersection(arrayValue, castArray(values)))
    }
  } else {
    switch (operator) {
      case 'in':
        const arrayValue = castArray(value)
        if (isArray(values)) {
          return !isEmpty(intersection(arrayValue, values))
        } else if (includes(values, ',')) {
          return !isEmpty(intersection(arrayValue, values.split(',')))
        } else return !isEmpty(intersection(arrayValue, castArray(values)))
      case 'gt':
        return values > value
      case 'gte':
        return values >= value
      case 'lt':
        return values < value
      case 'lte':
        return values <= value
      case 'is':
        return values === value
      case 'isnt':
        return values !== value
      default:
        return !isEmpty(value)
    }
  }
}

const Dependent = WrappedComponent => props => {
  if (props.element.dependent) {
    if (!dependency(props.element.dependent)(props.model)) {
      return null
    }
  }
  return <WrappedComponent {...props} />
}
export default Dependent

export const config = ({ model }) => {
  let options = []
  if (model) {
    options = compact(
      map(model, () =>
        model.name ? merge({ _id: model.name }, model.label) : false
      )
    )
  }
  return [
    {
      key: 'dependent.divider',
      type: 'divider',
      layout: { col: { xs: 12 } }
    },
    {
      key: 'dependent.infobox',
      type: 'infobox',
      label: '**Field display depends on other field**',
      layout: { col: { xs: 12 } }
    },
    {
      key: 'dependent.on',
      name: 'dependent.on',
      type: model ? 'select' : 'text',
      label: 'Identifier of other field',
      options,
      attributes: {
        placeholder: 'Field identifier'
      },
      layout: { col: { xs: 12, sm: 12, md: 4 } }
    },
    {
      key: 'dependent.operator',
      name: 'dependent.operator',
      type: 'select',
      label: 'Condition',
      layout: { col: { xs: 12, sm: 5, md: 3 } },
      dependent: { on: 'dependent.on' }, // oh yes :)
      options: [
        {
          _id: '',
          default: '… has any value.'
        },
        {
          _id: 'is',
          default: '… is exactly …'
        },
        {
          _id: 'isnt',
          default: '… has any value, except …'
        },
        {
          _id: 'in',
          default: '… contains …'
        },
        {
          _id: 'gt',
          default: '… is greater than …'
        },
        {
          _id: 'gte',
          default: '… is greater or equal to …'
        },
        {
          _id: 'lt',
          default: '… is less than …'
        },
        {
          _id: 'lte',
          default: '… is less or equal to …'
        }
      ]
    },
    {
      key: 'dependent.values',
      name: 'dependent.values',
      type: 'text',
      label: 'Value',
      layout: { col: { xs: 12, sm: 7, md: '5' } },
      dependent: {
        on: 'dependent.operator',
        operator: 'in',
        values: ['in', 'gt', 'gte', 'lt', 'lte', 'is', 'isnt']
      },
      attributes: {
        placeholder: 'Blank unless value matters'
      }
    }
  ]
}
