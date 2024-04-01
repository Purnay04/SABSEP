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
import { MessagesModule } from 'primeng/messages';
import { EditorModule } from 'primeng/editor';
import { DropdownModule } from 'primeng/dropdown';
import { CeilPipe } from './components/ceilPipe.component';
import { FloorPipe } from './components/floorPipe.component';
import { ChipsModule } from 'primeng/chips';

@NgModule({
  declarations: [
    FormHandlerComponent,
    ContextMenuDirective,
    ClickOutsideDirective,
    PageHeaderComponent,
    AgGridHandlerComponent,
    CeilPipe,
    FloorPipe
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LucideAngularModule,
    RouterModule,
    AgGridModule,
    MessagesModule,
    EditorModule,
    DropdownModule,
    ChipsModule
  ],
  exports: [
    FormHandlerComponent,
    ContextMenuDirective,
    ClickOutsideDirective,
    PageHeaderComponent,
    AgGridHandlerComponent,
    CeilPipe,
    FloorPipe
  ]
})
export class SharedModule { }
