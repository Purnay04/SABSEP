import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormHandlerComponent } from './components/form-handler/form-handler.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    FormHandlerComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    FormHandlerComponent
  ]
})
export class SharedModule { }
