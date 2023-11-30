import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostBinding,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewEncapsulation,
  inject
} from '@angular/core';
import { XListOptionPrefix, XListOptionProperty } from './list.property';
import { Highlightable } from '@angular/cdk/a11y';
import { XClassMap, XClearClass, XConfigService, XIsChange } from '@ng-nest/ui/core';
import { CommonModule } from '@angular/common';
import { XIconComponent } from '@ng-nest/ui/icon';
import { XKeywordDirective } from '@ng-nest/ui/keyword';

@Component({
  selector: `${XListOptionPrefix}`,
  standalone: true,
  imports: [CommonModule, XIconComponent, XKeywordDirective],
  templateUrl: './list-option.component.html',
  styleUrls: ['./list-option.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XListOptionComponent extends XListOptionProperty implements Highlightable, OnInit, OnChanges {
  @HostBinding('attr.role') role = 'option';
  classMap: XClassMap = {};
  private cdr = inject(ChangeDetectorRef);
  elementRef = inject(ElementRef);
  configService = inject(XConfigService);

  ngOnInit() {
    if (this.node)
      this.node.change = () => {
        this.cdr.detectChanges();
      };
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
