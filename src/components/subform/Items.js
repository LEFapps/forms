import React from 'react'
import { Table, Button, ButtonGroup, Input, InputGroup } from 'reactstrap'
import isString from 'lodash/isString'
import isArray from 'lodash/isArray'
import isBoolean from 'lodash/isBoolean'
import isPlainObject from 'lodash/isPlainObject'
import get from 'lodash/get'

import translatorText from '../../helpers/translator'

const columns = ({ elements, attributes }) =>
  (attributes && attributes.columns ? attributes.columns : elements || []).map(
    col => {
      const name = isString(col) ? col : col.name
      const label = isString(col) ? col : col.label
      const el = elements.find(e => e.name === name) || {}
      const type = col.type || el.type
      const options = el.options
      return { name, label, type, options }
    }
  )

const matchSearch = (key, values) => {
  if (!key) return true
  else {
    const val = Object.values(values)
    return key.split(' ').every(k =>
      val.some(
        v =>
          v
            .toString()
            .toLowerCase()
            .indexOf(k.toLowerCase()) >= 0
      )
    )
  }
}

const columnValue = (data, { name, type, options = [] }) => {
  const value = get(data, name)
  const fromOptions = v =>
    options.find(option => ((option && option._id) || option) === v) || v
  switch (true) {
    case type === 'subform':
      return value && `${value.length} ×`
    default:
      if (isArray(value)) {
        return value.map(v => translatorText(fromOptions(v))).join(', ')
      }
      if (isPlainObject(value)) return JSON.stringify(value).substring(0, 64)
      if (isBoolean(value)) {
        return (
          <span className={`text-${value ? 'success' : 'danger'}`}>
            {value ? '✓' : '✗'}
          </span>
        )
      }
      return translatorText(fromOptions(value))
  }
}

class Items extends React.Component {
  constructor (props) {
    super(props)
    this.state = { search: '' }
    this.initSearch = this.initSearch.bind(this)
  }
  initSearch ({ target }) {
    this.setState({ search: target.value })
  }
  render () {
    const { items, remove, edit, element, move, duplicate } = this.props
    const { search } = this.state
    const canMove = (index, dir) =>
      !move ? false : dir < 0 ? index > 0 : index < items.length - 1
    const cols = columns(element)
    return (
      <Table>
        <thead>
          <tr>
            <th style={{ verticalAlign: 'middle', textAlign: 'right' }}>#</th>
            {cols.map(({ label, name }, i) => (
              <th style={{ verticalAlign: 'middle' }} key={i}>
                {translatorText(label || name)}
              </th>
            ))}
            <th>
              <InputGroup
                size='sm'
                style={{ width: '9.25rem', float: 'right' }}
              >
                <Input
                  type={'search'}
                  onChange={this.initSearch}
                  placeholder={translatorText(
                    {
                      nl: 'Zoeken',
                      fr: 'Rechercher',
                      en: 'Live Search'
                    },
                    { getString: true }
                  )}
                />
              </InputGroup>
            </th>
          </tr>
        </thead>
        <tbody>
          {items.length ? (
            items.map((d, i) => (
              <tr
                key={i}
                style={matchSearch(search, d) ? {} : { opacity: 0.25 }}
              >
                <td style={{ verticalAlign: 'middle', textAlign: 'right' }}>
                  {1 + i}.
                </td>
                {cols.map((col, j) => {
                  return (
                    <td style={{ verticalAlign: 'middle' }} key={`${i}.${j}`}>
                      {columnValue(d, col)}
                    </td>
                  )
                })}

                <td className={'text-right text-nowrap'}>
                  <ButtonGroup>
                    {!canMove ? null : (
                      <Button
                        color={'info'}
                        size={'sm'}
                        outline
                        onClick={() => move(i, -1)}
                        disabled={!canMove(i, -1)}
                        title={translatorText({
                          nl: 'Omhoog',
                          fr: 'En haut',
                          en: 'Move up'
                        })}
                      >
                        △
                      </Button>
                    )}
                    {!canMove ? null : (
                      <Button
                        color={'info'}
                        size={'sm'}
                        outline
                        onClick={() => move(i, 1)}
                        disabled={!canMove(i, 1)}
                        title={translatorText({
                          nl: 'Omlaag',
                          fr: 'En bas',
                          en: 'Move down'
                        })}
                      >
                        ▽
                      </Button>
                    )}
                    {!duplicate ? null : (
                      <Button
                        color={'success'}
                        size={'sm'}
                        outline
                        onClick={() => duplicate(i)}
                        title={translatorText({
                          nl: 'Dupliceren',
                          fr: 'Copier',
                          en: 'Copy'
                        })}
                        disabled={!duplicate}
                      >
                        ⧉
                      </Button>
                    )}
                    {!remove ? null : (
                      <Button
                        color={'danger'}
                        size={'sm'}
                        outline
                        onClick={() => remove(i)}
                        disabled={!remove}
                        title={translatorText({
                          nl: 'Verwijderen',
                          fr: 'Supprimer',
                          en: 'Remove'
                        })}
                      >
                        ✕
                      </Button>
                    )}
                    {!edit ? null : (
                      <Button
                        color={'warning'}
                        size={'sm'}
                        outline
                        onClick={() => edit(i)}
                        title={translatorText({
                          nl: 'Wijzigen',
                          fr: 'Changer',
                          en: 'Edit'
                        })}
                      >
                        {get(element, 'attributes.disabled') ? '⚯' : '✎'}
                      </Button>
                    )}
                  </ButtonGroup>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={cols.length + 2}
                className={'text-center text-muted'}
              >
                {translatorText({
                  default: 'None',
                  nl: 'Geen items',
                  fr: 'Aucun choix',
                  en: 'No options'
                })}
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    )
  }
}

export default Items
