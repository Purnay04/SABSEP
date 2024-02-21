import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SignAdminComponent } from "./components/sign-admin/sign-admin.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'prefix'
  },
  {
    path: 'login',
    component : SignAdminComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }