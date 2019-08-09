import React from 'react'
import { isString, get, head, map } from 'lodash'

const translatorText = (text, translator, getDefault, getString) => {
  if (!text) return ''
  if (isString(text)) return text
  if (translator.component && text.translate) {
    return <translator.component _id={text.translate} getString={getString} />
  }
  const lang = getDefault
    ? get(translator, 'default', get(translator, 'currentLanguage', 'default'))
    : get(translator, 'currentLanguage', get(translator, 'default', 'default'))
  return text[lang] || text.default || text.translate || head(map(text))
}

export { translatorText }
