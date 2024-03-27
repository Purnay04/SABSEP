import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BreadcrumbService } from 'src/app/services/breadcrumb.service';

@Component({
  selector: 'app-questions-tab',
  templateUrl: './questions-tab.component.html',
  styleUrls: ['./questions-tab.component.scss']
})
export class QuestionsTabComponent {

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
    this.router.navigate(['admin', 'questionForm']);
  }
}
