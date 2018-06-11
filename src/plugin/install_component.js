import {
  Control,
  ModelEditor,
  WrapCard,
  CodeEditor,
  RenderDev,
  WrapModal,
  FormInput,
  FormSelect,
  FormNumber,
  FormDate,
  FormUpload,
  FormRadio,
  FormCheckbox,
  ChooseOnePerson,
  wrapTable
} from '../component'

const soul = {
  Control,
  ModelEditor,
  WrapCard,
  CodeEditor,
  RenderDev,
  WrapModal,
  FormInput,
  FormSelect,
  FormNumber,
  FormDate,
  FormUpload,
  FormRadio,
  FormCheckbox,
  ChooseOnePerson,
  wrapTable
};

const install = function (Vue, opts = {}) {
  Object.keys(soul).forEach((key) => {
    Vue.component(key, soul[key]);
  });
};

export default Object.assign(soul, {install});
