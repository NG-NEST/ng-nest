import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostBinding,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';
import { XListOptionPrefix, XListOptionProperty } from './list.property';
import { Highlightable } from '@angular/cdk/a11y';
import { XClassMap, XClearClass, XConfigService, XIsChange } from '@ng-nest/ui/core';

@Component({
  selector: `${XListOptionPrefix}`,
  templateUrl: './list-option.component.html',
  styleUrls: ['./list-option.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XListOptionComponent extends XListOptionProperty implements Highlightable {
  @HostBinding('attr.role') role = 'option';
  classMap: XClassMap = {};
  constructor(public elementRef: ElementRef, private cdr: ChangeDetectorRef, public configService: XConfigService) {
    super();
  }
  ngOnChanges(changes: SimpleChanges): void {
    const { size } = changes;
    XIsChange(size) && this.setClassMap();
  }

  setClassMap() {
    XClearClass(this.classMap);
    this.classMap[`${XListOptionPrefix}-${this.size}`] = this.size ? true : false;
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
