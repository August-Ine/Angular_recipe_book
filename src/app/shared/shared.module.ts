import { NgModule } from '@angular/core';

import { DropdownDirective } from './dropdown.directive';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SpinnerComponent } from './spinner/spinner.component';

@NgModule({
  declarations: [DropdownDirective, SpinnerComponent],
  imports: [
    CommonModule, //ngFor/ngIf--> BrowserModule for feature modules
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DropdownDirective,
    SpinnerComponent,
  ],
  providers: [],
})
export class SharedModule {}
