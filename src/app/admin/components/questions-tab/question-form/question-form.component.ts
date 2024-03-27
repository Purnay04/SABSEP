import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { BreadcrumbService } from 'src/app/services/breadcrumb.service';
import { FormMeta } from 'src/app/shared/types/form';

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.scss']
})
export class QuestionFormComponent {
  questionFormMeta!: FormMeta;
  constructor(
    private breadcrumbService : BreadcrumbService
  ) { }

  ngOnInit() {
    this.breadcrumbService.addItem({
      name: "Questions Form",
      url: "/admin/questionForm"
    });
    this.questionFormMeta = {
      formName: 'testConfig',
      formLabelOrientation: 'Vertical',
      formGroups: {
        questionForm: {
          titlePresent: false,
          designType: 'NormalLayout',
          controls: [
            {
              fieldType: 'editor',
              label: 'Question',
              name: 'question',
              required: true,
              // value: this.examVariables.id || '',
              // hidden: true,
            },
            {
              fieldType: 'dropDown',
              label: 'Category',
              name: 'category',
              required: true,
              width: '20rem',
              options: [
                {
                  name: 'Category 1',
                  code: 'C1'
                },
                {
                  name: 'Category 2',
                  code: 'C2'
                },
                {
                  name: 'Category 3',
                  code: 'C3'
                }
              ],
              validators: [Validators.required],
              // value: this.examVariables.totalMarks
            }
          ],
        },
        optionsForm: {
          titlePresent: true,
          title: 'Options',
          designType: 'NormalLayout',
          controls: [
            {
              fieldType: 'textArea',
              label: 'Option 1',
              name: 'option1',
              required: true,
              rows: 4,
              cols: 20,
              validators: [Validators.required]
            },
            {
              fieldType: 'textArea',
              label: 'Option 2',
              name: 'option2',
              required: true,
              rows: 4,
              cols: 40,
              validators: [Validators.required]
            },
            {
              fieldType: 'textArea',
              label: 'Option 3',
              name: 'option3',
              required: false,
              rows: 4,
              cols: 40
            },
            {
              fieldType: 'textArea',
              label: 'Option 4',
              name: 'option4',
              required: false,
              rows: 4,
              cols: 40
            }
          ]
        }
      },
      footerActions: {
        type: 'SplitInTwoActions',
        action: {
          name: 'Save',
        },
      },
    };
  }

  submitEventHandler(eventData: any) {
    console.log("qf", eventData);
  }
}
