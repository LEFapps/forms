import React from 'react'
import { GenericInputNoChildren } from './GenericInput'
import { transformOptions } from './Select'
import { get, upperCase, includes } from 'lodash'
import { translatorText } from '../helpers/translator'
import random from '../helpers/random'

const CheckboxMC = props => {
  const { translator, bindInput, ...xProps } = props
  const thisModel = get(props.model, props.element.name, [])
  return (props.element.options || []).map((option, i) => {
    const optionValue = option._id || option.default || option
    const key = (props.element.key || random()) + i
    xProps.custom = {
      id: key,
      type: 'checkbox',
      value: optionValue,
      label: translatorText(option, translator),
      checked: includes(thisModel, optionValue)
    }
    const bindCheckedInput = name => ({
      name,
      checked: includes(thisModel, optionValue),
      onChange: e => {
        if (e.target.checked) {
          thisModel.push(optionValue)
          return props.setProperty(name, thisModel)
        } else {
          props.setProperty(name, thisModel.filter(o => o !== optionValue))
        }
      }
    })
    return (
      <GenericInputNoChildren
        key={key}
        bindInput={bindCheckedInput}
        {...xProps}
      />
    )
  })
}

CheckboxMC.displayName = 'CheckboxMC'

const config = ({ translator, model }) => {
  const { languages } = translator || {}
  return [
    {
      key: 'select-mc.divider',
      type: 'divider',
      layout: { col: { xs: 12 } }
    },
    {
      key: 'select-mc.infobox',
      type: 'infobox',
      label: {
        nl: '**Opties**',
        fr: '**Choix**',
        en: '**Options**'
      },
      layout: { col: { xs: 12 } }
    },
    {
      key: 'select-mc.options',
      name: 'options',
      type: 'subform',
      label: { nl: 'Keuzemogelijkheden', fr: 'Choix', en: 'Options' },
      attributes: {
        min: 1,
        columns: ['_id', 'default'],
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

export default CheckboxMC
export { config, transform }
