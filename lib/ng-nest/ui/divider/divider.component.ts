import { Component, ViewEncapsulation, ChangeDetectionStrategy, computed, viewChild, ElementRef } from '@angular/core';
import { XDividerPrefix, XDividerProperty } from './divider.property';
import { CommonModule } from '@angular/common';

@Component({
  selector: `${XDividerPrefix}`,
  imports: [CommonModule],
  templateUrl: './divider.component.html',
  styleUrls: ['./divider.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XDividerComponent extends XDividerProperty {
  text = viewChild<ElementRef<HTMLElement>>('text');

  hasText = computed(() => (this.text()?.nativeElement?.innerHTML ?? '').trim().length > 0);

  /**
   * @zh_CN 类名映射
   * @en_US Class map
   */
  classMap = computed(() => ({
    [`${XDividerPrefix}-${this.direction()}`]: true,
    [`${XDividerPrefix}-${this.variant()}`]: true,
    [`${XDividerPrefix}-with-text`]: this.hasText(),
    [`${XDividerPrefix}-with-text-${this.position()}`]: this.hasText()
  }));
}
