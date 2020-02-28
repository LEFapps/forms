import React from 'react'
import get from 'lodash/get'
import upperCase from 'lodash/upperCase'
import includes from 'lodash/includes'

import { GenericInputNoChildren } from './GenericInput'
import translatorText from '../helpers/translator'
import random from '../helpers/random'

const CheckboxMC = props => {
  const { bindInput, ...xProps } = props
  const thisModel = get(props.model, props.element.name, [])
  return (props.element.options || []).map((option, i) => {
    const optionValue = option._id || option.default || option
    const key = (props.element.key || random()) + i
    xProps.custom = {
      id: key,
      type: 'checkbox',
      value: optionValue,
      label: translatorText(option),
      checked: includes(thisModel, optionValue),
      inline: !!get(props.element, 'layout.inline', undefined)
    }
    const bindCheckedInput = name => ({
      name,
      checked: includes(thisModel, optionValue),
      onChange: e => {
        if (e.target.checked) {
          thisModel.push(optionValue)
          return props.setProperty(name, thisModel)
        } else {
          props.setProperty(
            name,
            thisModel.filter(o => o !== optionValue)
          )
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
export default CheckboxMC

export const config = ({ translator, model }) => {
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

export const transform = (element, { translator }, saving) => {
  if (saving) element.custom = true
  else delete element.custom
  return element
}

export const filter = d => ['placeholder'].includes(d)

export const icon = 'check-double'
