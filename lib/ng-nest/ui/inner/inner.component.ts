import { Component, ViewEncapsulation, ChangeDetectionStrategy, HostBinding } from '@angular/core';
import { XInnerPrefix, XInnerProperty } from './inner.property';

@Component({
  selector: `${XInnerPrefix}`,
  standalone: true,
  templateUrl: './inner.component.html',
  styleUrls: ['./style/index.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XInnerComponent extends XInnerProperty {
  @HostBinding('class.x-inner') _has = true;
  @HostBinding('style.padding') get getPadding() {
    return this.padding();
  }
}
