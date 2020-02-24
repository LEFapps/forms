import React from 'react'
import { Card, CardHeader, CardBody, CardFooter } from 'reactstrap'

import { Mods, DragHandle } from './EditorHelpers'
import { ElementEditor } from './EditorCard~'

const ElementHeader = ({}) => {}

const Element = ({ item, modifiers, sortIndex: index, canMove, ...props }) => {
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
  console.log(props)
  return (
    <Card>
      <CardHeader>
        {item.label || item.type}
        <Mods {...mods} />
      </CardHeader>
      <CardBody>
        <ElementEditor
          el={item}
          initialModel={item}
          setElementModel={console.log}
          {...props}
        />
      </CardBody>
    </Card>
  )
}

export default Element
