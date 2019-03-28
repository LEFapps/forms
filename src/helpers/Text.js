import React from 'react'
import MarkdownIt from 'markdown-it'

const Text = ({ content, className }) => {
  const md = new MarkdownIt()
  return (
    <div
      className={'text ' + (className || '')}
      dangerouslySetInnerHTML={{ __html: md.render(content || '') }}
    />
  )
}

export default Text
