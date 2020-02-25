import isArray from 'lodash/isArray'
import isString from 'lodash/isString'
import isPlainObject from 'lodash/isPlainObject'
import fromPairs from 'lodash/fromPairs'
import forEach from 'lodash/forEach'
import reduce from 'lodash/reduce'
import kebabCase from 'lodash/kebabCase'
import includes from 'lodash/includes'
import assign from 'lodash/assign'
import size from 'lodash/size'

/* Transformation of options
 * To make it easier to fill options (newlines in textarea),
 * these need to be transformed before saving or retrieving.
 */

export default (defaultOptions, translator, saving) => {
  const optionDelimiter = '\n'
  const optionId = value => '~' + kebabCase(value)
  const { languages, currentLanguage } = translator
  if (isString(defaultOptions) && saving) {
    if (languages) {
      /* 'nl\nnl2' => [{_id:'~nl',nl:'nl','en':'nl'},{_id:'~nl2',nl:'nl2','en':'nl2'}] */
      return defaultOptions
        .split(optionDelimiter)
        .map(option =>
          assign(
            { _id: optionId(option) },
            fromPairs(languages.map(l => [l, option]))
          )
        )
    } else {
      /* 'nl\nnl2' => [{_id:'~nl',default:'nl'},{_id:'~nl2',default:'nl2'}] */
      return defaultOptions.split(optionDelimiter).map(option => ({
        _id: optionId(option),
        [currentLanguage || 'default']: option
      }))
    }
  } else if (isPlainObject(defaultOptions) && saving) {
    /* {nl:'nl\nnl2',en:'en\nen2'} => [{_id:'~nl',nl:'nl',en:'en'},{_id:'~nl2',nl:'nl2',en:'en2'}] */
    const reducer = (result, options, lang) => {
      options.split(optionDelimiter).map((option, key) => {
        if (!result[key]) result[key] = {}
        result[key][lang] = lang === '_id' ? optionId(option) : option
      })
      return result
    }
    return reduce(defaultOptions, reducer, [])
  } else if (isArray(defaultOptions) && !saving) {
    /* [{_id:'~nl',nl:'nl',en:'en'},{_id:'~nl2',nl:'nl2',en:'en2'}] => {nl:'nl\nnl2',en:'en\nen2'} */
    const excludeKeys = ['default']
    const reducer = (result, option) => {
      forEach(option, (o, lang) => {
        if (!includes(excludeKeys, lang)) {
          if (result[lang]) result[lang] += '\n' + o
          else result[lang] = o
        }
      })
      if (size(option) && !size(result)) {
        result = translatorText(option)
      }
      return result
    }
    return defaultOptions.reduce(reducer, {})
  } else return defaultOptions
}
