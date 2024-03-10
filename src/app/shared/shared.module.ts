import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormHandlerComponent } from './components/form-handler/form-handler.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ContextMenuDirective } from './directives/context-menu.directive';
import { ClickOutsideDirective } from './directives/click-outside.directive';
import { LucideAngularModule } from 'lucide-angular';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { RouterModule } from '@angular/router';
import { AgGridHandlerComponent } from './components/ag-grid-handler/ag-grid-handler.component';
import { AgGridModule } from 'ag-grid-angular';

@NgModule({
  declarations: [
    FormHandlerComponent,
    ContextMenuDirective,
    ClickOutsideDirective,
    PageHeaderComponent,
    AgGridHandlerComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LucideAngularModule,
    RouterModule,
    AgGridModule
  ],
  exports: [
    FormHandlerComponent,
    ContextMenuDirective,
    ClickOutsideDirective,
    PageHeaderComponent,
    AgGridHandlerComponent
  ]
})
export class SharedModule { }
