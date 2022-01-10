import { OverlayRef } from '@angular/cdk/overlay';
import { Component, Inject } from '@angular/core';
import { X_DRAWER_DATA } from '@ng-nest/ui/drawer';

@Component({
  selector: 'ex-service-drawer',
  templateUrl: './service-drawer.component.html'
})
export class ExServiceDrawerComponent {
  constructor(@Inject(X_DRAWER_DATA) public data: any, public drawerRef: OverlayRef) {}

  close() {
    this.drawerRef.detach();
  }
}
