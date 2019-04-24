import React from 'react'
import { FormFeedback, FormText } from 'reactstrap'
import { get, includes, upperCase } from 'lodash'
import { translatorText } from '../helpers/translator'

const Validate = WrappedComponent => props => {
  const { description, invalid } = props.element.schema || {}
  let { attributes, ...xProps } = props
  const feedback = { description, component: FormText }
  if (get(props.errors, props.element.name)) {
    attributes = attributes || {}
    attributes.invalid = true
    feedback.component = FormFeedback
    if (invalid) feedback.description = invalid
  }
  return (
    <>
      <WrappedComponent {...xProps} attributes={attributes} />
      {feedback ? (
        <feedback.component>
          {translatorText(feedback.description, props.translator)}
        </feedback.component>
      ) : null}
    </>
  )
}

const config = ({ translator, model }) =>
  [
    {
      key: 'validate.divider',
      type: 'divider',
      layout: { col: { xs: 12 } }
    },
    {
      key: 'validate.infobox',
      type: 'infobox',
      label: {
        en: '**Validation**',
        nl: '**Validatie**'
      },
      layout: { col: { xs: 12 } }
    },
    {
      key: 'validate.required',
      name: 'required',
      type: 'checkbox',
      label: {
        en: 'Field is required',
        nl: 'Verplicht veld',
        translate: 'fieldIsRequired'
      },
      layout: { col: { xs: 12 } }
    }
  ]
    .concat(
      get(translator, 'languages', []).map((lang, i, languages) => ({
        key: 'validate.invalid.' + lang,
        name: 'schema.invalid.' + lang,
        type: 'text',
        label: upperCase(lang),
        layout: {
          col: {
            xs: 12,
            sm: Math.max(6, 12 / languages.length),
            md: Math.max(4, 12 / languages.length)
          }
        },
        attributes: {
          placeholders: {
            nl: 'Uitleg waarom ongeldig',
            fr: 'Explanation d’invalidité',
            en: 'Explain why invalid'
          }
        }
      }))
    )
    .concat(
      get(translator, 'languages', []).map((lang, i, languages) => ({
        key: 'validate.description.' + lang,
        name: 'schema.description.' + lang,
        type: 'text',
        label: upperCase(lang),
        layout: {
          col: {
            xs: 12,
            sm: Math.max(6, 12 / languages.length),
            md: Math.max(4, 12 / languages.length)
          }
        },
        attributes: {
          placeholders: {
            nl: 'Hulp bij validatie',
            fr: 'Aide de validation',
            en: 'Validation help'
          }
        }
      }))
    )

const filter = key => !includes(['divider', 'infobox'], key)

export default Validate
export { config, filter }
