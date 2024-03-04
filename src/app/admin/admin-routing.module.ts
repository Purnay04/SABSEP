import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { AdminPanelComponent } from "./components/admin-panel/admin-panel.component";
import { TestConfigurationComponent } from "./components/test-configuration/test-configuration.component";
import { AppliedUsersComponent } from "./components/applied-users/applied-users.component";

const routes: Routes = [
 {
  path: '',
  component: AdminPanelComponent,
  children: [
    {
      path: '',
      pathMatch: 'prefix',
      redirectTo: 'dashboard'
    },
    {
      path: 'dashboard',
      component: DashboardComponent
    },
    {
      path: 'testConfig',
      component: TestConfigurationComponent
    },
    {
      path: 'appliedUsers',
      component: AppliedUsersComponent
    }
  ]
 }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }