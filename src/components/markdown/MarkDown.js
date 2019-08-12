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

import { GenericInputNoChildren } from '../GenericInput'
import applyTool, { toolbar, hasTool } from './toolbar'
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
    onChange({ target: { name, value: newValue } })
    input.focus()
    input.selectionStart = cursor[1] + tool.selectAfter
    input.selectionEnd = cursor[1] + tool.selectAfter
  }
  render () {
    const { preview, id, hasTools } = this.state
    const { bindInput, element, attributes } = this.props
    const { name, type, attributes: elementAttributes } = element
    elementAttributes.rows = elementAttributes.rows || 16
    const model = bindInput(name) || {}
    return (
      <Card>
        <CardHeader className={'d-flex'}>
          <ButtonGroup>
            {toolbar.map(({ icon, title, ...tool }, i) => (
              <Button
                key={i}
                onClick={() => this.applyTool(tool, model)}
                active={hasTools.includes(icon)}
                title={title}
              >
                <FontAwesomeIcon icon={icon} />
              </Button>
            ))}
          </ButtonGroup>
          <Button
            style={{ marginLeft: 'auto' }}
            onClick={() => this.setState({ preview: !preview })}
          >
            <FontAwesomeIcon icon={preview ? 'pencil-alt' : 'eye'} />
          </Button>
        </CardHeader>
        {preview ? (
          <CardBody className={'p-4'}>
            <Md content={model.value} className={'md-preview-content'} />
          </CardBody>
        ) : (
          <CardBody className={'p-0'}>
            <Input
              type={type}
              {...bindInput(name)}
              {...elementAttributes}
              {...attributes}
              id={id}
              onKeyUp={this.checkTool}
              onMouseUp={this.checkTool}
            />
          </CardBody>
        )}
      </Card>
    )
  }
}

export default MarkDown
