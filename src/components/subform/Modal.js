import React from 'react'
import ReactDOM from 'react-dom'
import { Modal, ModalHeader, ModalBody, Button } from 'reactstrap'
import { isEmpty } from 'lodash'

import { FormComposer } from '../../FormComposer'
import reformed from '../../reformed'
import decorators from '../../decorators'
import components from '../../components'
import translatorText from '../../helpers/translator'

const ActualForm = ({ element, modal, model, onCancel, onSave, readOnly }) => {
  const body = document.getElementsByTagName('body')[0]
  const ReformedFormComposer = reformed()(FormComposer)
  const componentLib = components.clone()
  const size =
    element && element.attributes ? element.attributes.size || 'lg' : 'lg'
  decorators.apply(componentLib)
  const modalForm = (
    <Modal isOpen={modal} toggle={onCancel} size={size}>
      <ModalHeader toggle={onCancel}>
        {translatorText(element.label)}
      </ModalHeader>
      <ModalBody>
        <ReformedFormComposer
          library={componentLib}
          elements={element.elements}
          initialModel={model}
          onSubmit={onSave}
          readOnly={readOnly}
        >
          {readOnly ? null : (
            <>
              <Button color={'warning'} onClick={onCancel}>
                {translatorText({
                  nl: 'Annuleren',
                  fr: 'Annuler',
                  en: 'Cancel'
                })}
              </Button>{' '}
              <Button color={'success'} type={'submit'}>
                {translatorText(
                  isEmpty(model)
                    ? { nl: 'Toevoegen', fr: 'Ajouter', en: 'Add' }
                    : { nl: 'Bijwerken', fr: 'Actualiser', en: 'Update' }
                )}
              </Button>
            </>
          )}
        </ReformedFormComposer>
      </ModalBody>
    </Modal>
  )
  return ReactDOM.createPortal(modalForm, body)
}

export default ActualForm
