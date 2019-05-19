import { NgModule, ModuleWithProviders } from "@angular/core";
import { NmAnchorModule } from "./components/anchor/nm-anchor.module";
import { NmSliderModule } from "./components/slider/nm-slider.module";
import { NmInputModule } from "./components/input/nm-input.module";
import { NmIconModule } from "./components/icon/nm-icon.module";
import { NmTabsModule } from "./components/tabs/nm-tabs.module";
import { NmDocModule } from './components/doc/nm-doc.module';

export * from "./components/input";
export * from "./components/icon";
export * from "./components/slider";
export * from "./components/anchor";
export * from "./components/tabs";
export * from "./components/doc";
export * from "./core/util";

@NgModule({
  exports: [
    NmIconModule,
    NmInputModule,
    NmSliderModule,
    NmAnchorModule,
    NmTabsModule,
    NmDocModule
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
