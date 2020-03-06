import { Component, OnInit, TemplateRef, ViewContainerRef, ViewChild } from '@angular/core';
import { XPortalService } from '@ng-nest/ui/portal';
import { Overlay } from '@angular/cdk/overlay';

@Component({
  selector: 'ex-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class ExDefaultComponent {
  @ViewChild('temp', { static: false }) temp: TemplateRef<any>;
  constructor(private portal: XPortalService, private overlay: Overlay, private viewContainerRef: ViewContainerRef) {}
  showPortal() {
    this.portal.create({
      content: this.temp,
      viewContainerRef: this.viewContainerRef,
      context: { text: '名字' },
      overlayConfig: {
        positionStrategy: this.overlay
          .position()
          .global()
          .centerHorizontally()
          .centerVertically()
      }
    });
  }
}
