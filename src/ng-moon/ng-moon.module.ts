import { NgModule } from '@angular/core';
import { NmInputModule } from './input/nm-input.module';

export * from './input';

@NgModule({
  exports:[
    NmInputModule
  ]
})
export class NgMoonModule { }
