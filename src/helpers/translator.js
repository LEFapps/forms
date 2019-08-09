import React from 'react'
import { isString, get, head, map } from 'lodash'

const translatorText = (text, translator, getDefault, getString) => {
  if (!text) return ''
  if (isString(text)) return text

  const lang = getDefault
    ? get(translator, 'default', get(translator, 'currentLanguage', 'default'))
    : get(translator, 'currentLanguage', get(translator, 'default', 'default'))
  return (
    text[lang] ||
    text.default ||
    (translator.component && text.translate ? (
      <translator.component _id={text.translate} getString={getString} />
    ) : (
      false
    )) ||
    text.translate ||
    head(map(text))
  )
}

export { translatorText }
