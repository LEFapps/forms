import React, { useState } from 'react'
import { Button, ButtonGroup, Modal, ModalBody, ModalFooter } from 'reactstrap'
import { sortableHandle } from 'react-sortable-hoc'
import translatorText from '../helpers/translator'

export const DragHandle = sortableHandle(({ color }) => (
  <div className={`btn btn-outline-${color || 'light'}`} title={'Move Element'}>
    ☰
  </div>
))

export const Mods = ({
  remove,
  duplicate,
  moveUp,
  moveDown,
  canMoveUp,
  canMoveDown,
  children,
  ...props
}) => {
  const [isDeleting, setDeleting] = useState(false)
  const { canMove, update, ...attrs } = props || {}
  return (
    <div {...attrs}>
      <ButtonGroup>
        {children}
        <Button
          outline
          color={'info'}
          title={'Move Element Up'}
          onClick={() => moveUp()}
          disabled={!canMoveUp()}
        >
          △
        </Button>
        <DragHandle color={'info'} />
        <Button
          outline
          color={'info'}
          title={'Move Element Down'}
          onClick={() => moveDown()}
          disabled={!canMoveDown()}
        >
          ▽
        </Button>
      </ButtonGroup>{' '}
      <Button
        outline
        color={'warning'}
        title={'Duplicate Element'}
        onClick={() => duplicate()}
      >
        ⧉
      </Button>{' '}
      <Button
        outline
        color={'danger'}
        title={'Remove Element'}
        onClick={() => setDeleting(true)}
      >
        ✕
      </Button>
      {/* {' '}<Button
        outline
        color={'success'}
        title={'Save Element'}
        onClick={() => save()}
      >
        ✕
      </Button> */}
      <CofirmModal
        isOpen={isDeleting}
        setOpen={setDeleting}
        color={'danger'}
        callback={() => {
          setDeleting(false)
          remove && remove()
        }}
        cancelText={'confirm_remove_keep'}
        confirmText={'confirm_remove_delete'}
        // cancelText={{ translate: 'confirm_remove_keep' }}
        // confirmText={{ translate: 'confirm_remove_delete' }}
      >
        {translatorText({ translate: 'confirm_remove' })}
      </CofirmModal>
    </div>
  )
}

export const CofirmModal = ({
  isOpen,
  setOpen,
  children,
  callback,
  cancelText,
  confirmText,
  color
}) => {
  return (
    <Modal isOpen={isOpen}>
      <ModalBody>{children}</ModalBody>
      <ModalFooter>
        <Button color={'warning'} onClick={() => setOpen(false)}>
          {cancelText || translatorText({ translate: 'cancel' })}
        </Button>
        <Button
          color={color || 'success'}
          onClick={() => {
            setOpen(false)
            callback && callback()
          }}
        >
          {confirmText || translatorText({ translate: 'confirm' })}
        </Button>
      </ModalFooter>
    </Modal>
  )
}
