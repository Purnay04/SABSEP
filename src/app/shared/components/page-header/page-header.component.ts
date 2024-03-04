import { Component, Input } from '@angular/core';
import { BreadcrumbService } from 'src/app/services/breadcrumb.service';

@Component({
  selector: 'page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent {
  @Input({required: true}) title!: string;
  breadCrumbdsItems: any[] = [
    {
      title: "Dashboard",
      url: "/admin/dashboard"
    },
    {
      title: "Test Configuration",
    }
  ];

  constructor(
    public breadcrumbService : BreadcrumbService
  ) { }
}
