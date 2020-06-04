import React from 'react'
import upperCase from 'lodash/upperCase'

import translatorText from '../helpers/translator'
import Text from '../helpers/Text'

const InfoBoxComponent = ({ element, attributes: propsAttributes }) => {
  const { attributes: elementAttributes } = element
  return (
    <div {...elementAttributes} {...propsAttributes}>
      <Text content={translatorText(element.label, { getString: true })} />
    </div>
  )
}
export default InfoBoxComponent

const InfoBoxComponentResult = InfoBoxComponent
export { InfoBoxComponentResult as result }

export const config = ({ translator, model }) => {
  const { languages } = translator || {}
  if (languages) {
    return languages.map(language => ({
      key: 'infobox.' + language,
      name: 'label.' + language,
      type: 'textarea',
      label: upperCase(language),
      layout: { col: { xs: 12 } },
      attributes: { rows: 4 }
    }))
  } else {
    return [
      {
        name: 'label',
        type: 'textarea',
        key: 'infobox',
        label: 'Text contents',
        attributes: { rows: 5 },
        layout: { col: { xs: 12 } }
      }
    ]
  }
}

export const filter = d =>
  ['attributes', 'formgroup', 'name', 'placeholder', 'validate'].includes(d)

export const icon = 'info'
