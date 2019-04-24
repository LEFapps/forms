import React from 'react'
import { Table, Button, ButtonGroup } from 'reactstrap'

import { translatorText } from '../../helpers/translator'

const columns = ({ elements, attributes }) =>
  attributes && attributes.columns
    ? attributes.columns
    : elements.map(({ name }) => name) || []

export default ({
  items,
  remove,
  edit,
  element,
  translator,
  move,
  duplicate
}) => {
  const canMove = (index, dir) =>
    dir < 0 ? index > 0 : index < items.length - 1
  return (
    <Table>
      <thead>
        <tr>
          <th>#</th>
          {columns(element).map((col, i) => (
            <th key={i}>{translatorText(col, translator)}</th>
          ))}
          <th />
        </tr>
      </thead>
      <tbody>
        {items.map((d, i) => (
          <tr key={i}>
            <td style={{ verticalAlign: 'middle' }}>{1 + i}.</td>
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
