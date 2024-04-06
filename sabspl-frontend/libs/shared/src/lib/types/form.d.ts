import { TemplateRef } from '@angular/core';
import { ValidatorFn } from '@angular/forms';

export type LabelOrientation = 'Vertical' | 'Horizontal';
export type controlValueStructure = {
  value: string | number | boolean | string[],
  disabled: boolean
}
export type ControlBuilderStructure = {
  [controlName: string]: (controlValueStructure | ValidatorFn[])[];
};

export type FormMeta = {
  formName: string;
  formLabelOrientation: LabelOrientation;
  formGroups: FormGroupArrayTemplate;
  footerActions?: FooterActions;
};

export type FooterActions = {
  type: 'SingleFullWidth' | 'SplitInTwoActions';
  action: FormActionButton;
};

export type FormActionButton = {
  name: string;
};

export type FormGroupArrayTemplate = {
  [groupName: string]: FormGroupTemplate;
};

export type FormArrayTemplate = {
  titlePresent: boolean,
  title?: string,
  designType?: 'TableLayout' | 'NormalLayout'
  controls: (FieldTextbox | FieldCheckbox)[];
  validation?: ValidatorFn[];
}

export type FormGroupTemplate = {
  titlePresent: boolean,
  title?: string,
  designType?: 'TableLayout' | 'NormalLayout'
  controls: (FieldTextbox | FieldCheckbox | EditorField | TextAreaField | DropDownField | ChipsField)[];
  styleClass?: string
  validation?: ValidatorFn[];
};

export interface BaseField {
  label: string;
  name: string;
  required: boolean;
  disabled?: boolean;
  placeholder?: string,
  value?: string | number | boolean | string[];
  validators?: ValidatorFn[];
  hidden?: boolean;
}

export type FieldTextbox = BaseField & {
  fieldType: 'textbox';
  inputType?: string;
};

type IsFieldTextbox<T> = T extends FieldTextbox ? true : false;

export type FieldCheckbox = BaseField & {
  fieldType: 'checkbox';
};

export type EditorField = BaseField & {
  fieldType: 'editor';
}

export type TextAreaField = BaseField & {
  fieldType: 'textArea',
  cols: number,
  rows: number
}

type IsFieldTextArea<T> = T extends TextAreaField ? true : false;

type OptionType = {
  name: string,
  code: any
}

export type DropDownField = BaseField & {
  fieldType: 'dropDown',
  options: OptionType[],
  width?: string
}

export type ChipsField = BaseField & {
  fieldType: 'chipsField';
};

export type customTemplateRef = {
  [templateFor: string]: TemplateRef<any>;
};
