import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { ICellRendererAngularComp } from "ag-grid-angular";
import { ICellRendererParams } from "ag-grid-community";
import { BreadcrumbService } from "src/app/services/breadcrumb.service";

@Component({
  selector: 'q-grid-cell-renderer',
  template: `
    <ng-container [ngSwitch]="params.colDef.field">
      <div *ngSwitchCase="'edit'">
        <button class="" (click)="editQuestion()" title="edit">
          <lucide-angular name="Edit" class="my-icon hover:text-primary" [size]="18" [strokeWidth]="'1.5'"></lucide-angular>
          <span class="md:hidden">Edit</span>
        </button>
      </div>
      <div *ngSwitchCase="'delete'">
        <button class="" (click)="deleteQuestion()" title="edit">
          <lucide-angular name="Trash" class="my-icon hover:text-primary" [size]="18" [strokeWidth]="'1.5'"></lucide-angular>
          <span class="md:hidden">Delete</span>
        </button>
      </div>
    </ng-container>
  `
})
export class QuestionGridCellRendererComponent implements ICellRendererAngularComp {
  params!: any;

  constructor(
    private breadcrumbService : BreadcrumbService,
    private router: Router
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

  deleteQuestion() {

  }

}