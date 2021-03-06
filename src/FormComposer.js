import React, { Component } from 'react'
import { Form, Row } from 'reactstrap'
import get from 'lodash/get'
import set from 'lodash/set'

const renderElement = (element, library, additionalProps, index) => {
  if (library.has(element.type)) {
    let Component = library.get(element.type).component
    const key = `${element.name}${element.key || index}`
    if (get(additionalProps, 'readOnly')) {
      set(element, 'attributes.disabled', true)
    }
    return <Component key={key} element={element} {...additionalProps} />
  } else {
    console.warn(
      `Unknown element type: ${element.type}`,
      get(element, 'name', index)
    )
    return null
  }
}

class FormComposer extends Component {
  constructor (props) {
    super(props)
    this._onSubmit = this._onSubmit.bind(this)
  }
  _onSubmit (e) {
    e.preventDefault()
    e.stopPropagation()
    this.props.onSubmit(this.props.model)
  }
  renderElements (props) {
    const { elements, library, ...additionalProps } = props
    return elements.map((element, index) =>
      renderElement(element, library, additionalProps, index)
    )
  }
  render () {
    const { formAttributes } = this.props
    const className =
      'lefappsForms ' + ((formAttributes && formAttributes.className) || '')
    return (
      <Form onSubmit={this._onSubmit} {...formAttributes} className={className}>
        <Row>{this.renderElements(this.props)}</Row>
        {this.props.children}
      </Form>
    )
  }
}

export { FormComposer }
