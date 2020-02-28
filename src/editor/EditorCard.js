import React, { useState } from 'react'
import { Button, Card, CardHeader, CardBody, Collapse } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import reformed from '../reformed'
import { FormComposer } from '../FormComposer'
import { Mods } from './EditorHelpers'

export const ElementEditor = props => {
  const Form = reformed()(FormComposer)
  const elements = props.library.get(props.type)
  return (
    <Form {...props} elements={(elements && elements.config()) || []}>
      <Button color={'success'} type={'submit'}>
        {props.buttonText}
      </Button>
    </Form>
  )
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

  const elements = props.library.get(item && item.type)
  const { icon = 'pen' } = elements || {}

  return (
    <Card>
      <CardHeader className={'d-flex align-items-center bg-dark text-light'}>
        <Button
          className={'mr-4'}
          size={'sm'}
          outline={!isOpen}
          onClick={() => setOpen(!isOpen)}
        >
          <FontAwesomeIcon icon={icon} />
        </Button>{' '}
        <strong onClick={() => setOpen(!isOpen)}>
          {item.name || item.type}
        </strong>{' '}
        <Mods
          {...mods}
          style={{ zIndex: 20, whiteSpace: 'nowrap' }}
          className={'ml-auto'}
        />
      </CardHeader>
      <Collapse isOpen={isOpen}>
        <CardBody>
          <ElementEditor
            type={item.type}
            initialModel={item}
            onSubmit={mods.update}
            {...props}
          />
        </CardBody>
      </Collapse>
    </Card>
  )
}

export default Element
