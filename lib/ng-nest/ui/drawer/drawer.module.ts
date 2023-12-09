import { NgModule } from '@angular/core';
import { XDrawerComponent } from './drawer.component';
import { XDrawerCloseDirective, XDrawerContentDirective, XDrawerTitleDirective } from './drawer-portal.directives';
import { XDrawerContainerComponent } from './drawer-container.component';

@NgModule({
  exports: [
    XDrawerComponent,
    XDrawerCloseDirective,
    XDrawerTitleDirective,
    XDrawerContentDirective,
    XDrawerContainerComponent
  ],
  imports: [
    XDrawerComponent,
    XDrawerCloseDirective,
    XDrawerTitleDirective,
    XDrawerContentDirective,
    XDrawerContainerComponent
  ]
})
export class XDrawerModule {}
