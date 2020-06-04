import React from 'react'
import reformed from './reformed'
import validate from './validate'
import ComponentLibrary from './components'
import DecoratorLibrary from './decorators'
import { FormComposer } from './FormComposer'
import FormEditor from './editor'
import FormResults from './results'
import { isEmpty, set } from 'lodash'
import { translatorContext } from './helpers/translator'

class EasyForm {
  constructor ({
    library = ComponentLibrary,
    decorators = DecoratorLibrary
  } = {}) {
    this.library = library
    this.decorators = decorators
  }
  addComponent (name, component) {
    if (this.library.has(name)) {
      console.debug(`Warning: Replacing default ${name} component`)
    }
    this.library.set(name, component)
  }
  removeComponent (name) {
    this.library.delete(name)
  }
  addDecorator (name, decorator) {
    if (this.decorators.has(name)) {
      console.debug(`Warning: Replacing default ${name} decorator`)
    }
    this.decorators.set(name, decorator)
  }
  removeDecorator (name) {
    this.decorators.delete(name)
  }
  modifyLibrary (config) {
    const decorators = isEmpty(config.decorators)
      ? this.decorators
      : this.decorators.subset(config.decorators)
    const components = isEmpty(config.components)
      ? this.library.clone()
      : this.library.subset(config.components)
    decorators.apply(components, config)
    return components
  }
  instance (config = {}) {
    const ReformedFormComposer = validate(
      reformed(config.middleware)(FormComposer)
    )
    return props => {
      set(config, 'translator', props.translator)
      const components = this.modifyLibrary(config)
      return (
        <translatorContext.Provider value={props.translator}>
          <ReformedFormComposer library={components} {...props}>
            {props.readOnly ? null : props.children}
          </ReformedFormComposer>
        </translatorContext.Provider>
      )
    }
  }
  editor (config = {}) {
    return props => {
      set(config, 'translator', props.translator)
      const components = this.modifyLibrary(config)
      return (
        <translatorContext.Provider value={props.translator}>
          <FormEditor
            library={components}
            formAttributes={{ className: 'lefappsForms-editor' }}
            {...props}
          >
            {props.children}
          </FormEditor>
        </translatorContext.Provider>
      )
    }
  }
  results (config = {}) {
    return props => {
      set(config, 'translator', props.translator)
      const components = this.modifyLibrary(config)
      return (
        <translatorContext.Provider value={props.translator}>
          <FormResults
            library={components}
            formAttributes={{ className: 'lefappsForms-results' }}
            {...props}
          >
            {props.children}
          </FormResults>
        </translatorContext.Provider>
      )
    }
  }
}

export { EasyForm }
