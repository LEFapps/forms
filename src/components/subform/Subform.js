import React from 'react'
import { get, castArray, clone, cloneDeep } from 'lodash'
import { Row, Col, Card, CardHeader, CardBody, Button } from 'reactstrap'

import ActualForm from './Modal'
import Items from './Items'
import { translatorText } from '../../helpers/translator'

class SubForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      currentIndex: -1,
      modalIsOpen: false,
      data: []
    }
    this.removeItem = this.removeItem.bind(this)
    this.saveItem = this.saveItem.bind(this)
    this.moveItem = this.moveItem.bind(this)
    this.duplicateItem = this.duplicateItem.bind(this)
    this.toggleForm = this.toggleForm.bind(this)
    this._openForm = this._openForm.bind(this)
    this._closeForm = this._closeForm.bind(this)
    this._getValue = this._getValue.bind(this)
    this._modifyModel = this._modifyModel.bind(this)
  }
  componentDidMount () {
    const { value } = this._getValue()
    this.setState({ data: value })
  }
  toggleForm (currentIndex) {
    this.setState({ currentIndex }, this._openForm())
  }
  _openForm () {
    this.setState({ modalIsOpen: true })
  }
  _closeForm () {
    this.setState({ modalIsOpen: false })
  }
  _getValue () {
    const { bindInput, element } = this.props
    const { name, value, onChange } = bindInput(element.name)
    const data = value ? cloneDeep(castArray(value)) : []
    return { name, value: data, onChange }
  }
  _modifyModel (action, { index, model, direction }) {
    const { name, value, onChange } = this._getValue()
    switch (
      action // CRUD naming + move + duplicate
    ) {
      case 'create':
        if (model === undefined) {
          console.warn('This action requires the options {model} to be set')
        }
        value.splice(value.length, 0, model)
        break
      case 'update':
        if (index < 0 || model === undefined) {
          console.warn(
            'This action requires the options {model, index} to be set'
          )
        }
        value.splice(index, 1, model)
        break
      case 'delete':
        if (index < 0) {
          console.warn('This action requires the options {index} to be set')
        }
        value.splice(index, 1)
        break
      case 'move':
        if (index < 0 || direction === undefined || model === undefined) {
          console.warn(
            'This action requires the options {index, direction, model} to be set'
          )
        }
        value.splice(index, 1)
        value.splice(index + direction, 0, model)
        break
      case 'duplicate':
        const newModel = value[index]
        if (index < 0 || newModel === undefined) {
          console.warn(
            'This action requires the options {index} to be set and a valid source'
          )
        }
        value.splice(1 + index, 0, newModel)
        break
    }
    this.setState({ data: value }, () => onChange({ target: { name, value } })) // onChange event
    return value
  }
  removeItem (index) {
    const { value } = this._getValue()
    const removeText = translatorText(
      {
        nl: `Bent u zeker dat u item ${1 + index} wil verwijderen?`,
        fr: `Supprimer item ${1 + index}?`,
        en: `Are you sure you want to remove item ${1 + index}?`
      },
      this.props.translator
    )
    const confirmed = confirm(removeText)
    if (value[index] && confirmed) this._modifyModel('delete', { index })
  }
  saveItem (model) {
    const { currentIndex } = this.state
    if (currentIndex >= 0) {
      this._modifyModel('update', { index: currentIndex, model })
    } else this._modifyModel('add', { model })
    this._closeForm()
  }
  duplicateItem (index) {
    this._modifyModel('duplicate', { index })
    this.toggleForm(1 + index)
  }
  moveItem (index, direction) {
    const value = clone(this._getValue().value[index])
    if (value) this._modifyModel('move', { index, direction, model: value })
  }
  render () {
    const { element, translator } = this.props
    const { data, currentIndex } = this.state
    const min = get(element, 'attributes.min', 0)
    const max = get(element, 'attributes.max', 0)
    return (
      <Card>
        <CardHeader className={'small'}>
          <Row>
            <Col>
              # <strong>{data.length}</strong>
            </Col>
            {min >= 0 ? (
              <Col>
                min <strong>{min}</strong>
              </Col>
            ) : null}
            {max > 0 ? (
              <Col>
                max <strong>{max}</strong>
              </Col>
            ) : null}
            <Col xs={2} className={'text-right'}>
              <Button
                color={'success'}
                size={'sm'}
                onClick={() => this.toggleForm(-1)}
                disabled={max && data.length >= max}
              >
                {translatorText(
                  { nl: 'Toevoegen', fr: 'Ajouter', en: 'Add' },
                  translator
                )}
              </Button>
            </Col>
          </Row>
        </CardHeader>
        <CardBody className={'small'}>
          <Items
            items={data}
            remove={data.length > min ? this.removeItem : false}
            edit={this.toggleForm}
            move={this.moveItem}
            duplicate={this.duplicateItem}
            element={element}
            translator={translator}
          />
        </CardBody>
        <ActualForm
          element={element}
          model={this._getValue().value[currentIndex]}
          modal={this.state.modalIsOpen}
          onCancel={this._closeForm}
          onSave={this.saveItem}
          translator={translator}
        />
      </Card>
    )
  }
}

SubForm.displayName = 'SubForm'

export default SubForm
