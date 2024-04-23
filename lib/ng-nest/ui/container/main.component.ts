import { Component, ViewEncapsulation, ChangeDetectionStrategy, HostBinding } from '@angular/core';
import { XMainPrefix } from './container.property';

@Component({
  selector: `${XMainPrefix}`,
  standalone: true,
  template: '<ng-content></ng-content>',
  styleUrls: ['./main.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XMainComponent {
  @HostBinding('class.x-main') _has = true;
}
