import React, { useState } from 'react'
import {
  ButtonDropdown,
  DropdownMenu,
  DropdownToggle,
  ButtonGroup,
  DropdownItem
} from 'reactstrap'
import translatorText from '../helpers/translator'
import capitalize from 'lodash/capitalize'
import stubTrue from 'lodash/stubTrue'

const Insert = ({ library, onElementSelection }) => {
  const [isOpen, setOpen] = useState(false)
  const elements = Array.from(library.keys())
  const hideable = t => !library.get(t).hideable
  const visibleElements = elements.filter(hideable)
  return (
    <ButtonDropdown
      size={'sm'}
      isOpen={isOpen}
      toggle={() => setOpen(!isOpen)}
      className={'lefappsForms-editor__insert'}
    >
      <DropdownToggle caret>
        {translatorText({ nl: 'Invoegen…', fr: 'Ajouter…', en: 'Insert…' })}
        &nbsp;
      </DropdownToggle>
      <DropdownMenu>
        <ButtonGroup vertical>
          {elements
            .filter(
              visibleElements.length === 0 ||
                visibleElements.length === elements.length
                ? stubTrue
                : hideable
            )
            .map(type => (
              <DropdownItem
                key={type}
                onClick={() => {
                  setOpen(!isOpen)
                  onElementSelection && onElementSelection({ type })
                }}
              >
                {capitalize(type)}
              </DropdownItem>
            ))}
        </ButtonGroup>
      </DropdownMenu>
    </ButtonDropdown>
  )
}
export default Insert
