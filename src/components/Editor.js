import React, { useContext, useState } from 'react'
import ReactDOM from 'react-dom'
import { Modal, ModalHeader, ModalBody, Button } from 'reactstrap'

import components from '../components'
import decorators from '../decorators'
import FormEditor from '../editor'
import translatorText, { translatorContext } from '../helpers/translator'

const EditorModal = props => {
  const translator = useContext(translatorContext)
  const { bindInput, element, el, isOpen, onCancel } = props
  const body = document.getElementsByTagName('body')[0]
  const componentLib = components.clone()
  decorators.apply(componentLib, { translator })
  const { onChange, value } = bindInput(element.name)
  const editorForm = (
    <Modal isOpen={isOpen} toggle={onCancel} size={'lg'}>
      <ModalHeader toggle={onCancel}>
        {translatorText(el ? el.label : element.label)}
      </ModalHeader>
      <ModalBody>
        <FormEditor
          onSubmit={model =>
            onChange({ target: { name: element.name, value: model } })
          }
          initialModel={value}
          library={componentLib}
          translator={translator}
        />
      </ModalBody>
    </Modal>
  )
  return ReactDOM.createPortal(editorForm, body)
}

const buttonText = {
  default: 'Configure',
  nl: 'Configureer formulier',
  fr: 'Configurer formulaire',
  en: 'Configure Form'
}

const Editor = props => {
  const [modal, setModal] = useState(false)
  return (
    <div>
      <Button onClick={() => setModal(true)} color={'info'}>
        {translatorText(buttonText)}
      </Button>
      <EditorModal
        key={props.element.name + 'Editor'}
        {...props}
        isOpen={modal}
        onCancel={() => setModal(false)}
      />
    </div>
  )
}

Editor.displayName = 'Input'
export default Editor
