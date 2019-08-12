const toolbarGroups = [
  [
    {
      icon: 'heading',
      title: 'Heading',
      prepend: '### ',
      append: '',
      selectAfter: 4
    }
  ],
  [
    {
      icon: 'bold',
      title: 'Bold',
      prepend: '**',
      append: '**',
      selectAfter: 4
    },
    {
      icon: 'italic',
      title: 'Italic',
      prepend: '_',
      append: '_',
      selectAfter: 2
    },
    {
      icon: 'strikethrough',
      title: 'Strikethrough',
      prepend: '~~',
      append: '~~',
      selectAfter: 2
    }
  ],
  [
    {
      icon: 'link',
      title: 'Link',
      prepend: '[',
      append: '](https://)',
      selectAfter: 11
    }
  ],
  [
    {
      icon: 'list',
      title: 'List',
      prepend: '- ',
      append: '',
      selectAfter: 2
    },
    {
      icon: 'list-ol',
      title: 'Numbered list',
      prepend: '1. ',
      append: '',
      selectAfter: 2
    }
  ],
  [
    {
      icon: 'quote-right',
      title: 'Quote',
      prepend: '>',
      append: '',
      selectAfter: 1
    }
  ],
  [
    {
      icon: 'grip-lines',
      title: 'Quote',
      prepend: '\n***\n',
      append: '',
      selectAfter: 4
    }
  ]
]

const toolbar = toolbarGroups.flatten()

const _find = (lines, pos, removed) => {
  let cumul = -1
  let line = 0
  while (cumul < pos && line < lines.length) {
    cumul += lines[line].length + removed.length
    line++
  }
  return Math.max(line - 1, 0)
}

const _split = (value, splitter) => {
  let key = 0
  let end = 0
  const parts = []
  while (end < value.length) {
    const start = end
    const splitKey = key % splitter.length
    const search = splitter[splitKey]
    const prevSearch = splitKey ? splitter[splitKey - 1] : ''
    end = value.indexOf(search, start + prevSearch.length)
    if (end < 0) end = value.length
    else end += splitKey ? search.length : 0
    // else end += key ? search.length : 0
    parts.push(value.slice(start, end))
    key++
  }
  return parts
}

/** returns: array with three parts
 * - 0: value before selected part
 * - 1: value of selected part, cut before and after relevant substring
 * - 2: value after selected part
 * joining this array gives you the value again
 */
const _toolParts = (value, cursor, { prepend, append }) => {
  const lines = value.split('\n')
  const startLine = _find(lines, cursor[0], '\n')
  const endLine = _find(lines, cursor[1], '\n')
  const offset =
    lines.slice(0, startLine).join('\n').length + (startLine ? '\n'.length : 0)
  let result = ['', '', '']
  if (prepend && append) {
    // inline
    const parts = _split(lines[startLine], [prepend, append])
    const partIndex = _find(parts, cursor[0] - offset, '')
    result[0] = (lines.slice(0, startLine) || [])
      .concat(parts.slice(0, partIndex).join(''))
      .join('\n')
    result[1] = parts[partIndex]
    result[2] = [parts.slice(partIndex + 1) || []]
      .concat(lines.slice(startLine + 1))
      .join('\n')
  } else {
    // block level
    result = [
      lines.slice(0, startLine).join('\n'),
      lines.slice(startLine, endLine + 1).join('\n'),
      lines.slice(endLine + 1).join('\n')
    ]
    result[0] += result[0] ? (startLine ? '\n' : '') : ''
    result[2] = result[2]
      ? (startLine !== lines.length - 1 ? '\n' : '') + result[2]
      : ''
  }
  return result
}

const _checkTool = (part, { prepend, append }) => {
  const checkPrepend = part
    ? prepend
      ? part.indexOf(prepend) >= 0
      : true
    : false
  const checkAppend = part ? (append ? part.indexOf(append) >= 0 : true) : false
  return checkPrepend && checkAppend
}

const hasTool = (value, cursor, tool) =>
  _checkTool(_toolParts(value, cursor, tool)[1], tool)

const applyTool = (value, cursor, { prepend, append }) => {
  const toolApplied = _toolParts(value, cursor, { prepend, append })
  const applied = _checkTool(toolApplied[1], { prepend, append })

  // apply tool — inline
  if (prepend && append) {
    // undo tool
    if (applied) {
      return (
        toolApplied[0] +
        toolApplied[1].replace(prepend, '').replace(append, '') +
        toolApplied[2]
      )
    }
    return (
      value.slice(0, cursor[0]) +
      prepend +
      value.slice(cursor[0], cursor[1]) +
      append +
      value.slice(cursor[1])
    )
  }

  // apply tool - block
  const lines = value.split('\n')
  const startLine = _find(lines, cursor[0], '\n')
  const endLine = _find(lines, cursor[1], '\n')
  return lines
    .slice(0, startLine)
    .concat(
      lines
        .slice(startLine, endLine + 1)
        .map(
          l =>
            (applied ? '' : prepend) +
            l.replace(prepend, '').replace(append, '') +
            (applied ? '' : append)
        )
    )
    .concat(lines.slice(endLine + 1))
    .join('\n')
}

export default applyTool
export { hasTool, toolbar, toolbarGroups }
