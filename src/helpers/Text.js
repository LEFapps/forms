import React from 'react'
import MarkdownIt from 'markdown-it'
import MarkdownItAttrs from 'markdown-it-attrs'
import MarkdownItVideo from 'markdown-it-video'
// import MarkdownItPicture from 'markdown-it-picture'
import MarkdownItFigures from 'markdown-it-figure-caption'

const md = MarkdownIt({
  html: true,
  linkify: true,
  typography: true
})
  .use(MarkdownItAttrs)
  .use(MarkdownItVideo)
  // .use(MarkdownItPicture)
  .use(MarkdownItFigures)

const Text = ({ content, className }) => (
  <div
    className={'text ' + (className || '')}
    dangerouslySetInnerHTML={{ __html: md.render(content || '') }}
  />
)

export default Text
