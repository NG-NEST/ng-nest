import { Component, ViewEncapsulation, ChangeDetectionStrategy, HostBinding } from '@angular/core';
import { XAsidePrefix, XAsideProperty } from './container.property';

@Component({
  selector: `${XAsidePrefix}`,
  standalone: true,
  template: '<ng-content></ng-content>',
  styleUrls: ['./aside.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XAsideComponent extends XAsideProperty {
  @HostBinding('class') className = XAsidePrefix;
  @HostBinding(`style.width`) get getWidth() {
    return this.width();
  }
}
