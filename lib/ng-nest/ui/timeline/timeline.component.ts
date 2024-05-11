import { Component, ViewEncapsulation, ChangeDetectionStrategy, computed } from '@angular/core';
import { XTimelinePrefix, XTimelineNode, XTimelineProperty } from './timeline.property';
import { XIsEmpty } from '@ng-nest/ui/core';
import { DatePipe, NgClass } from '@angular/common';
import { XIconComponent } from '@ng-nest/ui/icon';
import { XTimeAgoPipe } from '@ng-nest/ui/time-ago';
import { XLinkComponent } from '@ng-nest/ui/link';
import { XOutletDirective } from '@ng-nest/ui/outlet';

@Component({
  selector: `${XTimelinePrefix}`,
  standalone: true,
  imports: [NgClass, DatePipe, XIconComponent, XTimeAgoPipe, XLinkComponent, XOutletDirective],
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XTimelineComponent extends XTimelineProperty {
  classMapSignal = computed(() => ({
    [`${XTimelinePrefix}-${this.mode()}`]: !XIsEmpty(this.mode())
  }));

  nodes = computed(() => {
    const data = this.data();
    this.setDashed(data);
    return data;
  });

  private setDashed(nodes: XTimelineNode[]) {
    const len = nodes.length;
    if (len <= 1) return;
    for (let i = 0; i < nodes.length; i++) {
      let node = nodes[i];
      if (!node.loading) continue;
      if (i === 0) {
        node.dashed = true;
      } else if (i > 0) {
        nodes[i - 1].dashed = true;
      }
    }
  }
}
