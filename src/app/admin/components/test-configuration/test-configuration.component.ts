import { Component } from '@angular/core';
import { BreadcrumbService } from 'src/app/services/breadcrumb.service';

@Component({
  selector: 'app-test-configuration',
  templateUrl: './test-configuration.component.html',
  styleUrls: ['./test-configuration.component.scss']
})
export class TestConfigurationComponent {

  constructor(
    private breadcrumbService : BreadcrumbService
  ) { }

  ngOnInit() {
    this.breadcrumbService.addItem({
      name: "Test Configuration",
      url: "/admin/testConfig"
    })
  }
}
