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
  Menu,
  Clock9,
  Edit,
  FilePlus2,
  BookOpenCheck,
  Eye,
  Library,
  Trash
} from 'lucide-angular';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
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
import { NgxApexchartsModule } from 'ngx-apexcharts';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { DialogModule } from 'primeng/dialog';
import { AddCategoryComponent } from './components/add-category/add-category.component';
import { MessagesModule } from 'primeng/messages';
import { NgxSpinnerModule } from 'ngx-spinner';
import { TCGridCellRendererComponent } from './components/test-configuration/test-configuration-grid-cell-renderer.component';
import { QuestionsTabComponent } from './components/questions-tab/questions-tab.component';
import { QuestionFormComponent } from './components/questions-tab/question-form/question-form.component';
import { QuestionGridCellRendererComponent } from './components/questions-tab/questions-grid-cell-renderer.component';
import { ToastModule } from 'primeng/toast';

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
    AppliedUsersComponent,
    AddCategoryComponent,
    TCGridCellRendererComponent,
    QuestionsTabComponent,
    QuestionFormComponent,
    QuestionGridCellRendererComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    FormsModule,
    NgxApexchartsModule,
    DynamicDialogModule,
    DialogModule,
    MessagesModule,
    ToastModule,
    NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' }),
    LucideAngularModule.pick({User, Settings, LogOut, Sun, Moon, Layers3, Users, LayoutDashboard, Menu, Clock9, Edit, FilePlus2, BookOpenCheck, Eye, Library, Trash})
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
    },
    DialogService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AdminModule { }
