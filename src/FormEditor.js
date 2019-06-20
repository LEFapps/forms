import React, { Component } from 'react'
import random from './helpers/random'
import { FormComposer } from './FormComposer'
import reformed from './reformed'
import EditorCard from './editor/EditorCard'
import { translatorText } from './helpers/translator'
import {
  Container,
  Row,
  Col,
  Button,
  ButtonGroup,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap'
import { capitalize, cloneDeep, size } from 'lodash'

const transformElements = (elements, library, saving = true) =>
  elements.map(element => {
    const el = cloneDeep(element)
    const { type } = el
    if (library.has(type)) {
      const { transformer } = library.get(type)
      return transformer ? transformer(el, saving) : el
    } else return el
  })

class FormEditor extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showPreview: true,
      elements: this.props.initialModel
        ? transformElements(this.props.initialModel, props.library, false)
        : []
    }
    this.setElement = this.setElement.bind(this)
    this.save = this.save.bind(this)
    this.addElement = this.addElement.bind(this)
    this.removeElement = this.removeElement.bind(this)
    this.moveElement = this.moveElement.bind(this)
    this.duplicateElement = this.duplicateElement.bind(this)
    this.showPreview = this.showPreview.bind(this)
    this.showPreview = this.showPreview.bind(this)
  }
  setElement (index, element) {
    this.setState(prevstate => {
      prevstate.elements[index] = transformElements(
        [element],
        this.props.library,
        false
      )[0]
      return { elements: prevstate.elements }
    })
    this.showPreview(false)
    return element
  }
  save () {
    const { library } = this.props
    const { elements } = this.state
    this.props.onSubmit(transformElements(elements, library))
  }
  addElement (type) {
    this.setState(prevstate => {
      prevstate.elements.push({ type, key: random() })
      return {
        elements: prevstate.elements
      }
    })
    this.showPreview(false)
  }
  duplicateElement (element) {
    this.setState(prevstate => {
      const index = prevstate.elements.indexOf(element)
      const duplicate = cloneDeep(prevstate.elements[index])
      if (duplicate) {
        if (duplicate.name) duplicate.name += '_copy'
        if (duplicate.label) duplicate.label += ' (copy)'
        if (duplicate.key) duplicate.key = random()
        prevstate.elements.splice(index + 1, 0, duplicate)
        return { elements: prevstate.elements }
      } else {
        console.error(`Element not found (${element.name}, ${index}).`)
        return { elements: prevstate.elements }
      }
    })
    this.showPreview(false)
  }
  moveElement (element, direction) {
    this.setState(prevstate => {
      const index = prevstate.elements.indexOf(element)
      prevstate.elements.splice(index, 1)
      prevstate.elements.splice(index + direction, 0, element)
      return { elements: prevstate.elements }
    })
    this.showPreview(false)
  }
  moveElementUp (element) {
    this.moveElement(element, -1)
  }
  moveElementDown (element) {
    this.moveElement(element, 1)
  }
  removeElement (element) {
    const confirmText = translatorText(
      {
        nl: `Bent u zeker dat u deze component wil verwijderen? (${(element.name ||
          'Leeg') +
          ', ' +
          element.type})`,
        fr: `Are you sure you want to remove this element? (${element.name ||
          'empty' + ', ' + element.type})`,
        default: `Are you sure you want to remove this element? (${element.name ||
          'empty' + ', ' + element.type})`
      },
      this.props.translator,
      false,
      true
    )
    if (confirm(confirmText)) {
      this.setState(prevstate => {
        const index = this.state.elements.indexOf(element)
        if (index >= 0) {
          prevstate.elements.splice(index, 1)
          return {
            elements: prevstate.elements
          }
        } else console.error(`Element not found (${element.name}, ${index}).`)
      })
      this.showPreview(false)
    }
  }
  showPreview (show = true) {
    this.setState({ showPreview: show })
  }
  render () {
    const { library } = this.props
    const { previewLibrary = library } = this.props
    const ReformedFormComposer = reformed()(FormComposer)
    const totalElements = this.state.elements.length
    const canMove = (index, dir) =>
      dir < 0 ? index > 0 : index < totalElements - 1
    return (
      <Container>
        <ButtonMenu library={library} addElement={this.addElement} />
        {this.state.elements.map((element, index) => {
          if (library.has(element.type)) {
            const elements = library.get(element.type).config()
            const setElementModel = el => {
              this.setElement(index, el)
              return el
            }
            return (
              <EditorCard
                library={library}
                index={index}
                canMove={canMove}
                element={element}
                elements={elements}
                setElementModel={setElementModel}
                onRemove={this.removeElement}
                onDuplicate={this.duplicateElement}
                onMoveElement={this.moveElement}
                key={`element-${element.key || index}`}
                translator={this.props.translator}
              />
            )
          } else return null
        })}
        <Row>
          <Col md={12}>
            <Button color={'success'} onClick={this.save}>
              {translatorText(
                { nl: 'Bewaren', fr: 'Sauvegarder', default: 'Save' },
                this.props.translator
              )}
            </Button>
          </Col>
        </Row>
        {size(this.state.elements) ? (
          <>
            <hr />
            <Row>
              <Col xs={12}>
                <h3>
                  {translatorText(
                    { nl: 'Voorbeeld', fr: 'Exemple', default: 'Preview' },
                    this.props.translator
                  )}
                </h3>
                {this.state.showPreview ? (
                  <ReformedFormComposer
                    library={previewLibrary}
                    elements={transformElements(
                      this.state.elements,
                      this.props.library
                    )}
                    translator={this.props.translator}
                  />
                ) : (
                  <>
                    <p>
                      {translatorText(
                        {
                          nl:
                            'De configuratie van het formulier is gewijzigd. Klik op onderstaande knop een voorbeeld te laden.',
                          fr:
                            'Le configuration du formulaire a été modifié. Cliquez le bouton ci-dessous pour charger une exemple.',
                          default:
                            'The form has changed. Click the button below to load preview again.'
                        },
                        this.props.translator
                      )}
                    </p>
                    <Button color={'info'} onClick={this.showPreview}>
                      {translatorText(
                        {
                          nl: 'Toon voorbeeld',
                          fr: 'Montrer une exemple',
                          default: 'Show preview'
                        },
                        this.props.translator
                      )}
                    </Button>
                  </>
                )}
              </Col>
            </Row>
          </>
        ) : null}
      </Container>
    )
  }
}

class ButtonMenu extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isOpen: false
    }
    this.toggle = this.toggle.bind(this)
  }
  toggle () {
    this.setState(prevstate => ({ isOpen: !prevstate.isOpen }))
  }
  render () {
    const { library, addElement } = this.props
    return (
      <ButtonDropdown
        isOpen={this.state.isOpen}
        toggle={this.toggle}
        direction='right'
      >
        <DropdownToggle caret>
          {translatorText(
            {
              nl: 'Component invoegen',
              fr: 'Ajouter un élément',
              default: 'Add an element'
            },
            this.props.translator
          )}
          &nbsp;
        </DropdownToggle>
        <DropdownMenu>
          <ButtonGroup vertical>
            {Array.from(library.keys()).map(type => {
              return (
                <DropdownItem
                  key={`add-${type}`}
                  onClick={() => {
                    this.toggle()
                    addElement(type)
                  }}
                >
                  {capitalize(type)}
                </DropdownItem>
              )
            })}
          </ButtonGroup>
        </DropdownMenu>
      </ButtonDropdown>
    )
  }
}

export { FormEditor }
