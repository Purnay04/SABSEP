import { Component, TemplateRef, ViewChild } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { BreadcrumbService } from 'src/app/services/breadcrumb.service';
import { FieldTextbox, FormMeta } from 'src/app/shared/types/form';
import { Validators } from '@angular/forms';
import { AdminCoreService } from '../../services/admin-core.service';
import { Subject, takeUntil } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { AddCategoryComponent } from '../add-category/add-category.component';


export type ExamVariables = {
  id?: string,
  totalMarks: number,
  categories: Map<string, number>,
  duration: number
}

@Component({
  selector: 'app-test-configuration',
  templateUrl: './test-configuration.component.html',
  styleUrls: ['./test-configuration.component.scss']
})
export class TestConfigurationComponent {
  private destroy$ = new Subject<void>();

  dialogRef!: DynamicDialogRef;

  showEditTestConfigurationForm : boolean = false;
  showViewCategoryForm: boolean = false;
  examVariables!: ExamVariables;
  initialDataLoaded: boolean = false;
  editConfigurationFormMeta!: FormMeta;

  constructor(
    private breadcrumbService : BreadcrumbService,
    private adminCoreService: AdminCoreService,
    public dialogService: DialogService,
    private ngxSpinner: NgxSpinnerService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.ngxSpinner.show('testConfiguration');
    this.getTestConfigurationDetails();
    this.breadcrumbService.addItem({
      name: "Test Configuration",
      url: "/admin/testConfig"
    })
  }

  getTestConfigurationDetails() {
    this.adminCoreService
      .getExamConfiguration()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response: ExamVariables) => {
          this.ngxSpinner.hide('testConfiguration');
          this.examVariables = {
            ...response,
            categories: new Map<string, number>(Object.entries(response.categories || {}))
          };
          this.initialDataLoaded = true;
        },
        error: (err: any) => {
          this.ngxSpinner.hide('testConfiguration');
        }
      }
    )
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
  }

  public chartOptions: any = {
    series: [
      {
        name: 'Sales',
        data: [30, 40, 35, 50, 49, 60, 70, 91, 125],
      },
    ],
    chart: {
      height: 350,
      type: 'line',
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
    },
  };


  editTestConfiguration() {
    if(this.showEditTestConfigurationForm) {
      return;
    }
    this.showEditTestConfigurationForm = true;
    this.showViewCategoryForm = false;
    this.editConfigurationFormMeta = {
      formName: 'testConfig',
      formLabelOrientation: 'Vertical',
      formGroups: {
        testConfigMeta: {
          titlePresent: false,
          designType: 'NormalLayout',
          controls: [
            {
              fieldType: 'textbox',
              label: '',
              name: 'id',
              required: false,
              value: this.examVariables.id || '',
              hidden: true,
            },
            {
              fieldType: 'textbox',
              inputType: 'text',
              label: 'Exam Total Marks',
              name: 'totalMarks',
              required: true,
              validators: [Validators.required],
              value: this.examVariables.totalMarks
            },
            {
              fieldType: 'textbox',
              inputType: 'number',
              label: 'Exam Duration',
              name: 'duration',
              required: true,
              validators: [Validators.required],
              value: this.examVariables.duration
            }
          ],
        },
        testConfigCategory: {
          titlePresent: true,
          title: 'Category',
          designType: 'TableLayout',
          styleClass: 'basis-48 overflow-y-auto pr-2',
          controls: [],
        }
      },
      footerActions: {
        type: 'SplitInTwoActions',
        action: {
          name: 'Save',
        },
      },
    };
    let categories: FieldTextbox[]  = []
    if(this.examVariables.categories.size > 0) {
      this.examVariables.categories.forEach((value, key) => {
        categories.push({
          fieldType: 'textbox',
          inputType: 'number',
          label: key,
          name: key,
          required: true,
          validators: [Validators.required],
          value: value
        })
      });
    }
    this.editConfigurationFormMeta.formGroups['testConfigCategory'].controls = categories;
  }

  submitEventHandler(formResponse: any) {
    this.ngxSpinner.show('testConfiguration');
    console.log("formResponse", {
      category: formResponse.testConfigCategory,
      ...formResponse.testConfigMeta
    });
    let payload = {
      categories: formResponse.testConfigCategory,
      ...formResponse.testConfigMeta
    }
    this.adminCoreService
      .saveExamConfiguration(payload)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response: any) => this.getTestConfigurationDetails(),
        error: (err: any) => {
          console.log(err);
          this.messageService.clear();
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: err.error.ErrorMsg
          })
          this.ngxSpinner.hide('testConfiguration')
        },
        complete: () => {
          this.messageService.clear();
          this.messageService.add({
            severity: 'success',
            // summary: 'Success',
            detail: 'Test Configuration Updated Successfully'
          });
          this.showEditTestConfigurationForm = false;
          this.ngxSpinner.hide('testConfiguration')
        }
      }
    )
  }

  closeTestConfigurationForm(eventData: any) {
    this.showEditTestConfigurationForm = false;
  }

  closeEditCategoryForm() {
    this.showViewCategoryForm = false;
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
