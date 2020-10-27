import React, { createContext, useContext } from 'react'
import { renderToString } from 'react-dom/server'
import isString from 'lodash/isString'
import isNumber from 'lodash/isNumber'
import has from 'lodash/has'
import get from 'lodash/get'
import head from 'lodash/head'
import map from 'lodash/map'
import identity from 'lodash/identity'

export const translatorContext = createContext({
  languages: ['default'],
  currentLanguage: 'default',
  component: ({ _id }) => _id,
  getTranslation: identity,
  translations: []
})

const Translated = ({
  text,
  options: { translator: customTranslator, getDefault }
}) => {
  const contextTranslator = useContext(translatorContext)
  const translator = customTranslator || contextTranslator
  const { component: Translate } = translator || {}

  if (!text) return ''
  if (isString(text) || isNumber(text)) return text

  const lang = getDefault
    ? get(translator, 'default', get(translator, 'currentLanguage', 'default'))
    : get(translator, 'currentLanguage', get(translator, 'default', 'default'))

  const def = text.default || text.translate || text._id

  if (text[lang]) return text[lang]
  if (text.translate) {
    if (Translate) {
      return <Translate _id={text.translate} />
    } else return def
  } else if (text.default) return text.default
  else if (has(text, '_id')) return text._id
  return head(map(text))
}

export default (text = '', options = {}) => {
  const { getString } = options
  const t = <Translated text={text} options={options} />
  if (getString) return renderToString(t)
  return t
}
