import { Component } from '@angular/core';
import { BreadcrumbService } from 'src/app/services/breadcrumb.service';

@Component({
  selector: 'app-applied-users',
  templateUrl: './applied-users.component.html',
  styleUrls: ['./applied-users.component.scss']
})
export class AppliedUsersComponent {

  constructor(
    private breadcrumbService : BreadcrumbService
  ) { }

  ngOnInit() {
    this.breadcrumbService.addItem({
      name: "Applied Users",
      url: "/admin/appliedUsers"
    })
  }
}
