import React, { useState } from 'react'
import {
  Button,
  Table,
  Modal,
  ModalHeader,
  ModalBody,
  Collapse
} from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const MarkDownHelp = ({ ...props }) => {
  const [isOpen, setOpen] = useState()
  const [viewBlocklevels, setBlocklevels] = useState()
  const [viewListlevels, setListlevels] = useState()
  const [viewCharlevels, setCharlevels] = useState()
  const [viewExtlevels, setExtlevels] = useState()
  const toggle = () => setOpen(!isOpen)

  const openedIcon = 'caret-down'
  const closedIcon = 'caret-right'

  return (
    <>
      <Button {...props} onClick={toggle}>
        <FontAwesomeIcon icon={'info-circle'} />
      </Button>
      <Modal size={'lg'} toggle={toggle} isOpen={isOpen}>
        <ModalHeader toggle={toggle}>MarkDown syntax</ModalHeader>
        <ModalBody>
          <h6
            onClick={() => setBlocklevels(!viewBlocklevels)}
            style={{ cursor: 'pointer' }}
          >
            <FontAwesomeIcon icon={viewBlocklevels ? openedIcon : closedIcon} />{' '}
            Paragraph formatting
          </h6>
          <Collapse isOpen={viewBlocklevels}>
            <Table>
              <thead>
                <tr>
                  <th>Element</th>
                  <th>Syntax</th>
                  <th>Example</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>Headings</th>
                  <td>
                    <pre>###</pre>
                  </td>
                  <td>
                    <pre>### Heading text</pre>
                  </td>
                </tr>
                <tr>
                  <th>Paragraph</th>
                  <td />
                  <td>
                    <pre>Paragraph text</pre>
                    <hr />
                    <pre>{'Paragraph text\n\nOther paragraph'}</pre>
                  </td>
                </tr>
                <tr>
                  <th>Quote</th>
                  <td>
                    <pre>></pre>
                  </td>
                  <td>
                    <pre>> Quoted paragraph text</pre>
                    <hr />
                    <pre>
                      {
                        '> Multiple paragraphs in one quote\n>\n> Multiple paragraphs'
                      }
                    </pre>
                  </td>
                </tr>
              </tbody>
            </Table>
          </Collapse>
          <h6
            onClick={() => setListlevels(!viewListlevels)}
            style={{ cursor: 'pointer' }}
          >
            <FontAwesomeIcon icon={viewListlevels ? openedIcon : closedIcon} />{' '}
            List formatting
          </h6>
          <Collapse isOpen={viewListlevels}>
            <Table>
              <thead>
                <tr>
                  <th>Element</th>
                  <th>Syntax</th>
                  <th>Example</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>Bullets</th>
                  <td>
                    <pre>*</pre>
                  </td>
                  <td>
                    <pre>* List item</pre>
                    <hr />
                    <pre>
                      {
                        '* List item 1\n* List item 2\n  * Nested list item 2.a\n  * Nested list item 2.b'
                      }
                    </pre>
                  </td>
                </tr>
                <tr>
                  <th>Numbers</th>
                  <td>
                    <pre>1.</pre>
                  </td>
                  <td>
                    <pre>1. List item</pre>
                    <hr />
                    <pre>
                      {
                        '1. List item 1\n1. List item 2\n  1. Nested list item 2.a\n  1. Nested list item 2.b'
                      }
                    </pre>
                  </td>
                </tr>
              </tbody>
            </Table>
          </Collapse>
          <h6
            onClick={() => setCharlevels(!viewCharlevels)}
            style={{ cursor: 'pointer' }}
          >
            <FontAwesomeIcon icon={viewCharlevels ? openedIcon : closedIcon} />{' '}
            Character formatting
          </h6>
          <Collapse isOpen={viewCharlevels}>
            <Table>
              <thead>
                <tr>
                  <th>Element</th>
                  <th>Syntax</th>
                  <th>Example</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>Italic</th>
                  <td>
                    <pre>{'* *\n_ _'}</pre>
                  </td>
                  <td>
                    <pre>*text* or _text_</pre>
                    <hr />
                    <pre>An _emphasized part_ of a sentence.</pre>
                  </td>
                </tr>
                <tr>
                  <th>Bold</th>
                  <td>
                    <pre>{'** **\n__ __'}</pre>
                  </td>
                  <td>
                    <pre>**text** or __text__</pre>
                    <hr />
                    <pre>A **strongly emphasized part** of a sentence.</pre>
                  </td>
                </tr>
                <tr>
                  <th>Strikethrough</th>
                  <td>
                    <pre>~~ ~~</pre>
                  </td>
                  <td>
                    <pre>~~text~~</pre>
                    <hr />
                    <pre>I ate ~~two~~ three apples.</pre>
                  </td>
                </tr>
              </tbody>
            </Table>
          </Collapse>
          <h6
            onClick={() => setExtlevels(!viewExtlevels)}
            style={{ cursor: 'pointer' }}
          >
            <FontAwesomeIcon icon={viewExtlevels ? openedIcon : closedIcon} />{' '}
            Other elements
          </h6>
          <Collapse isOpen={viewExtlevels}>
            <Table>
              <thead>
                <tr>
                  <th>Element</th>
                  <th>Syntax</th>
                  <th>Example</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>Divider</th>
                  <td>
                    <pre>***</pre>
                  </td>
                  <td>
                    <pre>
                      {
                        'Paragraph above divider.\n\n***\n\nParagraph below horizontal ruler.'
                      }
                    </pre>
                  </td>
                </tr>
                <tr>
                  <th>Links</th>
                  <td>
                    <pre>[text](url)</pre>
                  </td>
                  <td>
                    <pre>
                      More info [here](https://www.site.com/more-info/).
                    </pre>
                  </td>
                </tr>
                <tr>
                  <th>Images</th>
                  <td>
                    <pre>![desc](url)</pre>
                  </td>
                  <td>
                    <pre>
                      {
                        '![A giraffe drinking from a pond](/images/giraffe.jpg)\n![Elephants drinking from a pond](https://www.site.com/images/elephants.jpg)'
                      }
                    </pre>
                  </td>
                </tr>
              </tbody>
            </Table>
          </Collapse>
        </ModalBody>
      </Modal>
    </>
  )
}
