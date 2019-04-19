import React from 'react'
import { Table, Button } from 'reactstrap'

import { translatorText } from '../../helpers/translator'

const columns = ({ elements, attributes }) =>
  attributes && attributes.columns
    ? attributes.columns
    : elements.map(({ name }) => name) || []

export default ({ items, remove, edit, element, translator }) => (
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
      {(items || []).map((d, i) => (
        <tr key={i}>
          <td>{1 + i}.</td>
          {columns(element).map((col, j) => (
            <td key={`${i}.${j}`}>{d[col].toString()}</td>
          ))}
          <td className={'text-right text-nowrap'}>
            <Button
              color={'danger'}
              size={'sm'}
              outline
              onClick={() => remove(i)}
            >
              {translatorText(
                { nl: 'Verwijderen', fr: 'Supprimer', en: 'Remove' },
                translator
              )}
            </Button>{' '}
            <Button color={'info'} size={'sm'} outline onClick={() => edit(i)}>
              {translatorText(
                { nl: 'Wijzigen', fr: 'Changer', en: 'Edit' },
                translator
              )}
            </Button>
          </td>
        </tr>
      ))}
    </tbody>
  </Table>
)
