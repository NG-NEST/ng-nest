import { Component, ViewEncapsulation, ChangeDetectionStrategy, HostBinding, inject, computed } from '@angular/core';
import { XRowPrefix, XRowProperty } from './layout.property';
import { DOCUMENT } from '@angular/common';
import { XComputedStyle, XToCssPx } from '@ng-nest/ui/core';

@Component({
  selector: `${XRowPrefix}`,
  template: '<ng-content></ng-content>',
  styleUrls: ['./row.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XRowComponent extends XRowProperty {
  private document: Document = inject(DOCUMENT);
  private fontSize = computed(() => parseFloat(XComputedStyle(this.document.documentElement, 'font-size')));
  @HostBinding(`class.x-flex`) get getFlex() {
    return this.justify() || this.align() ? true : false;
  }
  @HostBinding('class') get cls() {
    let cls: string[] = [XRowPrefix];
    if (this.justify()) cls.push(`x-justify-${this.justify()}`);
    if (this.align()) cls.push(`x-align-${this.align()}`);
    return cls.join(' ');
  }
  @HostBinding('style.marginLeft') get marginLeft() {
    return `-${this.spaceSignal() / 2}px`;
  }
  @HostBinding('style.marginRight') get marginRight() {
    return `-${this.spaceSignal() / 2}px`;
  }

  spaceSignal = computed(() => {
    if (!this.space()) return 0;
    const space = this.space();
    return XToCssPx(space, this.fontSize());
  });
}
