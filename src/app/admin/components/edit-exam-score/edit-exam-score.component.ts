import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormMeta } from 'src/app/shared/types/form';

@Component({
  selector: 'app-edit-exam-score',
  templateUrl: './edit-exam-score.component.html',
  styleUrls: ['./edit-exam-score.component.scss']
})
export class EditExamScoreComponent {
  formMeta: FormMeta = {
    formName: 'editCategory',
    formLabelOrientation: 'Vertical',
    formGroups: {
      editCategory: {
        titlePresent: false,
        controls: [
          {
            fieldType: 'textbox',
            inputType: 'text',
            label: 'Name',
            name: 'categoryName',
            required: true,
            validators: [Validators.required],
          },
          {
            fieldType: 'textbox',
            inputType: 'text',
            label: 'Code',
            name: 'categoryCode',
            required: true,
            validators: [Validators.required],
          },
          {
            fieldType: 'editor',
            label:'Question',
            name: 'question',
            required : false
          }
        ],
      },
    }
  };

  constructor() { }

  ngOnInit() {

  }

  submitEventHandler(formResponse: any) {
    console.log("response", formResponse);
  }

  closeTestConfigurationForm(eventData: any) {
  }
}
