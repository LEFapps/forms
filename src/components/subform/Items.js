import React from 'react'
import { Table, Button, ButtonGroup, Input, InputGroup } from 'reactstrap'

import { translatorText } from '../../helpers/translator'

const columns = ({ elements, attributes }) =>
  attributes && attributes.columns
    ? attributes.columns
    : elements.map(({ name }) => name) || []

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
    const {
      items,
      remove,
      edit,
      element,
      translator,
      move,
      duplicate
    } = this.props
    const { search } = this.state
    const canMove = (index, dir) =>
      dir < 0 ? index > 0 : index < items.length - 1
    return (
      <Table>
        <thead>
          <tr>
            <th style={{ verticalAlign: 'middle', textAlign: 'right' }}>#</th>
            {columns(element).map((col, i) => (
              <th style={{ verticalAlign: 'middle' }} key={i}>
                {translatorText(col, translator)}
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
                    { nl: 'Zoeken', fr: 'Rechercher', en: 'Live Search' },
                    translator
                  )}
                />
              </InputGroup>
            </th>
          </tr>
        </thead>
        <tbody>
          {items.map((d, i) => (
            <tr key={i} style={matchSearch(search, d) ? {} : { opacity: 0.25 }}>
              <td style={{ verticalAlign: 'middle', textAlign: 'right' }}>
                {1 + i}.
              </td>
              {columns(element).map((col, j) => (
                <td style={{ verticalAlign: 'middle' }} key={`${i}.${j}`}>
                  {translatorText(d[col], translator)}
                </td>
              ))}
              <td className={'text-right text-nowrap'}>
                <ButtonGroup>
                  <Button
                    color={'info'}
                    size={'sm'}
                    outline
                    onClick={() => move(i, -1)}
                    disabled={!canMove(i, -1)}
                    title={translatorText(
                      { nl: 'Omhoog', fr: 'En haut', en: 'Move up' },
                      translator
                    )}
                  >
                    △
                  </Button>
                  <Button
                    color={'info'}
                    size={'sm'}
                    outline
                    onClick={() => move(i, 1)}
                    disabled={!canMove(i, 1)}
                    title={translatorText(
                      { nl: 'Omlaag', fr: 'En bas', en: 'Move down' },
                      translator
                    )}
                  >
                    ▽
                  </Button>
                  <Button
                    color={'success'}
                    size={'sm'}
                    outline
                    onClick={() => duplicate(i)}
                    title={translatorText(
                      { nl: 'Dupliceren', fr: 'Copier', en: 'Copy' },
                      translator
                    )}
                    disabled={!duplicate}
                  >
                    ⧉
                  </Button>
                  <Button
                    color={'danger'}
                    size={'sm'}
                    outline
                    onClick={() => remove(i)}
                    disabled={!remove}
                    title={translatorText(
                      { nl: 'Verwijderen', fr: 'Supprimer', en: 'Remove' },
                      translator
                    )}
                  >
                    ✕
                  </Button>
                  <Button
                    color={'warning'}
                    size={'sm'}
                    outline
                    onClick={() => edit(i)}
                    title={translatorText(
                      { nl: 'Wijzigen', fr: 'Changer', en: 'Edit' },
                      translator
                    )}
                  >
                    ✎
                  </Button>
                </ButtonGroup>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    )
  }
}

export default Items
