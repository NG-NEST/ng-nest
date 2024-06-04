import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy, HostBinding, inject } from '@angular/core';
import { XFooterPrefix, XFooterProperty } from './container.property';
import { XContainerComponent } from './container.component';

@Component({
  selector: `${XFooterPrefix}`,
  standalone: true,
  template: '<ng-content></ng-content>',
  styleUrls: ['./footer.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XFooterComponent extends XFooterProperty implements OnInit {
  @HostBinding('class') className = XFooterPrefix;
  @HostBinding(`style.height`) get getHeight() {
    return this.height();
  }
  private container = inject(XContainerComponent, { optional: true, host: true });

  ngOnInit() {
    this.setDirection();
  }

  setDirection() {
    if (!this.container || this.container.direction()) return;
    this.container.directionSignal.set('column');
  }
}
