import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
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
  constructor(public elementRef: ElementRef, private cdr: ChangeDetectorRef) {
    super();
  }
  setActiveStyles(): void {
    this.active = true;
    this.activeChange.emit(this.active);
    this.cdr.detectChanges();
  }
  setInactiveStyles(): void {
    this.active = false;
    this.activeChange.emit(this.active);
    this.cdr.detectChanges();
  }

  getLabel() {
    return this.label as string;
  }
}
