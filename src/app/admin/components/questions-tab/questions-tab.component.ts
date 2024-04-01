import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BreadcrumbService } from 'src/app/services/breadcrumb.service';
import { QuestionGridCellRendererComponent } from './questions-grid-cell-renderer.component';

@Component({
  selector: 'app-questions-tab',
  templateUrl: './questions-tab.component.html',
  styleUrls: ['./questions-tab.component.scss']
})
export class QuestionsTabComponent {
  cellRendererComponents: any = {
    'qGridCellRendererComponent': QuestionGridCellRendererComponent
  }
  constructor(
    private breadcrumbService : BreadcrumbService,
    private router: Router
  ) { }

  ngOnInit() {
    this.breadcrumbService.addItem({
      name: "Questions List",
      url: "/admin/questionsList"
    })
  }

  addQuestion() {
    this.breadcrumbService.popItem();
    this.router.navigate(
      ['admin', 'questionForm'],
      { queryParams: {mode: 'ADD'}}
    );
  }
}
