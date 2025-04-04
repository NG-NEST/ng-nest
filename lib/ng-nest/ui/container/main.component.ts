import { Component, ViewEncapsulation, ChangeDetectionStrategy, HostBinding } from '@angular/core';
import { XMainPrefix } from './container.property';

@Component({
  selector: `${XMainPrefix}`,
  template: '<ng-content></ng-content>',
  styleUrls: ['./main.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XMainComponent {
  @HostBinding('class') className = XMainPrefix;
}
