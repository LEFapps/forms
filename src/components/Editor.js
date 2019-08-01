import React from 'react'
import ReactDOM from 'react-dom'
import { FormEditor } from '../FormEditor'
import components from '../Components'
import decorators from '../Decorators'
import { Modal, ModalHeader, ModalBody, Button } from 'reactstrap'
import { translatorText } from '../helpers/translator'

const EditorModal = props => {
  const { bindInput, element, el, translator, modal, onCancel } = props
  const body = document.getElementsByTagName('body')[0]
  const componentLib = components.clone()
  decorators.apply(componentLib, { translator })
  const { onChange, value } = bindInput(element.name)
  const editorForm = (
    <Modal isOpen={modal} toggle={onCancel} size={'lg'}>
      <ModalHeader toggle={onCancel}>
        {translatorText(el ? el.label : element.label, translator)}
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

class Editor extends React.Component {
  constructor (props) {
    super(props)
    this.state = { modal: false }
  }
  render () {
    const buttonText = {
      default: 'Configure',
      nl: 'Configureer formulier',
      fr: 'Configurer formulaire',
      en: 'Configure Form'
    }
    return (
      <div>
        <Button onClick={() => this.setState({ modal: true })} color={'info'}>
          {translatorText(buttonText, this.props.translator)}
        </Button>
        <EditorModal
          key={this.props.element.name + 'Editor'}
          {...this.props}
          {...this.state}
          onCancel={() => this.setState({ modal: false })}
        />
      </div>
    )
  }
}

Editor.displayName = 'Input'

export default Editor
