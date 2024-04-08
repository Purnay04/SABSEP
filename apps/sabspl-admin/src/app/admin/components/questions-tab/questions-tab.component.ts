import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionGridCellRendererComponent } from './questions-grid-cell-renderer.component';
import { Subject, catchError, of, switchMap, takeUntil } from 'rxjs';
import { AdminCoreService } from '../../services/admin-core.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { BreadcrumbService, LockingResourceService } from '@sabspl-frontend/shared';
import { AgGridHandlerComponent } from '@sabspl-frontend/shared';

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
    private ngxSpinner: NgxSpinnerService,
    private lockingResourceService: LockingResourceService
  ) { }

  ngOnInit() {
    this.ngxSpinner.show('questionsTab');
    this.breadcrumbService.addItem({
      name: "Questions List",
      url: "/admin/questionsList"
    })
    let lockingResource$ = this.lockingResourceService
                               .lockResource(this.router.url)
                               .pipe(
                                catchError(error => {
                                  console.log(error);
                                  return of('Error Value');
                                })
                               );
    let getAllCategories$ = this.adminCoreService
                                .getAllCategories()
                                .pipe(
                                  catchError(error => {
                                    console.log(error);
                                    return of('Error Value');
                                  })
                                 );
    lockingResource$
      .pipe(
        takeUntil(this.destroy$),
        switchMap(() => getAllCategories$)
      )
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
    this.lockingResourceService
      .unlockResource(this.router.url)
      .pipe(takeUntil(this.destroy$))
      .subscribe();
    this.destroy$.next();
    this.destroy$.complete();
  }
}
