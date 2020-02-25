const range = 'azertyuiopqsdfghjklmwxcvbnAZERTYUIOPQSDFGHJKLMWXCVBN0123456789'

export default (length = 16) => {
  let result = ''
  for (let index = 0; index < length; index++) {
    result += range[Math.floor(Math.random() * range.length)]
  }
  return result
}
