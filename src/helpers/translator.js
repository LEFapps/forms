import React from 'react'
import { isString, get, head, map } from 'lodash'

const translatorText = (text, translator, getDefault, getString) => {
  if (!text) return ''
  if (isString(text)) return text

  const { component: Translate, getTranslation, translations } = translator
  const lang = getDefault
    ? get(translator, 'default', get(translator, 'currentLanguage', 'default'))
    : get(translator, 'currentLanguage', get(translator, 'default', 'default'))

  if (text[lang]) return text[lang]
  if (text.translate) {
    if (getString) {
      if (getTranslation && translations) {
        getTranslation(
          { _id: text.translate },
          { language: lang, skipSettings: true }
        )
        return (
          translations[text.translate] && translations[text.translate][lang]
        )
      } else return text.default || text.translate
    } else {
      if (Translate) {
        return <Translate _id={text.translate} getString={getString} />
      } else return text.default || text.translate
    }
  } else if (text.default) return text.default
  return head(map(text))
}

export { translatorText }
