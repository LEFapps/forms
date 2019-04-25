import React from 'react'
import { GenericInputNoChildren } from './GenericInput'
import { Col, Row } from 'reactstrap'
import Md from '../helpers/Text'

const Textarea = props => {
  const { element, bindInput } = props
  const { name, md } = element || {}
  const model = bindInput(name) || {}
  if (!md) return <GenericInputNoChildren {...props} />
  else {
    return (
      <Row>
        <Col xs={12} md={6}>
          <GenericInputNoChildren {...props} />
        </Col>
        <Col xs={12} md={6} className={'md-preview'}>
          <Md content={model.value} className={'md-preview-content'} />
        </Col>
      </Row>
    )
  }
}

const config = () => [
  {
    key: 'textarea.divider',
    type: 'divider',
    layout: { col: { xs: 12 } }
  },
  {
    key: 'textarea.rows',
    name: 'attributes.rows',
    type: 'text',
    label: 'Size',
    attributes: {
      placeholders: {
        nl: 'Aantal lijnen, bv. 5',
        fr: 'Combien de lignes, ex. 5',
        en: 'Number of lines, e.g. 5'
      }
    },
    layout: { col: { xs: 6, md: 4 } }
  }
]

export default Textarea
export { config }
