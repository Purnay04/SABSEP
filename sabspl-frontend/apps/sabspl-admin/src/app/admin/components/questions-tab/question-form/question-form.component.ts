import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subject, combineLatest, takeUntil } from 'rxjs';
import { AddCategoryComponent } from '../../add-category/add-category.component';
import { AdminCoreService } from '@sabspl-frontend/admin/admin/services/admin-core.service';
import { FormHandlerComponent } from '@sabspl-frontend/shared';
import { FormMeta, TextAreaField } from '@sabspl-frontend/shared-module/types/form';
import { BreadcrumbService } from '@sabspl-frontend/shared';
import { isNullOrUndefined } from '@sabspl-frontend/admin/app.component';

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.scss']
})
export class QuestionFormComponent {
  @ViewChild('addCategoryBtn') addCategoryButtonTemplateRef!: TemplateRef<any>;
  @ViewChild('questionForm') questionFormComponent!: FormHandlerComponent;
  @ViewChild('chipsHintCaption') chipsHintCaptionTemplateRef!: TemplateRef<any>;
  private destroy$ = new Subject<void>();
  mode: 'EDIT' | 'ADD' = 'ADD';
  isPageLoaded: boolean = false;
  dialogRef!: DynamicDialogRef;
  customFormTemplate = {};
  questionFormMeta: FormMeta = {
    formName: 'testConfig',
    formLabelOrientation: 'Vertical',
    formGroups: {
      questionForm: {
        titlePresent: false,
        designType: 'NormalLayout',
        controls: [],
      },
      options: {
        titlePresent: true,
        title: 'Options',
        designType: 'NormalLayout',
        controls: []
      }
    },
    footerActions: {
      type: 'SplitInTwoActions',
      action: {
        name: 'Save',
      },
    },
  };
  constructor(
    private breadcrumbService : BreadcrumbService,
    private route: ActivatedRoute,
    private router: Router,
    private adminCoreService: AdminCoreService,
    private messageService: MessageService,
    private ngxSpinner: NgxSpinnerService,
    public dialogService: DialogService
  ) { }

  ngOnInit() {
    this.ngxSpinner.show('questionForm');
    this.breadcrumbService.addItem({
      name: "Questions Form",
      url: "/admin/questionForm"
    });
    this.route
      .queryParams
      .subscribe({
        next: (params: any) => {
          this.mode = params['mode'];
          this.initializeForm(params['qid']);
        }
      }
    );
  }

  ngAfterViewInit() {
    this.customFormTemplate = {
      category: this.addCategoryButtonTemplateRef,
      answersHint: this.chipsHintCaptionTemplateRef,
    };
  }

  initializeForm(qid: string) {
    if(this.mode === 'EDIT' && !isNullOrUndefined(qid)) {
      var categoryList$ =  this.adminCoreService.getAllCategories();
      var questionDetaills$ = this.adminCoreService.getQuestion(qid);
      combineLatest([categoryList$, questionDetaills$])
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: ([categoryList, questionDetaills]) => {
            var optionList: {name: string, code: any}[] = categoryList.map((category: any) => {
              return {name: category, code: category}
            })
            this.fillControls(optionList, questionDetaills);
            this.isPageLoaded = true;
            this.ngxSpinner.hide('questionForm');
          },
          error: (err: any) => {
            this.isPageLoaded = true;
            this.ngxSpinner.hide('questionForm');
          }
        })
      return
    }
    this.adminCoreService
      .getAllCategories()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (categoryList: any) => {
          var optionList: {name: string, code: any}[] = categoryList.map((category: any) => {
            return {name: category, code: category}
          })
          this.fillControls(optionList);
          this.isPageLoaded = true;
          this.ngxSpinner.hide('questionForm');
        },
        error: (err: any) => {
          this.isPageLoaded = true;
          this.ngxSpinner.hide('questionForm');
        }
      })
  }

  fillControls(categoryList: {name: string, code: any}[], editingData?: any) {
    this.questionFormMeta
      .formGroups['questionForm'].controls = [
        {
          fieldType: 'textbox',
          label: '',
          name: 'id',
          required: false,
          value: (!isNullOrUndefined(editingData) && editingData.id) ? editingData.id : null,
          hidden: true,
        },
        {
          fieldType: 'editor',
          label: 'Question',
          name: 'question',
          required: true,
          validators: [Validators.required],
          value: (!isNullOrUndefined(editingData) && editingData.question) ? editingData.question : '',
        },
        {
          fieldType: 'dropDown',
          label: 'Category',
          name: 'category',
          required: true,
          width: '20rem',
          disabled: this.mode === 'EDIT',
          options: !isNullOrUndefined(categoryList) ? categoryList : [],
          validators: [Validators.required],
          value: (!isNullOrUndefined(editingData) && editingData.category) ? editingData.category : ''
        },
        {
          fieldType: 'chipsField',
          label: 'Answers',
          name: 'answers',
          required: true,
          placeholder: 'Hint: 1, 2, 3',
          validators: [Validators.required],
          value: (!isNullOrUndefined(editingData) && editingData.answers) ? this.convertArrayToOptionList(editingData.answers) : []
        }
    ]
    var optionsAreas: TextAreaField[] = [];
    for(var i = 0; i < 4; i++) {
      optionsAreas.push({
        fieldType: 'textArea',
        label: `Option ${i + 1}`,
        name: `option${i + 1}`,
        required: (i == 0 || i == 1),
        rows: 2,
        cols: 20,
        value: (!isNullOrUndefined(editingData) && editingData.options[i]) ? editingData.options[i] : '',
        ...((i == 0 || i == 1) && {validators: [Validators.required]})
      } as TextAreaField)
    }
    this.questionFormMeta
      .formGroups['options'].controls = optionsAreas;
  }

  submitEventHandler(formResponse: any) {
    let errorMesssages : string[] = []
    if(!this.validate(formResponse, errorMesssages) && errorMesssages.length > 0) {
      this.messageService.add({
        key: 'adminToast',
        severity: 'error',
        summary: 'Error',
        detail: errorMesssages[0]
      })
      return;
    }
    let payload = {
      ...formResponse.questionForm,
      id: this.mode === 'ADD' ? null: formResponse.questionForm.id,
      options: Object.keys(formResponse.options).map(opt => formResponse.options[opt].trim()).filter(opt => opt !== null && opt !== ""),
      answers: formResponse.questionForm.answers.map((val: string) => val.replace("OPTION-", "")),
    }
    console.log("qf", payload);
    this.adminCoreService
      .addQuestion(payload)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response: any) => {
          this.messageService.clear('adminToast');
          this.messageService.add({
            key:'adminToast',
            severity: 'success',
            detail: `Question ${this.mode === 'EDIT' ? 'Updated' : 'Added'} Successfully`
          })
          this.closeQuestionForm();
        },
        error: (err: any) => {
          this.messageService.clear('adminToast');
          this.messageService.add({
            key: 'adminToast',
            severity: 'error',
            detail: 'Something is Wrong!'
          })
        }
      })

  }

  validate(formResponse: any, errorMesssages: string[]) : boolean {
    let options = Object.keys(formResponse.options).map(opt => formResponse.options[opt].trim());
    let answers = formResponse.questionForm.answers.map((val: string) => val.replace("OPTION-", ""));
    if(answers.filter((ans : string) => ['1','2','3','4'].includes(ans)).length !== answers.length){
      errorMesssages.push("Answer should be Option- 1, 2, 3, 4. Please check answers");
      return false;
    }
    let notPresentOptions = answers.filter((ans : string) => options[Number(ans) - 1].trim() === "");
    if(notPresentOptions.length > 0) {
      errorMesssages.push(`Option should be present for answer : ${notPresentOptions.toString()}`);
      return false;
    }
    options = options.filter(opt => opt !== null && opt !== "");
    if(answers.length >= options.length) {
      errorMesssages.push("Answers should not be greater than & equal to options. Please check options");
      return false;
    }
    return true;
  }

  closeQuestionForm(eventData?: any) {
    this.breadcrumbService.popItem();
    this.router.navigate(['admin', 'questionsList']);
  }

  openDialog() {
    this.dialogRef = this.dialogService.open(AddCategoryComponent, {
      header: 'Add Category',
      width: '30rem',
      contentStyle: {
        'max-height': 'fit-content',
        overflow: 'auto',
      },
      modal: true,
    });
    this.dialogRef
      .onClose
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (formResponse: any) => {
          if(!isNullOrUndefined(formResponse.status) && formResponse.status === 'ADDED') {
            this.refreshCategoryList();
          }
        }
      })
  }

  refreshCategoryList() {
    this.adminCoreService
      .getAllCategories()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (newCategoryList: any) => {
          var newOptionList: {name: string, code: any}[] = newCategoryList.map((category: any) => {
            return {name: category, code: category}
          })
          var categoryControl: any= this.questionFormComponent
                                        .formMeta.formGroups['questionForm']
                                        .controls.filter(ctrl => ctrl.fieldType === 'dropDown' && ctrl.name === 'category');
          if(!isNullOrUndefined(categoryControl)){
            categoryControl[0].options.splice(0, categoryControl[0].options.length);
            categoryControl[0].options.push(...newOptionList);
          }
        }
      })
  }

  formFieldChangeHandler(controlName:string, formControl: FormControl, fieldType: string, event: any) {
    console.log(`formFieldChangeHandler: ${controlName}, ${fieldType} ${formControl.getRawValue()}`);
    let value = formControl.getRawValue();
    if (!['1', '2', '3', '4'].includes(event.value) || value.filter((val: string)=> val.replace("OPTION-", "") === event.value).length > 1 || value.length > 3) {
      // Remove the last chip added
      value.pop();
      formControl.setValue(value);
      return; // Prevent adding the chip
    }
    formControl.setValue(this.convertArrayToOptionList(value));
  }

  validateChips(control: FormControl) {
    const value = control.value;
    if (value.length > 3) {
      return { maxChips: true };
    }
    if (!value.every((v: any) => [1, 2, 3, 4].includes(v))) {
      return { invalidValue: true };
    }
    return null;
  }

  convertArrayToOptionList(value : string[]) {
    return value.map((val: string) => !val.startsWith("OPTION-") ? `OPTION-${val}` : val)
  }


  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
