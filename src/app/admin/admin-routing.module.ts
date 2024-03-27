import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { AdminPanelComponent } from "./components/admin-panel/admin-panel.component";
import { TestConfigurationComponent } from "./components/test-configuration/test-configuration.component";
import { AppliedUsersComponent } from "./components/applied-users/applied-users.component";
import { QuestionsTabComponent } from "./components/questions-tab/questions-tab.component";
import { QuestionFormComponent } from "./components/questions-tab/question-form/question-form.component";

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
    },
    {
      path: 'questionsList',
      component: QuestionsTabComponent,
    },
    {
      path: 'questionForm',
      component: QuestionFormComponent
    }
  ]
 }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }