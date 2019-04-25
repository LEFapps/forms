import React from 'react'
import MarkdownIt from 'markdown-it'
import MarkdownItAttrs from 'markdown-it-attrs'
import MarkdownItVideo from 'markdown-it-video'

const markdown = MarkdownIt({
  html: true,
  linkify: true,
  typography: true
})
  .use(MarkdownItAttrs)
  .use(MarkdownItVideo)

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
