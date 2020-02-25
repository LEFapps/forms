import React, { Component } from 'react'
import { FormComposer } from '../FormComposer'
import reformed from '../reformed'
import {
  Badge,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardHeader
} from 'reactstrap'
import { size, get, flow, find, upperCase, upperFirst, isString } from 'lodash'
import translatorText from '../helpers/translator'

class ElementEditor extends Component {
  constructor (props) {
    super(props)
    // insert middleware into reformed
    // to intercept the setModel call
    // to push model state
    // up the hierarchy:
    this.middleware = modelHandler => {
      modelHandler.setModel = flow([
        modelHandler.setModel,
        this.props.setElementModel
      ])
      return modelHandler
    }
    this.ElementForm = reformed(this.middleware)(FormComposer)
  }
  render () {
    const elements = this.props.library.get(this.props.el.type)
    return (
      <this.ElementForm
        {...this.props}
        elements={(elements && elements.config()) || []}
      />
    )
  }
}
export { ElementEditor }
