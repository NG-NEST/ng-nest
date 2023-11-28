import { NgModule } from '@angular/core';
import { XDrawerComponent } from './drawer.component';
import { XDrawerPortalComponent } from './drawer-portal.component';
import { XDrawerCloseDirective, XDrawerContentDirective, XDrawerTitleDirective } from './drawer-portal.directives';
import { XDrawerContainerComponent } from './drawer-container.component';

@NgModule({
  exports: [
    XDrawerComponent,
    XDrawerCloseDirective,
    XDrawerTitleDirective,
    XDrawerContentDirective,
    XDrawerPortalComponent,
    XDrawerContainerComponent
  ],
  imports: [
    XDrawerComponent,
    XDrawerCloseDirective,
    XDrawerTitleDirective,
    XDrawerContentDirective,
    XDrawerPortalComponent,
    XDrawerContainerComponent
  ]
})
export class XDrawerModule {}
