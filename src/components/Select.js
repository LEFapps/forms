import React, { useState, useEffect } from 'react'
import isArray from 'lodash/isArray'
import isString from 'lodash/isString'
import upperCase from 'lodash/upperCase'

import GenericInput from './GenericInput'
import translatorText from '../helpers/translator'

const Option = ({ option }) => {
  const [translation, setTranslation] = useState()
  useEffect(() => {
    if (!translation) {
      setTranslation(translatorText(option, { getString: true }))
    }
  })
  return (
    <option value={option._id || option}>
      {(isString(translation) && translation) ||
        (isString(option._id) && option._id) ||
        (isString(option) && option)}
    </option>
  )
}

const Select = props => {
  const { element } = props
  const options = element.options || []
  const hasEmptyOption = isArray(options)
    ? options.find(option => !option || !option._id || option._id === '~')
    : !options
  return (
    <GenericInput {...props}>
      {!hasEmptyOption ? (
        <option key={`${element.name}-option-default`} value={''}>
          {'–'}
        </option>
      ) : null}
      {options.map((option, index) => (
        <Option key={index} option={option} />
      ))}
    </GenericInput>
  )
}
export default Select

const SelectResult = ({
  element = {},
  initialModel: model = {},
  middleware = () => ({})
}) => {
  const { name, options = [] } = element
  return (
    <ol>
      {options.map((option, key) => {
        const isSelected = model[name] === (option._id || option)
        return (
          <li
            key={key}
            className={isSelected ? 'font-weight-bold text-primary' : ''}
            {...(middleware && middleware({ element, option, model }))}
          >
            {translatorText(option)}
          </li>
        )
      })}
    </ol>
  )
}
export { SelectResult as result }

export const config = ({ translator }) => {
  const { languages } = translator || {}
  if (languages) {
    const headerField = [
      {
        key: 'select.divider',
        type: 'divider',
        layout: { col: { xs: 12 } }
      },
      {
        key: 'select.infobox',
        type: 'infobox',
        label: {
          nl: '**Opties**',
          fr: '**Choix**',
          en: '**Options**'
        },
        layout: { col: { xs: 12 } }
      }
    ]
    const idField = [
      {
        key: 'select.options._id',
        name: 'options._id',
        type: 'textarea',
        label: 'ID (~value)',
        layout: {
          col: { xs: Math.max(3, Math.round(12 / (languages.length + 1))) }
        },
        attributes: {
          rows: 8,
          placeholders: {
            nl: 'Eén optie per lijn',
            fr: 'One item per line',
            en: 'One item per line'
          },
          style: { whiteSpace: 'nowrap' }
        },
        required: true
      }
    ]
    const languageFields = languages.map(language => ({
      key: 'select.options.' + language,
      name: 'options.' + language,
      type: 'textarea',
      label: upperCase(language),
      layout: {
        col: { xs: Math.max(3, Math.round(12 / (languages.length + 1))) }
      },
      attributes: {
        rows: 8,
        placeholders: {
          nl: 'Eén optie per lijn',
          fr: 'One item per line',
          en: 'One item per line'
        },
        style: { whiteSpace: 'nowrap' }
      },
      required: true
    }))
    return headerField.concat(idField.concat(languageFields))
  } else {
    return [
      {
        key: 'select.divider',
        type: 'divider',
        layout: { col: { xs: 12 } }
      },
      {
        key: 'select.options',
        name: 'options',
        type: 'textarea',
        label: {
          nl: 'Opties',
          fr: 'Choix',
          en: 'Options'
        },
        layout: {
          col: { xs: 12 }
        },
        attributes: {
          rows: 8,
          placeholders: {
            nl: 'Eén optie per lijn',
            fr: 'One item per line',
            en: 'One item per line'
          },
          style: { whiteSpace: 'nowrap' }
        },
        required: true
      }
    ]
  }
}

export const filter = d => ['placeholder'].includes(d)

export const icon = 'check'
