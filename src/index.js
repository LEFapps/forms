import { EasyForm } from './EasyForm'
import { FormComposer } from './FormComposer'
import FormEditor from './editor'
import { ElementEditor } from './editor/EditorCard'
import DefaultComponents from './components'
import DefaultDecorators from './decorators'

import Textarea, { result as TextareaResult } from './components/Textarea'
import TextInput, { result as TextInputResult } from './components/Text'
import Checkbox, { result as CheckboxResult } from './components/Checkbox'
import CheckboxMC, { result as CheckboxMCResult } from './components/CheckboxMC'
import Radio, { result as RadioResult } from './components/Radio'
import Select, { result as SelectResult } from './components/Select'
import Divider, { result as DividerResult } from './components/Divider'
import InfoBox, { result as InfoBoxResult } from './components/InfoBox'
import Subform, { result as SubformResult } from './components/subform/Subform'
import Editor, { result as EditorResult } from './components/Editor'
import Input, { result as InputResult } from './components/GenericInput'
import NoInput, {
  result as NoInputResult
} from './components/GenericInputNoChildren'

import FormGroupDecorator from './decorators/FormGroup'
import AttributesDecorator from './decorators/Attributes'
import LayoutDecorator from './decorators/Layout'
import DependentDecorator from './decorators/Dependent'
import ValidateDecorator from './decorators/Validate'
import NameDecorator from './decorators/Name'
import PlaceholderDecorator from './decorators/Placeholder'

import translatorText from './helpers/translator'
import Text from './helpers/Text'
import { MarkDownHelp } from './components/markdown/mdHelp'
import './helpers/icons'

export {
  EasyForm,
  FormComposer,
  FormEditor,
  ElementEditor,
  DefaultComponents,
  DefaultDecorators
}

export {
  Checkbox,
  CheckboxResult,
  CheckboxMC,
  CheckboxMCResult,
  Divider,
  DividerResult,
  Editor,
  EditorResult,
  InfoBox,
  InfoBoxResult,
  Input,
  InputResult,
  NoInput,
  NoInputResult,
  Radio,
  RadioResult,
  Select,
  SelectResult,
  Subform,
  SubformResult,
  Textarea,
  TextareaResult,
  TextInput,
  TextInputResult
}

export {
  AttributesDecorator,
  DependentDecorator,
  FormGroupDecorator,
  LayoutDecorator,
  NameDecorator,
  PlaceholderDecorator,
  ValidateDecorator
}

export { translatorText, Text, MarkDownHelp }
