import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class UtilitiesModule {

  isNotEmpty(value: any): boolean {
    return value != null || value != undefined || value != "";
  }

}
