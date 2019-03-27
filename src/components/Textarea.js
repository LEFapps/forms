import React from 'react'
import { GenericInputNoChildren } from './GenericInput'
import { get } from 'lodash'

class Textarea extends React.Component {
  _isMounted = false
  constructor (props) {
    super(props)
    this.loadMd = this.loadMd.bind(this)
    this.loadMdImage = this.loadMdImage.bind(this)
  }
  componentDidMount () {
    this._isMounted = true
  }
  componentWillUnmount () {
    this._isMounted = false
  }
  loadMd (module) {
    import(module).then(({ MarkdownHelp }) =>
      this._isMounted ? this.setState({ MarkdownHelp }) : null
    )
  }
  loadMdImage (module) {
    import(module).then(({ MarkdownImageUpload }) =>
      this._isMounted ? this.setState({ MarkdownImageUpload }) : null
    )
  }
  render () {
    const onUrl = url => {
      this.props.setProperty(
        this.props.element.name,
        `${get(this.props.model, this.props.element.name)}\n${url}`
      )
    }
    return (
      <>
        <GenericInputNoChildren {...this.props} />
        {this.props.element.md ? (
          <>
            {!this.state.MarkdownHelp ? (
              this.loadMd('meteor/lef:translations')
            ) : (
              <MarkdownHelp />
            )}
            {!this.state.MarkdownImageUpload ? (
              this.loadMdImage('meteor/lef:imgupload')
            ) : (
              <MarkdownImageUpload onSubmit={onUrl} />
            )}
          </>
        ) : null}
      </>
    )
  }
}

const config = ({ translator, model }) => [
  {
    key: 'textarea.divider',
    type: 'divider',
    layout: { col: { xs: 12 } }
  },
  {
    key: 'textarea.rows',
    name: 'attributes.rows',
    type: 'text',
    label: 'Size',
    attributes: {
      placeholders: {
        nl: 'Aantal lijnen, bv. 5',
        fr: 'Combien de lignes, ex. 5',
        en: 'Number of lines, e.g. 5'
      }
    },
    layout: { col: { xs: 6, md: 4 } }
  }
]

export default Textarea
export { config }
