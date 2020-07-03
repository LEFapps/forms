import React, { Fragment } from 'react'
import { Row, Col, Card, CardHeader, CardBody, Button } from 'reactstrap'
import get from 'lodash/get'
import castArray from 'lodash/castArray'
import clone from 'lodash/clone'
import cloneDeep from 'lodash/cloneDeep'

import ActualForm from './Modal'
import Items from './Items'
import translatorText from '../../helpers/translator'
import FormResults from '../../results'

export default class SubForm extends React.Component {
  constructor (props) {
    super(props)
    this.displayName = 'SubForm'
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
    // CRUD naming + move + duplicate
    switch (action) {
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
    const removeText = translatorText({
      nl: `Bent u zeker dat u item ${1 + index} wil verwijderen?`,
      fr: `Supprimer item ${1 + index}?`,
      en: `Are you sure you want to remove item ${1 + index}?`
    })
    const confirmed = confirm(removeText)
    if (value[index] && confirmed) this._modifyModel('delete', { index })
  }
  saveItem (model) {
    const { currentIndex } = this.state
    if (currentIndex >= 0) {
      this._modifyModel('update', { index: currentIndex, model })
    } else this._modifyModel('create', { model })
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
    const { element } = this.props
    const { data, currentIndex } = this.state
    const min = get(element, 'attributes.min', 0)
    const max = get(element, 'attributes.max', 0)
    const readOnly = get(element, 'attributes.disabled')
    const duplicates = get(element, 'attributes.duplicates', true)
    const move = get(element, 'attributes.move', true)
    const remove = get(element, 'attributes.remove', true)
    const edit = get(element, 'attributes.edit', true)
    return (
      <Card>
        <CardHeader>
          <Row>
            <Col xs={8} className={'small'}>
              <strong>{data.length}</strong>{' '}
              {data.length === 1 ? 'item' : 'items'}
              <br />
              {min > 0 ? (
                <>
                  min <strong>{min}</strong>
                </>
              ) : null}
              {min > 0 && max > 0 ? ' - ' : null}
              {max > 0 ? (
                <>
                  max <strong>{max}</strong>
                </>
              ) : null}
            </Col>
            <Col xs={4} className={'text-right'}>
              <Button
                color={'success'}
                size={'sm'}
                onClick={() => this.toggleForm(-1)}
                disabled={readOnly || (!!max && data.length >= max)}
              >
                {translatorText({ nl: 'Toevoegen', fr: 'Ajouter', en: 'Add' })}
              </Button>
            </Col>
          </Row>
        </CardHeader>
        <CardBody className={'small'}>
          <Items
            items={data}
            remove={
              !remove || readOnly || data.length <= min
                ? false
                : this.removeItem
            }
            edit={!edit ? false : this.toggleForm}
            move={!move || readOnly ? false : this.moveItem}
            duplicate={
              !duplicates || readOnly || (!!max && data.length >= max)
                ? false
                : this.duplicateItem
            }
            element={element}
          />
        </CardBody>
        <ActualForm
          element={element}
          model={this._getValue().value[currentIndex]}
          modal={this.state.modalIsOpen}
          onCancel={this._closeForm}
          onSave={this.saveItem}
          readOnly={readOnly}
        />
      </Card>
    )
  }
}

const SubFormResult = ({
  element: { name, elements = [] },
  initialModel: model = {},
  ...props
}) => {
  // TODO: render form.result()
  const values = model[name] || []
  return (
    <ol>
      {values.map((value, index) => {
        return (
          <li key={index} className='lefappsForms-results__answer-subform'>
            <FormResults {...props} elements={elements} initialModel={value} />
          </li>
        )
      })}
    </ol>
  )
}
export { SubFormResult as result }

export const config = ({ translator, model }) => [
  {
    key: 'subform.divider.1',
    type: 'divider',
    layout: { col: { xs: 12 } }
  },
  {
    key: 'subform.infobox.1',
    type: 'infobox',
    label: {
      nl: '**Items**',
      fr: '**Items**',
      en: '**Items**'
    },
    layout: { col: { xs: 12 } }
  },
  {
    key: 'subform.min',
    type: 'number',
    name: 'attributes.min',
    label: 'Min.',
    layout: { col: { xs: 6 } }
  },
  {
    key: 'subform.max',
    type: 'number',
    name: 'attributes.max',
    label: 'Max.',
    layout: { col: { xs: 6 } }
  },
  {
    key: 'subform.divider.2',
    type: 'divider',
    layout: { col: { xs: 12 } }
  },
  {
    key: 'subform.infobox.2',
    type: 'infobox',
    label: {
      nl: '**Componenten**',
      fr: '**Eléments du formulaire**',
      en: '**Form elements**'
    },
    layout: { col: { xs: 12 } }
  },
  {
    key: 'subform.elements',
    type: 'editor',
    name: 'elements'
  }
]

export const filter = d => ['placeholder'].includes(d)

export const icon = 'tasks'
