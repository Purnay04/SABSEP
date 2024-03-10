import { Component } from '@angular/core';
import { BreadcrumbService } from 'src/app/services/breadcrumb.service';

@Component({
  selector: 'app-test-configuration',
  templateUrl: './test-configuration.component.html',
  styleUrls: ['./test-configuration.component.scss']
})
export class TestConfigurationComponent {
  gridApiInfo!: any;
  constructor(
    private breadcrumbService : BreadcrumbService
  ) { }

  ngOnInit() {
    this.breadcrumbService.addItem({
      name: "Test Configuration",
      url: "/admin/testConfig"
    })
  }

  public chartOptions: any = {
    series: [
      {
        name: 'Sales',
        data: [30, 40, 35, 50, 49, 60, 70, 91, 125],
      },
    ],
    chart: {
      height: 350,
      type: 'line',
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
    },
  };
}
