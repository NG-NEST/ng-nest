import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XDrawerComponent } from './drawer.component';
import { XOutletModule } from '@ng-nest/ui/outlet';
import { XButtonModule } from '@ng-nest/ui/button';
import { XPortalModule } from '@ng-nest/ui/portal';
import { XDrawerContainerProperty, XDrawerProperty } from './drawer.property';
import { XDrawerService } from './drawer.service';
import { XDrawerPortalComponent } from './drawer-portal.component';
import { XDrawerCloseDirective, XDrawerContentDirective, XDrawerTitleDirective } from './drawer-portal.directives';
import { XDrawerContainerComponent } from './drawer-container.component';

@NgModule({
  declarations: [
    XDrawerComponent,
    XDrawerCloseDirective,
    XDrawerTitleDirective,
    XDrawerContentDirective,
    XDrawerPortalComponent,
    XDrawerContainerComponent,
    XDrawerProperty,
    XDrawerContainerProperty
  ],
  exports: [
    XDrawerComponent,
    XDrawerCloseDirective,
    XDrawerTitleDirective,
    XDrawerContentDirective,
    XDrawerPortalComponent,
    XDrawerContainerComponent
  ],
  imports: [CommonModule, XOutletModule, XButtonModule, XPortalModule],
  providers: [XDrawerService]
})
export class XDrawerModule {}
