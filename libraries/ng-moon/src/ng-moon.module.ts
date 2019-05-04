import { NmSliderModule } from "./components/slider/nm-slider.module";
import { NgModule, ModuleWithProviders } from "@angular/core";
import { NmInputModule } from "./components/input/nm-input.module";
import { NmIconModule } from "./components/icon/nm-icon.module";

export * from "./components/input";
export * from "./components/icon";
export * from "./components/slider";
export * from "./core/util";

@NgModule({
  exports: [NmIconModule, NmInputModule, NmSliderModule]
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
