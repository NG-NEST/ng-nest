import { NgModule, ModuleWithProviders } from "@angular/core";

import { NuIconModule } from "@ng-nest/ui/icon";
import { NuSliderModule } from "@ng-nest/ui/slider";
import { NuHighlightModule } from "@ng-nest/ui/highlight";
import { NuGridModule } from "@ng-nest/ui/grid";
import { NuCrumbModule } from "@ng-nest/ui/crumb";
import { NuInnerModule } from "@ng-nest/ui/inner";
import { NuPortalModule } from "@ng-nest/ui/portal";

import { NuInputModule } from "@ng-nest/ui/input";
import { NuButtonModule } from "@ng-nest/ui/button";
import { NuAnchorModule } from "@ng-nest/ui/anchor";
import { NuTabsModule } from "@ng-nest/ui/tabs";
import { NuTableModule } from "@ng-nest/ui/table";
import { NuPaginationModule } from "@ng-nest/ui/pagination";

import { NuDocModule } from "@ng-nest/ui/doc";
import { NuExamplesModule } from "@ng-nest/ui/examples";
import { NuApiModule } from "@ng-nest/ui/api";
import { NuPatternModule } from "@ng-nest/ui/pattern";
import { NuFormModule } from "@ng-nest/ui/form";

export * from "@ng-nest/ui/core";
export * from "@ng-nest/ui/icon";
export * from "@ng-nest/ui/grid";
export * from "@ng-nest/ui/slider";
export * from "@ng-nest/ui/highlight";
export * from "@ng-nest/ui/crumb";
export * from "@ng-nest/ui/inner";
export * from "@ng-nest/ui/portal";

export * from "@ng-nest/ui/anchor";
export * from "@ng-nest/ui/input";
export * from "@ng-nest/ui/button";
export * from "@ng-nest/ui/tabs";
export * from "@ng-nest/ui/table";
export * from "@ng-nest/ui/pagination";

export * from "@ng-nest/ui/doc";
export * from "@ng-nest/ui/examples";
export * from "@ng-nest/ui/api";
export * from "@ng-nest/ui/pattern";
export * from "@ng-nest/ui/form";

@NgModule({
  exports: [
    NuIconModule,
    NuSliderModule,
    NuHighlightModule,
    NuGridModule,
    NuCrumbModule,
    NuInnerModule,
    NuPortalModule,
    NuInputModule,
    NuButtonModule,
    NuAnchorModule,
    NuTabsModule,
    NuTableModule,
    NuPaginationModule,
    NuDocModule,
    NuExamplesModule,
    NuApiModule,
    NuPatternModule,
    NuFormModule
  ]
})
export class NgNestUiModule {
  /**
   * @deprecated Use `NgNestUiModule` instead.
   */
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: NgNestUiModule
    };
  }
}
