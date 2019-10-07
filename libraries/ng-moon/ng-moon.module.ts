
import { NgModule, ModuleWithProviders } from "@angular/core";

import { NmIconModule } from "ng-moon/icon";
import { NmSliderModule } from "ng-moon/slider";
import { NmHighlightModule } from "ng-moon/highlight";
import { NmGridModule } from "ng-moon/grid";
import { NmCrumbModule } from "ng-moon/crumb";
import { NmInnerModule } from "ng-moon/inner";

import { NmInputModule } from "ng-moon/input";
import { NmButtonModule } from "ng-moon/button";
import { NmAnchorModule } from "ng-moon/anchor";
import { NmTabsModule } from "ng-moon/tabs";

import { NmDocModule } from "ng-moon/doc";
import { NmExamplesModule } from "ng-moon/examples";
import { NmApiModule } from "ng-moon/api";
import { NmPatternModule } from "ng-moon/pattern";
import { NmFormModule } from "ng-moon/form";

export * from "ng-moon/core";
export * from "ng-moon/icon";
export * from "ng-moon/grid";
export * from "ng-moon/slider";
export * from "ng-moon/highlight";
export * from "ng-moon/crumb";
export * from "ng-moon/inner";

export * from "ng-moon/anchor";
export * from "ng-moon/input";
export * from "ng-moon/button";
export * from "ng-moon/tabs";

export * from "ng-moon/doc";
export * from "ng-moon/examples";
export * from "ng-moon/api";
export * from "ng-moon/pattern";
export * from "ng-moon/form";

@NgModule({
  exports: [
    NmIconModule,
    NmSliderModule,
    NmHighlightModule,
    NmGridModule,
    NmCrumbModule,
    NmInnerModule,
    NmInputModule,
    NmButtonModule,
    NmAnchorModule,
    NmTabsModule,
    NmDocModule,
    NmExamplesModule,
    NmApiModule,
    NmPatternModule,
    NmFormModule
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
