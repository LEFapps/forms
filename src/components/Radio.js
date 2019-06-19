import React from 'react'
import { GenericInputNoChildren } from './GenericInput'
import { transformOptions } from './Select'
import { get, upperCase } from 'lodash'
import { translatorText } from '../helpers/translator'
import random from '../helpers/random'

const Radio = props => {
  const { translator, bindInput, ...xProps } = props
  return (props.element.options || []).map((option, i) => {
    const optionValue = option._id || option.default || option
    const key = (props.element.key || random()) + i
    xProps.custom = {
      id: key,
      type: 'radio',
      value: optionValue,
      label: translatorText(option, translator),
      checked: get(props.model, props.element.name) === optionValue
    }
    const bindCheckedInput = name => {
      return {
        name,
        checked: get(props.model, name) === optionValue,
        onChange: e =>
          props.setProperty(name, e.target.checked ? optionValue : undefined)
      }
    }
    return (
      <GenericInputNoChildren
        key={key}
        bindInput={bindCheckedInput}
        {...xProps}
      />
    )
  })
}

Radio.displayName = 'Radio'

const config = ({ translator }) => {
  const { languages } = translator || {}
  return [
    {
      key: 'radio.divider',
      type: 'divider',
      layout: { col: { xs: 12 } }
    },
    {
      key: 'radio.infobox',
      type: 'infobox',
      label: {
        nl: '**Opties**',
        fr: '**Choix**',
        en: '**Options**'
      },
      layout: { col: { xs: 12 } }
    },
    {
      key: 'radio.options',
      name: 'options',
      type: 'subform',
      label: { nl: 'Keuzemogelijkheden', fr: 'Choix', en: 'Options' },
      attributes: {
        min: 1,
        columns: [
          {
            name: '_id',
            label: { nl: 'Waarde', fr: 'Valeur', default: 'Value' }
          },
          { name: 'default', label: 'Label' }
        ],
        size: 'sm'
      },
      elements: [
        {
          type: 'text',
          name: '_id',
          label: 'ID (~value)',
          layout: {
            col: {
              xs: 12
            }
          }
        },
        {
          type: 'text',
          name: 'default',
          label: 'Label',
          layout: {
            col: {
              xs: 12
            }
          }
        }
      ].concat(
        (languages || []).map(language => ({
          type: 'text',
          name: language,
          label: `Label ${upperCase(language)}`,
          layout: {
            col: {
              xs: 12
            }
          }
        }))
      ),
      layout: {
        col: {
          xs: 12
        }
      }
    }
  ]
}

const transform = (element, { translator }, saving) => {
  if (element.options) {
    const result = transformOptions(element.options, translator || {}, saving)
    element.options = result
  }
  if (saving) element.custom = true
  else delete element.custom
  return element
}

export default Radio
export { config, transform }
