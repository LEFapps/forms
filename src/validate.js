import React, { Component } from 'react'
import filter from 'lodash/filter'
import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'
import isFunction from 'lodash/isFunction'
import map from 'lodash/map'
import reduce from 'lodash/reduce'
import set from 'lodash/set'
import trim from 'lodash/trim'

const requiredPaths = elements =>
  map(filter(elements, { required: true }), 'name')

const missingPaths = (doc, elements) => {
  const paths = requiredPaths(elements)
  return reduce(
    paths,
    (errors, path) => {
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
/*
const assembleSchema = elements => {
  const paths = requiredPaths(elements)
  const required = reduce(paths, (acc, path) => set(acc, path, true), {})
  const schema = (obj) => reduce(obj,
    (acc, value, key) => {
      if (isObject(value)) { acc.properties[key] = schema(value) } else { acc.required.push(key) }
      return acc
    }
    ,
    { required: [], properties: {} })
  return schema(required)
}
*/
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
    validatedOnStateChange (doc) {
      if (this.state.submitted) {
        this.setState({ errors: this.validate(doc) })
      }
      if (isFunction(this.props.onStateChange)) {
        return this.props.onStateChange(doc)
      } else {
        return doc
      }
    }
    validatedOnSubmit (doc) {
      this.setState({ submitted: true })
      const errors = this.validate(doc)
      let valid = isEmpty(errors)
      /*
      const schema = assembleSchema(this.props.elements)
      console.log(schema)
      const validate = new Ajv().compile(schema)
      const valid = validate(doc) */
      if (valid && isFunction(this.props.onSubmit)) {
        // this.setState({})
        this.props.onSubmit(doc)
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
