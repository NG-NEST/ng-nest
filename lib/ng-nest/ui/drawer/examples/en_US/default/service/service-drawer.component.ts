import { Component, inject } from '@angular/core';
import { XButtonComponent } from '@ng-nest/ui/button';
import {
  X_DRAWER_DATA,
  XDrawerCloseDirective,
  XDrawerContentDirective,
  XDrawerRef,
  XDrawerTitleDirective
} from '@ng-nest/ui/drawer';

@Component({
  selector: 'ex-service-drawer',
  imports: [XButtonComponent, XDrawerTitleDirective, XDrawerContentDirective, XDrawerCloseDirective],
  templateUrl: './service-drawer.component.html'
})
export class ExServiceDrawerComponent {
  data = inject(X_DRAWER_DATA);
  drawerRef = inject(XDrawerRef<ExServiceDrawerComponent>);

  close() {
    this.drawerRef.close();
  }
}
