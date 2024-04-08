import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';

import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  ControlBuilderStructure,
  FooterActions,
  FormGroupArrayTemplate,
  FormMeta,
  LabelOrientation,
  customTemplateRef,
  FormArrayTemplate
} from '../../types/form';
import { isNullOrUndefined } from '@sabspl-frontend/shared-module/utils';
import { CommonModule } from '@angular/common';
import { EditorModule } from 'primeng/editor';
import { ChipsModule } from 'primeng/chips';

@Component({
  selector: 'form-handler',
  templateUrl: './form-handler.component.html',
  styleUrls: ['./form-handler.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    EditorModule,
    ChipsModule
  ]
})
export class FormHandlerComponent implements OnInit {
  @Input({ required: true, alias: 'form' })
  formMeta!: FormMeta;

  @Input({ alias: 'customTemplates' })
  customTemplateRef!: customTemplateRef;

  @Output('formSubmitEventHandler')
  onSubmit: EventEmitter<any> = new EventEmitter();

  @Output('closeEventEventHandler')
  onClose: EventEmitter<any> = new EventEmitter();

  @Input()
  fieldChangeHandler!: any;

  @Input()
  formWrap: boolean = false;

  footerActions!: FooterActions | undefined;

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

  isFormArrayTemplate = (x: any) : x is FormArrayTemplate => x.controls != null;

  createFormGroup(formGroups: FormGroupArrayTemplate) {
    this.formGroupsInfo = formGroups;
    this.groupNames = Object.keys(formGroups);
    var groups: { [groupName: string]: FormGroup | FormArray } = {};
    this.groupNames.forEach((group) => {
      // if(this.isFormArrayTemplate(formGroups[group])) {
      //   var subGroupArray : FormGroup[] = [];
      //   formGroups[group].controls.forEach((control) => {
      //     var controls: ControlBuilderStructure = {}
      //     controls[control.name] = [
      //       control.value || '',
      //       control.validators || [],
      //     ];
      //     subGroupArray.push(this.formBuilder.group(controls));
      //   })
      //   groups[group] = this.formBuilder.array(subGroupArray, {
      //     validators: formGroups[group].validation || []
      //   });
      // }
      // else {
        var controls: ControlBuilderStructure = {};
        formGroups[group].controls.forEach((control) => {
          controls[control.name] = [
            {value: !isNullOrUndefined(control.value) ? control.value : '', disabled: control.disabled || false},
            control.validators || [],
          ];
        });
        groups[group] = this.formBuilder.group(controls, {
          validators: formGroups[group].validation || [],
        });
      // }
    });
    this.form = this.formBuilder.group(groups);
  }

  fieldChangeListener(subFormName: string, controlName: string, fieldType: string, $event: any) {
    let formControl = this.form.get(subFormName)?.get(controlName);
    if(formControl && !!this.fieldChangeHandler) {
      this.fieldChangeHandler(controlName, formControl, fieldType, $event);
    }
  }

  handleSubmit() {
    console.log("handleSubmit:",this.form.getRawValue());
    this.onSubmit.emit(this.form.getRawValue());
  }

  closeEventHandler() {
    this.onClose.emit();
  }
}
