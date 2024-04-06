import { Route } from '@angular/router';
import { AuthGuard } from './services/authguard.service';

export const appRoutes: Route[] = [
  {
    path: 'admin',
    pathMatch: 'prefix',
    loadChildren: () => import("./admin/admin.module").then((m) => m.AdminModule),
    canActivate: [AuthGuard]
  }
];
