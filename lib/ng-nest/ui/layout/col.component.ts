import { Component, ViewEncapsulation, ChangeDetectionStrategy, HostBinding, inject, computed } from '@angular/core';
import { XColPrefix, XColProperty } from './layout.property';
import { XRowComponent } from './row.component';
import { XComputedStyle, XToCssPx } from '@ng-nest/ui/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: `${XColPrefix}`,
  standalone: true,
  template: '<ng-content></ng-content>',
  styleUrls: ['./col.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XColComponent extends XColProperty {
  private rowComponent = inject(XRowComponent, { optional: true, host: true });
  private document: Document = inject(DOCUMENT);
  private fontSize = computed(() => parseFloat(XComputedStyle(this.document.documentElement, 'font-size')));
  @HostBinding(`class.x-col-24`) get getFlex() {
    return this.xs() || this.sm() || this.md() || this.lg() || this.xl() || this.span() == 24 ? true : false;
  }
  @HostBinding('class') get cls() {
    let cls: string[] = [XColPrefix];
    if (this.span()) cls.push(`${XColPrefix}-${this.span()}`);
    if (this.offset()) cls.push(`${XColPrefix}-offset-${this.offset()}`);
    if (this.xs()) cls.push(`${XColPrefix}-xs-${this.xs()}`);
    if (this.sm()) cls.push(`${XColPrefix}-sm-${this.sm()}`);
    if (this.md()) cls.push(`${XColPrefix}-md-${this.md()}`);
    if (this.lg()) cls.push(`${XColPrefix}-lg-${this.lg()}`);
    if (this.xl()) cls.push(`${XColPrefix}-xl-${this.xl()}`);
    if (this.inherit()) cls.push(`${XColPrefix}-inherit}`);
    return cls.join(' ');
  }
  @HostBinding('style.paddingLeft') get paddingLeft() {
    return `${this.space() / 2}px`;
  }
  @HostBinding('style.paddingRight') get paddingRight() {
    return `${this.space() / 2}px`;
  }

  space = computed(() => {
    if (!this.rowComponent?.space()) return 0;
    const space = this.rowComponent.space();
    return XToCssPx(space, this.fontSize());
  });
}
