import {
  LUCIDE_ICONS,
  LucideAngularModule,
  LucideIconProvider,
  User,
  Settings,
  LogOut,
  Sun,
  Moon,
  Layers3,
  Users,
  LayoutDashboard,
  Menu
} from 'lucide-angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../core/services/authInterceptor.service';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { INode, parseSync } from 'svgson';
import { customSVGIcons } from '../customLucideIcons';
import { LucideIcons } from 'lucide-angular/icons/types';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { TestConfigurationComponent } from './components/test-configuration/test-configuration.component';
import { AppliedUsersComponent } from './components/applied-users/applied-users.component';

function svgToLucidIconData(svgString: string) {
  const parsed = parseSync(svgString);
  console.log("svgToLucidIconData", parsed);
  return parsed.children.map((n: INode) => [n.name, n.attributes]);
}

function getLucideIcons(): LucideIcons {
  let icons: any = {};
  Object.keys(customSVGIcons).forEach(icon => {
    icons[icon] = svgToLucidIconData(customSVGIcons[icon]);
  })
  return icons;
}

@NgModule({
  declarations: [
    DashboardComponent,
    AdminPanelComponent,
    TestConfigurationComponent,
    AppliedUsersComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    FormsModule,
    LucideAngularModule.pick({User, Settings, LogOut, Sun, Moon, Layers3, Users, LayoutDashboard, Menu})
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi:true
    },
    {
      provide: LUCIDE_ICONS,
      multi: true,
      useValue: new LucideIconProvider(getLucideIcons())
    }
  ]
})
export class AdminModule { }
