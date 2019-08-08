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

import { GenericInputNoChildren } from './GenericInput'
import Md from '../helpers/Text'

const toolbar = [
  // {
  //   icon: 'heading',
  //   prepend: '### ',
  //   append: '',
  //   replace: false,
  //   inline: false,
  //   selectbefore: 4,
  //   selectAfter: 4
  // },
  {
    icon: 'bold',
    prepend: '**',
    append: '**',
    replace: false,
    inline: true,
    selectbefore: 2,
    selectAfter: 2
  },
  {
    icon: 'italic',
    prepend: '_',
    append: '_',
    replace: false,
    inline: true,
    selectbefore: 1,
    selectAfter: 1
  },
  {
    icon: 'strikethrough',
    prepend: '~~',
    append: '~~',
    replace: false,
    inline: true,
    selectbefore: 2,
    selectAfter: 2
  },
  {
    icon: 'link',
    prepend: '[',
    append: ']()',
    replace: false,
    inline: true,
    selectbefore: 0,
    selectAfter: 2
  }
]

class MarkDown extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      preview: false,
      id: `textarea-md-${Math.round(Math.random() * 8999999 + 1000000)}`
    }
  }
  applyTool (
    { prepend, append, replace, inline, selectbefore, selectAfter },
    { name, value, onChange }
  ) {
    const input = document.getElementById(this.state.id)
    if (!input) return false
    const pos = [input.selectionStart, input.selectionEnd]
    const newValue =
      value.slice(0, pos[0]) +
      prepend +
      (replace ? '' : value.slice(pos[0], pos[1])) +
      append +
      value.slice(pos[1])
    onChange({ target: { name, value: newValue } })
    input.focus()
    input.selectionStart = pos[1] + selectAfter
    input.selectionEnd = pos[1] + selectAfter
  }
  render () {
    const { preview, id } = this.state
    const { bindInput, element, attributes } = this.props
    const { name, type, attributes: elementAttributes } = element
    const model = bindInput(name) || {}
    return (
      <Card>
        <CardHeader className={'d-flex justify-content-between'}>
          <Button onClick={() => this.setState({ preview: !preview })}>
            <FontAwesomeIcon icon={preview ? 'pencil-alt' : 'eye'} />
          </Button>
          <ButtonGroup>
            {toolbar.map(({ icon, ...tool }, i) => (
              <Button key={i} onClick={() => this.applyTool(tool, model)}>
                <FontAwesomeIcon icon={icon} />
              </Button>
            ))}
          </ButtonGroup>
        </CardHeader>
        <CardBody className={'p-0'}>
          {preview ? (
            <Md content={model.value} className={'md-preview-content'} />
          ) : (
            <Input
              type={type}
              {...bindInput(name)}
              {...elementAttributes}
              {...attributes}
              id={id}
            />
          )}
        </CardBody>
      </Card>
    )
  }
}

export default MarkDown
