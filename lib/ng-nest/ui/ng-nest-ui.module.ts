import { NgModule, ModuleWithProviders } from "@angular/core";

import { XIconModule } from "@ng-nest/ui/icon";
import { XContainerModule } from "@ng-nest/ui/container";
import { XSliderModule } from "@ng-nest/ui/slider";
import { XHighlightModule } from "@ng-nest/ui/highlight";
import { XFenceModule } from "@ng-nest/ui/fence";
import { XCrumbModule } from "@ng-nest/ui/crumb";
import { XInnerModule } from "@ng-nest/ui/inner";
import { XPortalModule } from "@ng-nest/ui/portal";
import { XColorModule } from "@ng-nest/ui/color";
import { XTypographyModule } from "@ng-nest/ui/typography";
import { XBorderModule } from "@ng-nest/ui/border";

import { XRadioModule } from "@ng-nest/ui/radio";
import { XInputModule } from "@ng-nest/ui/input";
import { XButtonModule } from "@ng-nest/ui/button";
import { XAnchorModule } from "@ng-nest/ui/anchor";
import { XTabsModule } from "@ng-nest/ui/tabs";
import { XTableModule } from "@ng-nest/ui/table";
import { XPaginationModule } from "@ng-nest/ui/pagination";

import { XDocModule } from "@ng-nest/ui/doc";
import { XExamplesModule } from "@ng-nest/ui/examples";
import { XApiModule } from "@ng-nest/ui/api";
import { XPatternModule } from "@ng-nest/ui/pattern";
import { XFormModule } from "@ng-nest/ui/form";

export * from "@ng-nest/ui/core";
export * from "@ng-nest/ui/icon";
export * from "@ng-nest/ui/container";
export * from "@ng-nest/ui/fence";
export * from "@ng-nest/ui/slider";
export * from "@ng-nest/ui/highlight";
export * from "@ng-nest/ui/crumb";
export * from "@ng-nest/ui/inner";
export * from "@ng-nest/ui/portal";
export * from "@ng-nest/ui/color";
export * from "@ng-nest/ui/typography";
export * from "@ng-nest/ui/border";

export * from "@ng-nest/ui/radio";
export * from "@ng-nest/ui/input";
export * from "@ng-nest/ui/button";
export * from "@ng-nest/ui/anchor";
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
    XIconModule,
    XContainerModule,
    XSliderModule,
    XHighlightModule,
    XFenceModule,
    XCrumbModule,
    XInnerModule,
    XPortalModule,
    XColorModule,
    XTypographyModule,
    XBorderModule,
    XRadioModule,
    XInputModule,
    XButtonModule,
    XAnchorModule,
    XTabsModule,
    XTableModule,
    XPaginationModule,
    XDocModule,
    XExamplesModule,
    XApiModule,
    XPatternModule,
    XFormModule
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
