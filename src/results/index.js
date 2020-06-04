import React from 'react'

const FormResults = ({
  children,
  formAttributes,
  elements,
  library,
  ...props
}) => (
  <section {...formAttributes}>
    {elements.map((element, key) => {
      if (!element) return null
      if (!library.has(element.type)) return null
      const Component = library.get(element.type).result
      if (!Component) return null
      return <Component key={key} {...props} element={element} />
    })}
    {children}
  </section>
)

export default FormResults
