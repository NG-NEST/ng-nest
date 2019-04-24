import { NgModule, ModuleWithProviders } from '@angular/core';
import { NmInputModule } from './components/input/nm-input.module';
import { NmIconModule } from './components/icon/nm-icon.module';

export * from './components/input';
export * from './components/input';

@NgModule({
  exports: [
    NmIconModule,
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
