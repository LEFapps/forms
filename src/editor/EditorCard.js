import React, { useState, Component } from 'react'
import { Button, Card, CardHeader, CardBody, Collapse } from 'reactstrap'
import flow from 'lodash/flow'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import reformed from '../reformed'
import { FormComposer } from '../FormComposer'
import { Mods } from './EditorHelpers'

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

class ElementEditor extends Component {
  constructor (props) {
    super(props)
    // insert middleware into reformed
    // to intercept the setModel call
    // to push model state
    // up the hierarchy:
    this.middleware = modelHandler => {
      // modelHandler.setModel = flow([
      //   modelHandler.setModel,
      //   this.props.setElementModel
      // ])
      return modelHandler
    }
    this.ElementForm = reformed(this.middleware)(FormComposer)
  }
  render () {
    const elements = this.props.library.get(this.props.type)
    const Form = this.ElementForm
    return (
      <Form {...this.props} elements={(elements && elements.config()) || []}>
        <Button color={'success'} type={'submit'}>
          {this.props.buttonText}
        </Button>
      </Form>
    )
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
    <Card>
      <CardHeader className={'d-flex align-items-center bg-dark text-light'}>
        <Button
          className={'mr-4'}
          size={'sm'}
          outline={!isOpen}
          onClick={() => setOpen(!isOpen)}
        >
          {item.type}
          {/* <FontAwesomeIcon icon={getIcon(item.type)} /> */}
        </Button>{' '}
        <strong className={''}>{item.label || item.type}</strong>{' '}
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
