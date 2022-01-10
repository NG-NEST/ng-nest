import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XDrawerComponent } from './drawer.component';
import { XOutletModule } from '@ng-nest/ui/outlet';
import { XButtonModule } from '@ng-nest/ui/button';
import { XPortalModule } from '@ng-nest/ui/portal';
import { XDrawerProperty } from './drawer.property';
import { XDrawerService } from './drawer.service';
import { XDrawerContainerComponent } from './drawer-container.component';
import { XDrawerCloseDirective, XDrawerContentDirective, XDrawerTitleDirective } from './drawer-container.directives';

@NgModule({
  declarations: [
    XDrawerComponent,
    XDrawerCloseDirective,
    XDrawerTitleDirective,
    XDrawerContentDirective,
    XDrawerContainerComponent,
    XDrawerProperty
  ],
  exports: [XDrawerComponent, XDrawerCloseDirective, XDrawerTitleDirective, XDrawerContentDirective, XDrawerContainerComponent],
  imports: [CommonModule, XOutletModule, XButtonModule, XPortalModule],
  providers: [XDrawerService]
})
export class XDrawerModule {}
