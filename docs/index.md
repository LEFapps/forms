---
sidebar:
  nav: 'docs'
---

# Composition based forms

This is a composition based form generator. Every composed form is also [reformed](https://github.com/davezuko/react-reformed), allowing for easy model bindings.

A composed form requires a **Library** that provides a component for every type of element in your form. These components can be augmented by a DecoratorLibrary, which consists of so called **decorators** that wrap around components, to modify their behaviour and/or look & feel.

A library of default components and one for decorators is provided. You can extend or modify these default libraries, by adding, removing or replacing components or decorators. This is how you customize behaviour for a specific application.

## Extras

A **form editor** is available, with which you can modify form elements:

`new EasyForm().editor()`

A **form results view** is available, which formats the user’s input in text format:

`new EasyForm().results()`

# Getting started

Install from npm:

`$ npm install @lefapps/forms --save`

Instantiate the form (note that `Form` is reusable in your app):

```js
import React from 'react'
import { EasyForm } from '@lefapps/forms'
const Form = new EasyForm().instance()

const elements = [] // see docs
const save = model => console.log(model)

const MyForm = props => {
  return (
    <Form elements={elements} onSubmit={save}>
      <Button type={'submit'}>Save</Button>
    </Form>
  )
}
```

---

[components](components)
