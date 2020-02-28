import { EasyForm } from './EasyForm'
import { FormComposer } from './FormComposer'
import FormEditor from './editor'
import { ElementEditor } from './editor/EditorCard'
import DefaultComponents from './components'
import DefaultDecorators from './decorators'

import Textarea from './components/Textarea'
import TextInput from './components/Text'
import Checkbox from './components/Checkbox'
import CheckboxMC from './components/CheckboxMC'
import Radio from './components/Radio'
import Select from './components/Select'
import Divider from './components/Divider'
import InfoBox from './components/InfoBox'
import Subform from './components/subform/Subform'
import Editor from './components/Editor'
import Input from './components/GenericInput'
import NoInput from './components/GenericInputNoChildren'

import FormGroupDecorator from './decorators/FormGroup'
import AttributesDecorator from './decorators/Attributes'
import LayoutDecorator from './decorators/Layout'
import DependentDecorator from './decorators/Dependent'
import ValidateDecorator from './decorators/Validate'
import NameDecorator from './decorators/Name'
import PlaceholderDecorator from './decorators/Placeholder'

import translatorText from './helpers/translator'
import Text from './helpers/Text'
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
  CheckboxMC,
  Divider,
  Editor,
  InfoBox,
  Input,
  NoInput,
  Radio,
  Select,
  Subform,
  Textarea,
  TextInput
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

export { translatorText, Text }
