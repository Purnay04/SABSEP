import { TemplateRef } from '@angular/core';
import { ValidatorFn } from '@angular/forms';

export type LabelOrientation = 'Vertical' | 'Horizontal';
export type ControlBuilderStructure = {
  [controlName: string]: (string | number | boolean | ValidatorFn[])[];
};

export type FormMeta = {
  formName: string;
  formLabelOrientation: LabelOrientation;
  formGroups: FormGroupArrayTemplate;
  footerActions: FooterActions;
};

export type FooterActions = {
  type: 'SingleFullWidth';
  action: FormActionButton;
};

export type FormActionButton = {
  name: string;
};

export type FormGroupArrayTemplate = {
  [groupName: string]: FormGroupTemplate;
};

export type FormGroupTemplate = {
  controls: (FieldTextbox | FieldCheckbox)[];
  groupLevelValidation?: ValidatorFn[];
};

export interface BaseField {
  label: string;
  name: string;
  required: boolean;
  value?: string | number | boolean;
  validators?: ValidatorFn[];
}

export type FieldTextbox = BaseField & {
  fieldType: 'textbox';
  inputType?: string;
};

type IsFieldTextbox<T> = T extends FieldTextbox ? true : false;

export type FieldCheckbox = BaseField & {
  fieldType: 'checkbox';
};

export type customTemplateRef = {
  [templateFor: string]: TemplateRef<any>;
};
