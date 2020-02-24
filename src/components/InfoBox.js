import React from 'react'
import { translatorText } from '../helpers/translator'
import Text from '../helpers/Text'

import { upperCase } from 'lodash'

const InfoBoxComponent = ({
  bindInput,
  element,
  attributes: propsAttributes
}) => {
  const { attributes: elementAttributes } = element
  return (
    <div {...elementAttributes} {...propsAttributes}>
      <Text content={translatorText(element.label)} />
    </div>
  )
}

const config = ({ translator, model }) => {
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

export default InfoBoxComponent
export { config }
