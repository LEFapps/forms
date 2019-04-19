import React from 'react'
import ReactDOM from 'react-dom'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap'

import { FormComposer } from '../../FormComposer'
import reformed from '../../reformed'
import decorators from '../../Decorators'
import components from '../../Components'
import { translatorText } from '../../helpers/translator'

class ActualForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      actionsPortal: false
    }
  }
  componentDidMount () {
    this.setState({
      actionsPortal: document.getElementById('form-actions')
    })
  }
  render () {
    const { element, modal, model, onCancel, onSave, translator } = this.props
    const body = document.getElementsByTagName('body')[0]
    const ReformedFormComposer = reformed()(FormComposer)
    const componentLib = components.clone()
    decorators.apply(componentLib)
    const modalForm = (
      <Modal isOpen={modal} toggle={onCancel}>
        <ModalHeader toggle={onCancel}>
          {translatorText(element.label, translator)}
        </ModalHeader>
        <ModalBody>
          <ReformedFormComposer
            library={componentLib}
            elements={element.elements}
            initialModel={model}
            onSubmit={onSave}
            portal={this.state.actionsPortal}
            translator={translator}
          >
            <Button color={'warning'} onClick={onCancel}>
              {translatorText(
                { nl: 'Annuleren', fr: 'Annuler', en: 'Cancel' },
                translator
              )}
            </Button>{' '}
            <Button color={'success'} type={'submit'}>
              {translatorText(
                { nl: 'Bewaren', fr: 'Sauvegarder', en: 'Save' },
                translator
              )}
            </Button>
          </ReformedFormComposer>
        </ModalBody>
        <ModalFooter id={'form-actions'} />
      </Modal>
    )
    return ReactDOM.createPortal(modalForm, body)
  }
}

export default ActualForm
