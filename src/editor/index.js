import React, { useState } from 'react'
import { Container } from 'reactstrap'
import { SortableContainer, SortableElement } from 'react-sortable-hoc'
import EditorCard from './EditorCard'
import Insert from './Insert'

const warn = (action = '', options = []) =>
  console.warn(
    `Action ${action} requires the options { ${options.join(', ')} } to be set.`
  )

const SortableItem = SortableElement(props => (
  <>
    <EditorCard {...props} />
    <Insert
      onElementSelection={model =>
        props.modifiers('create', { index: props.sortIndex + 1, model })
      }
      library={props.library}
    />
  </>
))

const SortableEditor = SortableContainer(
  ({ children, items, canMove, ...props }) => (
    <Container className={'lefappsForms-editor__container'}>
      <Insert
        onElementSelection={model =>
          props.modifiers('create', { index: 0, model })
        }
        library={props.library}
      />
      {items.map((item, index) => (
        <SortableItem
          {...props}
          item={item}
          sortIndex={index}
          key={index}
          index={index}
          canMove={dir => canMove(index, dir)}
        />
      ))}
    </Container>
  )
)

const FormEditor = ({ initialModel, onChange, sortable, ...props }) => {
  const [elements, setElements] = useState(initialModel || [])

  const _modifyModel = (action, { index, direction, model }) => {
    const items = [...elements]
    const source = index !== undefined ? { ...items[index] } : {}

    switch (action) {
      case 'create':
        if (model === undefined) return warn(action, ['model'])
        const i = index === undefined ? items.length : index
        items.splice(i, 0, model)
        break
      case 'update':
        if (index < 0 || model === undefined) {
          return warn(action, ['index', 'model'])
        }
        items.splice(index, 1, model)
        break
      case 'delete':
        if (index < 0) {
          return warn(action, ['index'])
        }
        items.splice(index, 1)
        break
      case 'move':
        if (index < 0 || direction === undefined) {
          return warn(action, ['index', 'direction'])
        }
        items.splice(index, 1)
        items.splice(index + direction, 0, source)
        break
      case 'duplicate':
        if (index < 0) return warn(action, ['index'])
        items.splice(index + 1, 0, source)
        break
    }

    setElements(items)
    if (onChange) onChange(items)

    return items
  }

  const canMove = (index, dir) => {
    if (!sortable) return false
    if (elements.length <= 1) return false
    if (dir !== undefined) {
      if (dir < 0) return index > 0
      if (dir > 0) return index < elements.length - 1
    }
    return true
  }

  const changeOrder = ({ oldIndex, newIndex }) =>
    _modifyModel('move', {
      index: oldIndex,
      direction: newIndex - oldIndex
    })

  return (
    <SortableEditor
      {...props}
      items={elements}
      onSortEnd={changeOrder}
      modifiers={_modifyModel}
      canMove={canMove}
      axis={'y'}
      lockAxis={'y'}
      transitionDuration={300}
      useDragHandle
      lockToContainerEdges
    />
  )
}

export default FormEditor
