import { Component, ViewEncapsulation, ChangeDetectionStrategy, inject, computed } from '@angular/core';
import { XSkeletonPrefix, XSkeletonProperty } from './skeleton.property';
import { DOCUMENT, NgClass, NgStyle, NgTemplateOutlet } from '@angular/common';
import { XColComponent, XRowComponent } from '@ng-nest/ui/layout';
import { XComputedStyle, XToCssPx } from '@ng-nest/ui/core';

@Component({
  selector: `${XSkeletonPrefix}`,
  standalone: true,
  imports: [NgClass, NgTemplateOutlet, NgStyle, XRowComponent, XColComponent],
  templateUrl: './skeleton.component.html',
  styleUrls: ['./skeleton.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XSkeletonComponent extends XSkeletonProperty {
  private document = inject(DOCUMENT);
  private fontSize = computed(() => parseFloat(XComputedStyle(this.document.documentElement, 'font-size')));

  toCssPx(value: string) {
    return XToCssPx(value, this.fontSize());
  }
}
