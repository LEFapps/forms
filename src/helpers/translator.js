import React from 'react'
import { isString, get, head, map } from 'lodash'
import { Translate } from '@lefapps/translations'

const translation = ({ translate }) =>
  translate ? <Translate _id={translate} /> : null

const translatorText = (text, translator, getDefault, getString) => {
  if (text) {
    if (isString(text)) return text
    const lang = getDefault
      ? get(translator, 'default', 'currentLanguage')
      : get(translator, 'currentLanguage', 'default')
    return (
      text[lang] ||
      text.default ||
      (getString ? false : translation(text)) ||
      head(map(text))
    )
  } else return ''
}

export { translatorText }
