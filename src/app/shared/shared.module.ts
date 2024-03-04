import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormHandlerComponent } from './components/form-handler/form-handler.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ContextMenuDirective } from './directives/context-menu.directive';
import { ClickOutsideDirective } from './directives/click-outside.directive';
import { LucideAngularModule } from 'lucide-angular';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    FormHandlerComponent,
    ContextMenuDirective,
    ClickOutsideDirective,
    PageHeaderComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LucideAngularModule,
    RouterModule
  ],
  exports: [
    FormHandlerComponent,
    ContextMenuDirective,
    ClickOutsideDirective,
    PageHeaderComponent
  ]
})
export class SharedModule { }
