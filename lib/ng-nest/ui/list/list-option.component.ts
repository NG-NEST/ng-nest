import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  ViewEncapsulation
} from '@angular/core';
import { XListOptionPrefix, XListOptionProperty } from './list.property';
import { Highlightable } from '@angular/cdk/a11y';

@Component({
  selector: `${XListOptionPrefix}`,
  templateUrl: './list-option.component.html',
  styleUrls: ['./list-option.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XListOptionComponent extends XListOptionProperty implements Highlightable {
  @HostBinding('attr.role') role = 'option';
  constructor(public elementRef: ElementRef) {
    super();
  }
  setActiveStyles(): void {
    this.node.active = true;
  }
  setInactiveStyles(): void {
    this.node.active = false;
  }
  get disabled() {
    return this.node.disabled;
  }

  getLabel() {
    return this.node.label;
  }
}
