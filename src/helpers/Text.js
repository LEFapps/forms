import React from 'react'

class Text extends React.Component {
  _isMounted = false
  constructor (props) {
    super(props)
    this.state = {
      MarkdownIt: false
    }
  }
  componentDidMount () {
    this._isMounted = true
    import('markdown-it')
      .then(MarkdownIt =>
        this._isMounted
          ? this.setState({ MarkdownIt: MarkdownIt.default })
          : null
      )
      .catch(e => {
        this._isMounted ? this.setState({ MarkdownIt: 'error' }) : null
        console.warn(
          'If you encounter problems rendering this component, consider running "npm i markdown-it" in your cli.',
          e
        )
      })
  }
  componentWillUnmount () {
    this._isMounted = false
  }
  render () {
    const { MarkdownIt } = this.state
    const { content, className } = this.props
    if (!MarkdownIt) return null
    if (MarkdownIt === 'error') return <div>{content}</div>
    if (MarkdownIt) {
      const md = new MarkdownIt()
      return (
        <div
          className={'text ' + (className || '')}
          dangerouslySetInnerHTML={{ __html: md.render(content || '') }}
        />
      )
    }
  }
}

export default Text
