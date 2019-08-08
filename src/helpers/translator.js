import React from 'react'
import { isString, get, head, map } from 'lodash'

const translatorText = (text, translator, getDefault, getString) => {
  if (text) {
    if (isString(text)) return text
    const lang = getDefault
      ? get(
        translator,
        'default',
        get(translator, 'currentLanguage', 'default')
      )
      : get(
        translator,
        'currentLanguage',
        get(translator, 'default', 'default')
      )
    return (
      text[lang] ||
      text.default ||
      (translator.component ? (
        <translator.component _id={text.translate} getString={getString} />
      ) : (
        false
      )) ||
      head(map(text))
    )
  } else return ''
}

export { translatorText }
