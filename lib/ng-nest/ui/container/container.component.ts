import { Component, ViewEncapsulation, ChangeDetectionStrategy, HostBinding, computed, signal } from '@angular/core';
import { XContainerPrefix, XContainerProperty } from './container.property';
import type { XDirection } from '@ng-nest/ui/core';

@Component({
  selector: `${XContainerPrefix}`,
  standalone: true,
  template: '<ng-content></ng-content>',
  styleUrls: ['./container.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XContainerComponent extends XContainerProperty {
  @HostBinding('class') get className() {
    return `${XContainerPrefix} ${this.directionClass()}`;
  }

  directionSignal = signal<XDirection | null>(null);

  directionClass = computed(() => {
    const direction = this.directionSignal() || this.direction();
    if (direction) {
      return `x-direction-${direction}`;
    } else {
      return ``;
    }
  });
}
