import React from 'react'
import MarkdownIt from 'markdown-it'
import MarkdownItAttrs from 'markdown-it-attrs'
import MarkdownItVideo from 'markdown-it-video'

const md = MarkdownIt({
  html: true,
  linkify: true,
  typography: true
})
  .use(MarkdownItAttrs)
  .use(MarkdownItVideo)

const Text = ({ content, className, tagName }) => {
  const Tag = tagName || 'div'
  return (
    <Tag
      className={'text ' + (className || '')}
      dangerouslySetInnerHTML={{ __html: md.render(content || '') }}
    />
  )
}

export default Text
