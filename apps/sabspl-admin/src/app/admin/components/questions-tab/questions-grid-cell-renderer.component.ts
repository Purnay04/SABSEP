import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { BreadcrumbService } from "@sabspl-frontend/shared";
import { ICellRendererAngularComp } from "ag-grid-angular";
import { ICellRendererParams } from "ag-grid-community";
import { AdminCoreService } from "../../services/admin-core.service";
import { ConfirmationService, MessageService } from "primeng/api";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'q-grid-cell-renderer',
  template: `
    <ng-container [ngSwitch]="params.colDef.field">
      <div *ngSwitchCase="'edit'">
        <button class="" (click)="editQuestion()" title="edit">
          <lucide-angular name="Edit" class="my-icon hover:text-primary" [size]="18" [strokeWidth]="'1.5'"></lucide-angular>
        </button>
      </div>
      <div *ngSwitchCase="'delete'">
        <button class="" (click)="deletePrompt($event)" title="edit">
          <lucide-angular name="Trash" class="my-icon hover:text-primary" [size]="18" [strokeWidth]="'1.5'"></lucide-angular>
        </button>
      </div>
    </ng-container>
  `
})
export class QuestionGridCellRendererComponent implements ICellRendererAngularComp {
  params!: any;

  constructor(
    private breadcrumbService : BreadcrumbService,
    private router: Router,
    private adminCoreService: AdminCoreService,
    private messageService: MessageService,
    private ngxSpinner: NgxSpinnerService,
    private confirmationService: ConfirmationService
  ) {}

  agInit(params: ICellRendererParams<any, any, any>): void {
    this.params = params;
    console.log('TCGridCellRendererComponent', params);
  }

  refresh(params: ICellRendererParams<any, any, any>): boolean {
    this.params = params;
    return true;
  }

  editQuestion() {
    this.breadcrumbService.popItem();
    this.router.navigate(
      ['admin', 'questionForm'],
      { queryParams: {mode: 'EDIT', qid: this.params.data.id}}
    );
  }

  deletePrompt(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'Trash',
      acceptIcon:"none",
      rejectIcon:"none",
      rejectButtonStyleClass:"p-button-text",
      accept: () => {
        this.deleteQuestion();
      },
      reject: () => {

      }
    });
  }

  deleteQuestion() {
    this.ngxSpinner.show('questionsTab');
    this.adminCoreService
      .deleteQuestion(this.params.data.id)
      .subscribe({
        error: (err: any) => {
          this.messageService.clear('adminToast');
          this.messageService.add({
            key: 'adminToast',
            severity: 'error',
            summary: 'Error',
            detail: err.error.ErrorMsg
          });
          this.ngxSpinner.hide('questionsTab');
        },
        complete: () => {
          this.messageService.clear('adminToast');
          this.messageService.add({
            key: 'adminToast',
            severity: 'success',
            summary: 'Success',
            detail: 'Question Deleted Successfully'
          });
          this.ngxSpinner.hide('questionsTab');
        }
      }
    );
  }
}