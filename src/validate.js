import React, { Component } from 'react'
import filter from 'lodash/filter'
import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'
import isFunction from 'lodash/isFunction'
import map from 'lodash/map'
import reduce from 'lodash/reduce'
import has from 'lodash/has'
import set from 'lodash/set'
import trim from 'lodash/trim'

import { dependency } from './decorators/Dependent'

const requiredPaths = elements =>
  map(filter(elements, { required: true }), 'name')

const missingPaths = (doc, elements) => {
  const paths = requiredPaths(elements)
  return reduce(
    paths,
    (errors, path) => {
      const element = elements.find(({ name }) => name === path)
      if (element && element.dependent && !dependency(element.dependent)(doc)) {
        return errors
      }
      const value = get(doc, path)
      if (value === undefined) set(errors, path, true)
      else if (value === false) set(errors, path, true)
      else if (value === null) set(errors, path, true)
      else if (trim(value) === '') set(errors, path, true)
      else if (value === []) set(errors, path, true)
      else if (value === {}) set(errors, path, true)
      return errors
    },
    {}
  )
}

const validate = WrappedForm =>
  class Validate extends Component {
    constructor (props) {
      super(props)
      this.state = { errors: {}, submitted: false }
      this.validate = this.validate.bind(this)
      this.validatedOnStateChange = this.validatedOnStateChange.bind(this)
      this.validatedOnSubmit = this.validatedOnSubmit.bind(this)
    }
    validate (doc) {
      const errors = missingPaths(doc, this.props.elements)
      return errors
    }
    skipHidden (doc) {
      return this.props.elements.reduce(({ ...a }, { name, dependent }) => {
        if (dependent && !dependency(dependent)(doc)) {
          // element is hidden
          return a
        }
        if (has(doc, name)) {
          set(a, name, get(doc, name))
          return a
        }
        return a
      }, this.props.initialModel || {})
    }
    validatedOnStateChange (doc) {
      if (this.state.submitted) {
        this.setState({ errors: this.validate(doc) })
      }
      if (isFunction(this.props.onStateChange)) {
        return this.props.onStateChange(this.skipHidden(doc))
      } else {
        return this.skipHidden(doc)
      }
    }
    validatedOnSubmit (doc) {
      this.setState({ submitted: true })
      const errors = this.validate(doc)
      let valid = isEmpty(errors)
      if (valid && isFunction(this.props.onSubmit)) {
        this.props.onSubmit(this.skipHidden(doc))
      } else {
        this.setState({ errors }, () => {
          const invalidElement = document.querySelector('.is-invalid')
          if (invalidElement) {
            invalidElement.scrollIntoView({
              behavior: 'smooth',
              block: 'center'
            })
            setTimeout(() => invalidElement.focus(), 200)
          }
        })
      }
    }
    render () {
      const { onSubmit, onStateChange, ...xProps } = this.props
      const { errors } = this.state
      return (
        <WrappedForm
          onSubmit={this.validatedOnSubmit}
          onStateChange={this.validatedOnStateChange}
          errors={errors}
          {...xProps}
        />
      )
    }
  }

export default validate
