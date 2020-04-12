import { Component, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { XPageHeaderPrefix, XPageHeaderProperty } from './page-header.property';

@Component({
  selector: `${XPageHeaderPrefix}`,
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XPageHeaderComponent extends XPageHeaderProperty {
  constructor() {
    super();
  }
}
