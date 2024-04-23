import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy, HostBinding, inject } from '@angular/core';
import { XHeaderPrefix, XHeaderProperty } from './container.property';
import { XContainerComponent } from './container.component';

@Component({
  selector: `${XHeaderPrefix}`,
  standalone: true,
  template: '<ng-content></ng-content>',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XHeaderComponent extends XHeaderProperty implements OnInit {
  @HostBinding('class.x-header') _has = true;
  @HostBinding(`style.height`) get getHeight() {
    return this.height();
  }
  private container = inject(XContainerComponent, { optional: true, host: true });

  ngOnInit() {
    this.setDirection();
  }

  setDirection() {
    if (!this.container || this.container.directionSignal()) return;
    this.container.directionSignal.set('column');
  }
}
