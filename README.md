# Forms

This is a composition based form generator. Every composed form is also [reformed](https://github.com/davezuko/react-reformed), allowing for easy model bindings.

A composed form requires a `Library` that provides a component for every type of `element` in your form. These components can be augmented by a `DecoratorLibrary`, which consists of so called "decorators" that wrap around components, to modify their behaviour and/or look & feel.

A library of default components and one for decorators is provided. You can extend or modify these default libraries, by adding, removing or replacing components or decorators. This is how you customize behaviour for a specific application.

A form editor is also available, with which you can modify form elements.

***

## Contents

1. [**Easyform**: getting started](#easyform)
  - [Available props](#props)
  - [Configuration (library)](#configuration)
  - [Elements blueprint](#elements)
2. [Modifying **libraries**](#modifying-libraries)
3. [**Editing** forms](#editing-forms)
4. [Building your own **components**](#components)
5. [Building your own **decorators**](#decorators)
6. [Integrating **translations**](#translations)

***

## EasyForm

The easiest way of creating forms is using the `EasyForm`.

Let's assume the form is configured with a hardcoded list of elements:

```jsx
import { EasyForm } from '@lefapps/forms'

const formElements = [
  { name: 'foo', type: 'textarea' },
  { name: 'bar', type: 'text' }
]

const MyForm = new EasyForm().instance()

class Example extends React.Component {
  _onSubmit = model => {
    // this gets called when the form is submitted
    // e.preventDefault() has already been called of course
    console.log(model)
  }
  render() {
    return (
      <MyForm
        elements={formElements}
        initialModel={{bar: "Example text"}}
        onSubmit={this._onSubmit}>
        <button type="submit">Submit</button>
      </MyForm>
    )
  }
}
```

### Props

Prop | Required? | Notes
:---: | :---: | ---
[elements](#elements) | yes | array of form elements
onSubmit | yes | function to call when form gets submitted<br>_gets the form model as only parameter_
initialModel || default form values (in the same format as the form model)
onStateChange || perform transormations on the model<br>_gets the model as only parameter, **expects a (modified) model to be returned again**_

### Configuration

The `EasyForm` constructor accepts a configuration object with:

- `library`: a component `Library`, which is an extended [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) object that holds all form components
- `decorators`: a `DecoratorLibrary`, which is an extended `Library` that holds decorators

The component library defaults to `DefaultComponents`, which is a simple library of "reformed" `reactstrap` form components. Similarly, `decorators` defaults to `DefaultDecorators`.

`EasyForm.prototype.instance` is then used to create a React `Component`, which you can instantiate with `props`. You can supply a `config` object to the `instance` function, with the following supported fields:

- `decorators`: an Array with the names of the decorators that you wish to apply. If not supplied, _all_ decorators are applied.
- `components`: an Array of component types that you wish to make available to the form. If not supplied, all components are available. (Note that this is more relevant in the `editor` mode below.)

For example, you might only want to apply the standard `FormGroup` decorator:

```jsx
const MyForm = new EasyForm().instance({decorators:["formgroup"]})
```

Note that the decorators are applied _in sequence_, either the "natural" sequence in the `DecoratorLibrary` or the sequence in the `instance` arguments (applied left to right). This is important if you need to be certain of the position of a wrapper in the hierarchy.

Note that the `attributes` from the element are applied directly to the `Input` component by the `Textarea` component. This is an example of a _convention_ from this specific component library. Similarly, `name` and `type` are applied as you would expect.

>**Architectural note:** you (probably) only need to make one `EasyForm` instance per "type" of form in your application. You can simply reuse it as a component throughout your application.

### Elements

Property | Required? | Default | Type | Notes
--- | --- | --- | --- | ---
**name** | yes || `String` | defines the structure in the form model[*](#model)
**type** | yes || `String` | defines the type of input (see components folder)
**label** ||| `String`<br>`Object`[*](#translations) | input label
**options** | _select<br>chekbox(-mc)<br>radio_ | `[]` | `[String]`<br>`[Object]`[*](#translations) | available values
**required** || `false` | `Bool` | default **validation decorator** is applied when `true`
**schema** ||| `String`<br>`Object`[*](#translations) | help text when field is invalid
**dependent** ||| `Object` | dynamically show or hide element, based on value of other element<br>needs **dependent decorator**
**layout** ||| `Object` | config for default **layout decorator**<br>uses bootstrap grid
**attributes** ||| `Object` | passed attributes are applied directly to input element<br>_e.g.: `rows` for textarea_
**key** ||| `String` | only necessary if multiple elements with the same name are present<br>_e.g.: when using dependent fields_ (React needs different keys)

Blueprint of an element:

```json
{
  "name" : "name.supports.nesting",
  "type" : "text|textarea|select|radio|checkbox|checkbox-mc|divider|infobox",
  "label" : "LabelText",
  "attributes" : {
    "placeholder" : "Placeholder",
    "size": 12,
    "rows" : 5
  },
  "required" : true,
  "dependent" : {
    "on" : "dependentOn",
    "operator" : "in|gt|gte|lt|lte|is|isnt|…",
    "values" : "value or array of values"
  },
  "schema": {
    "description": "HelpText",
    "invalid": "HelpText when invalid"
  },
  "layout" : {
    "col" : {
      "xs" : 12,
      "md" : 6
    },
    "inline" : true
  },
  "options" : ["~red", "~blue"]
}
```


### Model

```js
const elements = [
  { name: 'name' },
  { name: 'address.street' },
  { name: 'address.number' },
  { name: 'address.zip' },
  { name: 'address.city' },
]

const onSubmit = model => {
  // model is an object which reflects the structure of the element names
  const { name, address } = model
  const { street, number, zip, city } = address || {}
  /* model = {
   *  name: 'name',
   *  address: {
   *    street: 'street',
   *    number: 'number',
   *    zip: 'zip',
   *    city: 'city' }
   * }
   */
}
```

## Modifying libraries

If you wish to modify the standard component and decorator libraries, you can do things like this:

```jsx
import { withTranslator } from '@lefapps/translations'

const MyFormConfig = new EasyForm()
MyFormConfig.addComponent(name1, component)
MyFormConfig.removeComponent(name2)
MyFormConfig.addDecorator(name3, decorator)
MyFormConfig.removeDecorator(name4)
const MyForm = MyFormConfig.instance()
const MyTranslatedForm = withTranslator(MyForm)
```

or

```jsx
const MyDecorators = DefaultDecorators.subset(["formgroup","layout"])
const MyComponents = DefaultComponents.subset(["textarea","checkbox"])
const MyForm = new EasyForm({library:MyComponents,decorators:MyDecorators}).instance()
```

See [components](#components) and [decorators](#decorators) for more info.

## Editing forms

It's extremely easy to get a form editor for the example form above:

```jsx
import { withTranslator } from '@lefapps/translations'

const MyFormEditor = new EasyForm().editor()
const MyTranslatedFormEditor = withTranslator(MyFormEditor)

class Example extends Component {
  _onSubmit = (formElements) => {
    // this gets called when the form editor is saved
    // e.preventDefault() has already been called of course
    console.log(formElements);
  }
  render() {
    return (
      <MyTranslatedFormEditor
        initialModel={formElements}
        onSubmit={this._onSubmit}
      >
        <Button type="submit">Submit</Button>
      </MyFormEditor>
    )
  }
}
```

Note that you only need to supply the form elements as the initial model.

Also note that both components and decorators basically carry their own configuration inside the respective libraries, which is used to lay-out the form editor.

## Components

You can write components like this:

```jsx
class TextComponent extends Component {
  get type() {
    return "text"
  }
  render() {
    const { bindInput, element, attributes: propsAttributes } = this.props
    const { name, type, attributes: elementAttributes } = element
    return (
      <Input type={type}  {...bindInput(name)} {...elementAttributes} {...propsAttributes} />
    )
  }
}

const transform = (element, { translator, model }, saving) => {
  // perform mutations of element properties
  // when saving or retrieving (saving = true/false)
  // Example: see translations for selects
  return element // do not forget to return the altered element
}

const config = ({ translator, model }) = return [
  {
    key: 'name',
    name: 'name',
    type: 'text',
    label: 'Field name', // or translator object { nl: '', en: '' }
    attributes: {
      placeholder: 'Technical name for field',
      // OR
      placeholders: {
        en: 'Technical name for field',
      }
    },
    required: true,
    layout: { col: { xs: 12 } },
  },
  {
    key: 'attributes.placeholder',
    name: 'attributes.placeholders',
    type: 'text',
    label: 'Placeholder',
    layout: { col: { xs: 12 } }
  }
]

export default TextComponent
export { transform, config }
```

Note that the `config` will determine what can be edited in the form editor.

When adding a component, you can for example do it like this:

```jsx
const easyForm = new EasyForm()
const path = '../imports/components/TextComponent'
easyForm.addComponent('mytext', {
    component: require(path).default,
    config: require(path).config
})
```

You could also directly add the component and its configuration to a `Library`.

## Decorators

This is where the magic happens. Essentially what we can do is _modify_ the component library, so that a higher order component (the decorator) is in control of the render function. The decorator can e.g. inject props, decide to render something completely different or wrap the component in something.

Let's assume for instance that we would like to wrap every form component in a `FormGroup` and add a label if is present in the element configuration. It would look something like this:

```jsx
const FormGroupDecorator = WrappedComponent => props => (
  <FormGroup>
    {props.element.label?<Label for={props.element.name}>{props.element.label}</Label>:null}
    <WrappedComponent {...props} /> // don't forget to "push down" the props into the wrapped component
  </FormGroup>
)

const transform = (element, { translator, model }, saving) => {
  // perform mutations of element properties
  // when saving or retrieving (saving = true/false)
  // Example: see translations for selects
  return element // do not forget to return the altered element
}

const config = ({ translator, model }) => [
  {
    key: 'label',
    name: 'label',
    type: 'textarea',
    label: 'Field label or introduction',
    layout: { col: { md: 12 } }
  }
]

// Configuration of label is put in front
const combine = _.flip(_.union)

// we're only interested in certain components:
const filter = componentType => _.includes(['textarea', 'text'], componentType)

export default FormGroupDecorator
export { transform, config, combine, filter }
```

You also need to add it to the `DecoratorLibrary`, for example like this:

```jsx
const easyForm = new EasyForm()
const decorator = require('../imports/decorators/FormGroupDecorator')
easyForm.addDecorator('myformgroup', {
    decorator: decorator.default,
    config: isArray(decorator.config) ? decorator.config : [],
    combine: isFunction(decorator.combine) ? decorator.combine : union,
    filter: isFunction(decorator.filter) ? decorator.filter : stubTrue,
})
```

Note the special (optional) configuration fields:

- `filter`: a `function` that returns true if supplied with the name of a component that it wishes to modify.
- `combine`: a `function` that is supplied with two arguments: the component `config` (an array of form fields) and the decorator `config`. By default, the decorator configuration (also an array of fields) is appended to the element form, but in this case it is added first.

To make use of the new `label` functionality, we can add them to the element configuration:

```jsx
const formElements = [
  {
    key: 'foo',
    name: 'foo',
    label: 'Fill your foo',
    type: 'textarea',
    attributes: {
      rows: 5,
    },
  },
  {
    key: 'bar',
    name: 'bar',
    label: 'Add your bar',
    type: 'text'
  },
]
```

Note that the `props` that are passed to the decorator include both `element` configuration, as well as the `model`. This means the decorator could easily respond to the current values in _any part_ of the form.

If you are creating a large component and/or decorator library, it might be worthwhile to have a look at `Components.js` and `Decorators.js` for ideas on how to bring the together.

## Translations

### Injecting translator

When wrapping the Form instance or editor in [@lefapps/translations](https://www.npmjs.com/package/@lefapps/translations)’s `withTranslator`, you have access to the `translator` object inside library config fields. It is then recommended to pass `translator` as a prop to each `<Form />` component. **You should extend this translator object with your own** `<Translate />` **component.**

Below is an example of a reusable translated form instance.

```JSX
import React from 'react'
import { EasyForm } from '@lefapps/forms'
import { withTranslator, Translate } from '@lefapps/translations'

const withTranslateComponent = WrappedForm => ({ translator, ...props }) => (
  <WrappedForm
    {...props}
    translator={Object.assign(translator, { component: Translate })}
  />
)

export default withTranslator(withTranslateComponent(new EasyForm().instance()))
```

_If you want to use your own translator package, check our [@lefapps/translations](https://www.npmjs.com/package/@lefapps/translations) package to see how the translator object should be set up._

### Getting translations

There is a helper function `translatorText` available to make it easier to retrieve the correct language from `placeholders`, `label` and other fields.

```js
import { translatorText } from '@lefapps/forms'

const label = {
  nl: 'NL Label',
  en: 'EN Label'
}

const getLabel = ({ translator }) => translatorText(label, translator, forceDefault) || 'fallback'
// returns 'NL Label' if translator.currentLanguage == 'nl'
// returns 'EN Label' if translator.currentLanguage is undefined, but default language == 'en'
// returns label.default if translator is undefined
// returns first item in label if translator is undefined and key 'default' is not present in label
// returns '' if label is empty, you can then project a fallback

// The last parameter forces 'default' as first key to check
```

## Notes

### MarkDown

Setting `md: true` on a **textarea** will provide you with an experimental(!) MarkDown editor. Include the following Fontawesome Icons when using this:
```JSX
import { library } from '@fortawesome/fontawesome-svg-core'
import { faBold, faGripLines, faHeading, faItalic, faLink, faList, faListOl, faPencilAlt, faQuoteRight, faStrikethrough } from '@fortawesome/free-solid-svg-icons'

library.add(faBold, faGripLines, faHeading, faItalic, faLink, faList, faListOl, faPencilAlt, faQuoteRight, faStrikethrough)
```
