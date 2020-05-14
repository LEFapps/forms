import React from 'react'
import {
  Input,
  Card,
  CardHeader,
  CardBody,
  Button,
  ButtonGroup
} from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import applyTool, { toolbar, toolbarGroups, hasTool } from './toolbar'
import Md from '../../helpers/Text'

class MarkDown extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      preview: false,
      id: `textarea-md-${Math.round(Math.random() * 8999999 + 1000000)}`,
      hasTools: []
    }
    this.timer = false
    this.checkTool = this.checkTool.bind(this)
  }
  checkTool ({ target }) {
    clearTimeout(this.timer)
    const cursor = [target.selectionStart, target.selectionEnd]
    this.props.setCursorPosition &&
      this.props.setCursorPosition(target.selectionEnd)
    this.timer = setTimeout(() => {
      const hasTools = toolbar
        .map(({ icon, prepend, append }) =>
          hasTool(target.value, cursor, { icon, prepend, append })
            ? icon
            : false
        )
        .filter(t => !!t)
      this.setState({ hasTools })
    }, 200)
  }
  applyTool (tool, { name, value, onChange }) {
    const input = document.getElementById(this.state.id)
    if (!input) return false
    const cursor = [input.selectionStart, input.selectionEnd]
    const newValue = applyTool(value, cursor, tool)
    onChange({ target: { name, value: newValue } }, () => {
      const newCursor = cursor[1] + newValue.length - value.length
      input.setSelectionRange(newCursor, newCursor)
      input.focus()
      this.checkTool({ target: input })
    })
  }
  render () {
    const { preview, id, hasTools } = this.state
    const { bindInput, element, attributes } = this.props
    const { name, type, attributes: elementAttributes } = element
    elementAttributes.rows = elementAttributes.rows || 16
    const model = bindInput(name) || {}
    return (
      <Card className={'md-editor'}>
        <CardHeader className={'d-flex md-editor__head'}>
          {toolbarGroups.map((group, j) => (
            <ButtonGroup key={j}>
              {group.map(({ icon, title, ...tool }, i) => (
                <Button
                  key={i}
                  onClick={() => this.applyTool(tool, model)}
                  active={hasTools.includes(icon)}
                  title={title}
                  disabled={preview}
                >
                  <FontAwesomeIcon icon={icon} />
                </Button>
              ))}
            </ButtonGroup>
          ))}
          <Button
            style={{ marginLeft: 'auto' }}
            className={'md-editor__toggle'}
            onClick={() => this.setState({ preview: !preview })}
          >
            <FontAwesomeIcon icon={preview ? 'pencil-alt' : 'eye'} />
          </Button>
        </CardHeader>
        <CardBody
          className={
            'md-editor__body p-0 md-editor__toggle-' +
            (preview ? 'preview' : 'editor')
          }
        >
          <Input
            type={type}
            {...bindInput(name)}
            {...elementAttributes}
            {...attributes}
            id={id}
            onKeyUp={this.checkTool}
            onMouseUp={this.checkTool}
            className={'md-editor__input'}
          />
          <Md content={model.value} className={'md-editor__preview p-4'} />
        </CardBody>
      </Card>
    )
  }
}

export default MarkDown
