import { library } from '@fortawesome/fontawesome-svg-core'

import { faAngleRight } from '@fortawesome/free-solid-svg-icons/faAngleRight'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons/faArrowLeft'
import { faBold } from '@fortawesome/free-solid-svg-icons/faBold'
import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck'
import { faCheckDouble } from '@fortawesome/free-solid-svg-icons/faCheckDouble'
import { faEye } from '@fortawesome/free-solid-svg-icons/faEye'
import { faGripLines } from '@fortawesome/free-solid-svg-icons/faGripLines'
import { faHeading } from '@fortawesome/free-solid-svg-icons/faHeading'
import { faInfo } from '@fortawesome/free-solid-svg-icons/faInfo'
import { faItalic } from '@fortawesome/free-solid-svg-icons/faItalic'
import { faLink } from '@fortawesome/free-solid-svg-icons/faLink'
import { faList } from '@fortawesome/free-solid-svg-icons/faList'
import { faListOl } from '@fortawesome/free-solid-svg-icons/faListOl'
import { faParagraph } from '@fortawesome/free-solid-svg-icons/faParagraph'
import { faPen } from '@fortawesome/free-solid-svg-icons/faPen'
import { faQuestion } from '@fortawesome/free-solid-svg-icons/faQuestion'
import { faQuoteRight } from '@fortawesome/free-solid-svg-icons/faQuoteRight'
import { faTable } from '@fortawesome/free-solid-svg-icons/faTable'
import { faSlidersH } from '@fortawesome/free-solid-svg-icons/faSlidersH'
import { faStrikethrough } from '@fortawesome/free-solid-svg-icons/faStrikethrough'
import { faTasks } from '@fortawesome/free-solid-svg-icons/faTasks'

// Text editor
library.add(
  faArrowLeft,
  faBold,
  faEye,
  faHeading,
  faGripLines,
  faItalic,
  faLink,
  faList,
  faListOl,
  faQuoteRight,
  faTable,
  faStrikethrough
)

// Form editor
library.add(
  faPen,
  faParagraph,
  faCheck,
  faCheckDouble,
  faQuestion,
  faTasks,
  faGripLines,
  faSlidersH,
  faInfo,
  faAngleRight
)

export { library }
