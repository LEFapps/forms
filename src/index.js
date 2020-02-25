import { EasyForm } from './EasyForm'
import { FormComposer } from './FormComposer'
// import { ElementEditor, FormEditor } from './FormEditor'
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

import FormGroupDecorator from './decorators/FormGroup'
import AttributesDecorator from './decorators/Attributes'
import LayoutDecorator from './decorators/Layout'
import DependentDecorator from './decorators/Dependent'
import ValidateDecorator from './decorators/Validate'
import NameDecorator from './decorators/Name'
import PlaceholderDecorator from './decorators/Placeholder'

import translatorText from './helpers/translator'
import transformOptions from './helpers/transformOptions'

export {
  EasyForm,
  FormComposer,
  // FormEditor,
  // ElementEditor,
  DefaultComponents,
  DefaultDecorators
}

export {
  Textarea,
  TextInput,
  Checkbox,
  CheckboxMC,
  Radio,
  Select,
  InfoBox,
  Divider,
  Subform,
  Editor
}

export {
  FormGroupDecorator,
  AttributesDecorator,
  LayoutDecorator,
  ValidateDecorator,
  DependentDecorator,
  NameDecorator,
  PlaceholderDecorator
}

export { transformOptions, translatorText }
