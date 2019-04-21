import { NgModule, ModuleWithProviders } from '@angular/core';
import { NmInputModule } from './components/input/nm-input.module';

export * from './components/input';

@NgModule({
  exports: [
    NmInputModule
  ]
})
export class NgMoonModule {
  /**
   * @deprecated Use `NgMoonModule` instead.
   */
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: NgMoonModule
    };
  }
}
