import React, { useState } from 'react'
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Collapse
} from 'reactstrap'

import { Mods, DragHandle } from './EditorHelpers'
import { ElementEditor } from './EditorCard~'

const ElementHeader = ({}) => {}

const getIcon = type => {
  switch (type) {
    case 'textarea':
    case 'markdown':
      return 'paragraph'
    case 'radio':
    case 'radio-collection':
    case 'select':
    case 'select-collection':
      return 'check'
    case 'checkbox':
    case 'checkbox-mc':
    case 'checkbox-mc-collection':
      return 'check-double'
    case 'text':
      return 'question'
    case 'subform':
      return 'tasks'
    case 'divider':
      return 'grip-lines'
    case 'editor':
      return 'sliders-h'
    case 'infobox':
      return 'info'
    default:
      return 'angle-right'
  }
}

const Element = ({ item, modifiers, sortIndex: index, canMove, ...props }) => {
  const [isOpen, setOpen] = useState(false)

  const mods = {
    update: model => modifiers('update', { index, model }),
    remove: () => modifiers('delete', { index }),
    moveUp: () => modifiers('move', { index, direction: -1 }),
    moveDown: () => modifiers('move', { index, direction: 1 }),
    duplicate: () => modifiers('duplicate', { index }),
    canMoveUp: () => canMove(-1),
    canMoveDown: () => canMove(1),
    canMove
  }

  return (
    <Card className={canMove(1) ? 'mb-1' : ''}>
      <CardHeader className={'d-flex align-items-center bg-dark text-light'}>
        <Button
          className={'mr-2'}
          size={'sm'}
          outline={!isOpen}
          onClick={() => setOpen(!isOpen)}
        >
          {item.type}
        </Button>{' '}
        <strong className={''}>{item.label || item.type}</strong>{' '}
        <Mods {...mods} style={{ zIndex: 20 }} className={'ml-auto'} />
      </CardHeader>
      <Collapse isOpen={isOpen}>
        <CardBody>
          <ElementEditor
            el={item}
            initialModel={item}
            setElementModel={console.log}
            {...props}
          />
        </CardBody>
      </Collapse>
    </Card>
  )
}

export default Element
