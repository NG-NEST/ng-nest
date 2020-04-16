import { Component, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { XControlProperty } from './form.property';

@Component({
  selector: 'x-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XControlComponent extends XControlProperty {
  constructor() {
    super();
  }
}
