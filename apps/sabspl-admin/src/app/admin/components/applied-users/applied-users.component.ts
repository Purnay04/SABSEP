import { Component } from '@angular/core';
import { BreadcrumbService } from '@sabspl-frontend/shared';

@Component({
  selector: 'app-applied-users',
  templateUrl: './applied-users.component.html',
  styleUrls: ['./applied-users.component.scss']
})
export class AppliedUsersComponent {
  products!: any[];
  gridApiInfo!: any;
  constructor(
    private breadcrumbService : BreadcrumbService
  ) { }

  ngOnInit() {
    this.breadcrumbService.addItem({
      name: "Applied Users",
      url: "/admin/appliedUsers"
    })
    this.products = [
      {id: 1001,code: 'f230fh0g3',name: 'Bamboo Watch',category: 'Accessories',quantity: 24},
      {id: 1002,code: 'f230fh0g3',name: 'Bamboo Watch',category: 'Accessories',quantity: 24},
      {id: 1003,code: 'f230fh0g3',name: 'Bamboo Watch',category: 'Accessories',quantity: 24},
      {id: 1004,code: 'f230fh0g3',name: 'Bamboo Watch',category: 'Accessories',quantity: 24},
      {id: 1005,code: 'f230fh0g3',name: 'Bamboo Watch',category: 'Accessories',quantity: 24},
      {id: 1006,code: 'f230fh0g3',name: 'Bamboo Watch',category: 'Accessories',quantity: 24},
      {id: 1007,code: 'f230fh0g3',name: 'Bamboo Watch',category: 'Accessories',quantity: 24},
      {id: 1008,code: 'f230fh0g3',name: 'Bamboo Watch',category: 'Accessories',quantity: 24},
      {id: 1009,code: 'f230fh0g3',name: 'Bamboo Watch',category: 'Accessories',quantity: 24},
      {id: 1010,code: 'f230fh0g3',name: 'Bamboo Watch',category: 'Accessories',quantity: 24},
      {id: 1011,code: 'f230fh0g3',name: 'Bamboo Watch',category: 'Clothing',quantity: 22},
    ]
  }
}
