import React from 'react'
import { get, castArray } from 'lodash'
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
    this.toggleForm = this.toggleForm.bind(this)
    this._openForm = this._openForm.bind(this)
    this._closeForm = this._closeForm.bind(this)
    this._getValue = this._getValue.bind(this)
    this._modifyModel = this._modifyModel.bind(this)
  }
  componentWillMount () {
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
    const data = value ? castArray(value) : []
    return { name, value: data, onChange }
  }
  _modifyModel (index = 0, model) {
    const { name, value, onChange } = this._getValue()
    const isNew = index < 0
    const i = isNew ? value.length : index
    model
      ? value.splice(i, isNew ? 0 : 1, model)
      : value.splice(i, isNew ? 0 : 1)
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
    if (value[index] && confirmed) this._modifyModel(index)
  }
  saveItem (submodel) {
    const { currentIndex } = this.state
    this._modifyModel(currentIndex, submodel)
    this._closeForm()
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
            <Col xs={1}>
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
            remove={this.removeItem}
            edit={this.toggleForm}
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
