import React, { createContext, useContext } from 'react'
import isString from 'lodash/isString'
import get from 'lodash/get'
import head from 'lodash/head'
import map from 'lodash/map'
import identity from 'lodash/identity'

export const translatorContext = createContext({
  languages: ['default'],
  currentLanguage: 'default',
  component: identity,
  getTranslation: identity,
  translations: []
})

export const translatorText = (text, options) => {
  const { translator: customTranslator, getDefault, getString } = options || {}
  const translator = customTranslator || useContext(translatorContext)
  const { component: Translate, getTranslation, translations } = translator

  if (!text) return ''
  if (isString(text)) return text

  const lang = getDefault
    ? get(translator, 'default', get(translator, 'currentLanguage', 'default'))
    : get(translator, 'currentLanguage', get(translator, 'default', 'default'))

  const def = text.default || text.translate

  if (text[lang]) return text[lang]
  if (text.translate) {
    if (getString) {
      if (getTranslation && translations) {
        getTranslation(
          { _id: text.translate },
          { language: lang, skipSettings: true }
        )
        return (
          (translations[text.translate] &&
            translations[text.translate][lang]) ||
          def
        )
      } else return def
    } else {
      if (Translate) {
        return <Translate _id={text.translate} getString={getString} />
      } else return def
    }
  } else if (text.default) return text.default
  return head(map(text))
}
