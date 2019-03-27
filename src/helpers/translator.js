import React from 'react'
import { isString, get, head, map } from 'lodash'

const translation = ({ translate }) => {
  if (translate) {
    import('meteor/lef:translations')
      .then(({ Translate }) => <Translate _id={translate} />)
      .catch(e => console.warn(e))
  }
}

const translatorText = (text, translator, getDefault) => {
  if (text) {
    if (isString(text)) return text
    const lang = getDefault
      ? get(translator, 'default', 'currentLanguage')
      : get(translator, 'currentLanguage', 'default')
    return text[lang] || text.default || translation(text) || head(map(text))
  } else return ''
}

export { translatorText }
