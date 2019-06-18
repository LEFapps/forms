import React from 'react'
import ReactDOM from 'react-dom'
import { Modal, ModalHeader, ModalBody, Button } from 'reactstrap'
import { isEmpty } from 'lodash'

import { FormComposer } from '../../FormComposer'
import reformed from '../../reformed'
import decorators from '../../Decorators'
import components from '../../Components'
import { translatorText } from '../../helpers/translator'

const ActualForm = ({
  element,
  modal,
  model,
  onCancel,
  onSave,
  translator
}) => {
  const body = document.getElementsByTagName('body')[0]
  const ReformedFormComposer = reformed()(FormComposer)
  const componentLib = components.clone()
  const size =
    element && element.attributes ? element.attributes.size || 'lg' : 'lg'
  decorators.apply(componentLib)
  const modalForm = (
    <Modal isOpen={modal} toggle={onCancel} size={size}>
      <ModalHeader toggle={onCancel}>
        {translatorText(element.label, translator)}
      </ModalHeader>
      <ModalBody>
        <ReformedFormComposer
          library={componentLib}
          elements={element.elements}
          initialModel={model}
          onSubmit={onSave}
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
              isEmpty(model)
                ? { nl: 'Toevoegen', fr: 'Ajouter', en: 'Add' }
                : { nl: 'Bijwerken', fr: 'Actualiser', en: 'Update' },
              translator
            )}
          </Button>
        </ReformedFormComposer>
      </ModalBody>
    </Modal>
  )
  return ReactDOM.createPortal(modalForm, body)
}

export default ActualForm
