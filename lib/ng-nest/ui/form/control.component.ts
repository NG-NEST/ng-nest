import { Component, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { XContainerProperty } from '../container';

@Component({
  selector: 'x-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XControlComponent extends XContainerProperty {
  constructor() {
    super();
  }
}
