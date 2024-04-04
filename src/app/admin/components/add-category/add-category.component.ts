import { Component, ViewChild } from '@angular/core';
import { Validators } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormMeta } from 'src/app/shared/types/form';
import { AdminCoreService } from '../../services/admin-core.service';
import { Subject, takeUntil } from 'rxjs';
import { MessageService } from 'primeng/api';
import { FormHandlerComponent } from 'src/app/shared/components/form-handler/form-handler.component';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent {
  @ViewChild('AddCategoryForm') addCategoryForm!: FormHandlerComponent;
  private destroy$ = new Subject<void>();
  formMeta: FormMeta = {
    formName: 'addCategory',
    formLabelOrientation: 'Vertical',
    formGroups: {
      category: {
        titlePresent: false,
        controls: [
          {
            fieldType: 'textbox',
            inputType: 'text',
            label: 'Title',
            name: 'title',
            required: true,
            validators: [Validators.required],
          },
        ],
      },
    }
  };

  constructor(
    private dialogRef: DynamicDialogRef,
    private adminCoreService: AdminCoreService,
    private messageService: MessageService
  ) { }

  ngOnInit() {

  }

  submitEventHandler() {
    var formResponse = this.addCategoryForm.form.getRawValue();
    console.log("response", formResponse);
    this.adminCoreService
      .addCategory(formResponse.category)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res: any) => {
          this.messageService.clear('adminToast');
          this.messageService.add({
            key: 'adminToast',
            severity: 'success',
            detail: 'Category Addedd Successfully'
          });
          this.dialogRef.close({
            status: 'ADDED'
          })
        },
        error: (err: any) => {
          console.log(err);
          this.messageService.clear('adminToast');
          this.messageService.add({
            key: 'adminToast',
            severity: 'error',
            summary: 'Error',
            detail: err.error.msg
          });
        }
      })
  }

  closeTestConfigurationForm() {
    this.dialogRef.close();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
