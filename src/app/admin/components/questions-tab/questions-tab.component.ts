import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BreadcrumbService } from 'src/app/services/breadcrumb.service';
import { QuestionGridCellRendererComponent } from './questions-grid-cell-renderer.component';
import { Subject, takeUntil } from 'rxjs';
import { AdminCoreService } from '../../services/admin-core.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { GridHandlerService } from 'src/app/shared/services/grid-handler.service';
import { AgGridHandlerComponent } from 'src/app/shared/components/ag-grid-handler/ag-grid-handler.component';

@Component({
  selector: 'app-questions-tab',
  templateUrl: './questions-tab.component.html',
  styleUrls: ['./questions-tab.component.scss']
})
export class QuestionsTabComponent {
  @ViewChild('QuestionsGrid') questionsGrid!: AgGridHandlerComponent;
  cellRendererComponents: any = {
    'qGridCellRendererComponent': QuestionGridCellRendererComponent
  }
  private destroy$ = new Subject<void>();
  categoryList: {name: string, code: any}[] = [];
  categoryToFilter: string = "all";
  isPageLoaded: boolean = false;
  constructor(
    private breadcrumbService : BreadcrumbService,
    private router: Router,
    private adminCoreService : AdminCoreService,
    private ngxSpinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.ngxSpinner.show('questionsTab');
    this.breadcrumbService.addItem({
      name: "Questions List",
      url: "/admin/questionsList"
    })
    this.adminCoreService
      .getAllCategories()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (optionList: any) => {
          this.categoryList = optionList.map((category: any) => {
            return {name: category, code: category}
          });
        },
        error: (err : any) => this.ngxSpinner.hide('questionsTab'),
        complete: () => this.ngxSpinner.hide('questionsTab')
      }
    )
  }

  addQuestion() {
    this.breadcrumbService.popItem();
    this.router.navigate(
      ['admin', 'questionForm'],
      { queryParams: {mode: 'ADD'}}
    );
  }

  categoryGridLevelFilterHandler() {
    this.questionsGrid.addColumnFilters(this.categoryToFilter !== 'all' ? {
      category: {
        filter: this.categoryToFilter,
        type: "equals",
        filterType: "text"
      }
    } : {});
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}