import React from 'react'
import { FormGroup, Label } from 'reactstrap'
import { includes, union, flip, upperCase } from 'lodash'
import { translatorText } from '../helpers/translator'

const FormGroupDecorator = WrappedComponent => props => {
  const { element } = props
  const { label = '', required, name, type } = element || {}
  const req = r =>
    r ? (
      <strong className={'text-primary label-required'}>&nbsp;*</strong>
    ) : null
  const labelText =
    type === 'checkbox' ? (
      <>&nbsp;</>
    ) : (
      <>
        {translatorText(label) || element.type}
        {req(required)}
      </>
    )
  return (
    <FormGroup>
      {label ? <Label for={name}>{labelText}</Label> : null}
      <WrappedComponent {...props} />
    </FormGroup>
  )
}

const config = ({ translator, model }) => {
  const { languages } = translator || {}
  if (languages) {
    const headerField = [
      {
        key: 'label.divider',
        type: 'divider',
        layout: { col: { xs: 12 } }
      },
      {
        key: 'label.infobox',
        type: 'infobox',
        label: '**Labels**',
        layout: { col: { xs: 12 } }
      }
    ]
    const languageFields = languages.map(language => ({
      key: 'label.' + language,
      name: 'label.' + language,
      type: 'text',
      label: upperCase(language),
      layout: {
        col: { xs: Math.max(3, Math.round(12 / languages.length)) }
      }
    }))
    return headerField.concat(languageFields)
  } else {
    return [
      {
        key: 'label.divider',
        type: 'divider',
        layout: { col: { xs: 12 } }
      },
      {
        key: 'label',
        name: 'label.default',
        type: 'text',
        label: 'Label',
        layout: {
          col: { xs: 12 }
        }
      }
    ]
  }
}

// Configuration of label is put in front
const combine = flip(union)

const filter = key => !includes(['divider', 'infobox'], key)

export default FormGroupDecorator
export { config, filter, combine }
