import { Component, ViewEncapsulation, ChangeDetectionStrategy, HostBinding, computed, signal } from '@angular/core';
import { XContainerPrefix, XContainerProperty } from './container.property';

@Component({
  selector: `${XContainerPrefix}`,
  standalone: true,
  template: '<ng-content></ng-content>',
  styleUrls: ['./container.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XContainerComponent extends XContainerProperty {
  @HostBinding('class.x-container') _has = true;
  @HostBinding('class') get className() {
    return this.directionClass();
  }

  directionSignal = signal(this.direction());

  directionClass = computed(() => {
    const direction = this.directionSignal();
    if (direction) {
      return `x-direction-${direction}`;
    } else {
      return ``;
    }
  });
}
