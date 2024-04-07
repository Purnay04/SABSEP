import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { BreadcrumbService } from '@sabspl-frontend/shared-module/services/breadcrumb.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ]
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
