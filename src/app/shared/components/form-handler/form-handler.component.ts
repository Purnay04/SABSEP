import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';

import {
  FormBuilder,
  FormGroup,
} from '@angular/forms';
import { ControlBuilderStructure, FooterActions, FormGroupArrayTemplate, FormMeta, LabelOrientation, customTemplateRef } from '../../types/form';

@Component({
  selector: 'form-handler',
  templateUrl: './form-handler.component.html',
  styleUrls: ['./form-handler.component.scss'],
})
export class FormHandlerComponent implements OnInit {
  @Input({ required: true, alias: 'form' })
  formMeta!: FormMeta;

  @Input({ alias: 'customTemplates' })
  customTemplateRef!: customTemplateRef;

  @Output('formSubmitEventHandler')
  onSubmit: EventEmitter<any> = new EventEmitter();

  footerActions!: FooterActions;

  formName!: string;
  formLabelOrientation: LabelOrientation = 'Horizontal';

  form!: FormGroup;
  formGroupsInfo: FormGroupArrayTemplate = {};
  groupNames: string[] = [];

  constructor(
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit(): void {
    console.log(this.formMeta);
    this.formName = this.formMeta.formName;
    this.formLabelOrientation = this.formMeta.formLabelOrientation;
    this.footerActions = this.formMeta.footerActions;
    this.createFormGroup(this.formMeta.formGroups);
  }

  createFormGroup(formGroups: FormGroupArrayTemplate) {
    this.formGroupsInfo = formGroups;
    this.groupNames = Object.keys(formGroups);
    var groups: { [groupName: string]: FormGroup } = {};
    this.groupNames.forEach((group) => {
      var controls: ControlBuilderStructure = {};
      formGroups[group].controls.forEach((control) => {
        controls[control.name] = [
          control.value || '',
          control.validators || [],
        ];
      });
      groups[group] = this.formBuilder.group(controls, {
        validators: formGroups[group].groupLevelValidation || [],
      });
    });
    this.form = this.formBuilder.group(groups);
  }

  handleSubmit() {
    console.log("handleSubmit:",this.form.getRawValue());
    this.onSubmit.emit(this.form.getRawValue());
  }
}
