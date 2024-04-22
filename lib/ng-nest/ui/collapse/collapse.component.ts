import { Component, ViewEncapsulation, ChangeDetectionStrategy, inject } from '@angular/core';
import { XCollapsePrefix, XCollapseProperty } from './collapse.property';
import { XConfigService } from '@ng-nest/ui/core';

@Component({
  selector: `${XCollapsePrefix}`,
  standalone: true,
  templateUrl: './collapse.component.html',
  styleUrls: ['./collapse.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XCollapseComponent extends XCollapseProperty {
  start: number = 0;
  panelChanges: Function[] = [];
  configService = inject(XConfigService);

  change(num: number, add = true) {
    const i = this.active().indexOf(num);
    if (i === -1) {
      if (add) {
        this.active.set([...this.active(), num]);
      }
    } else {
      if (!add) {
        const active = this.active();
        active.slice(i, 1);
        this.active.set(active);
      }
    }
    if (this.accordion() && this.active().length === 2) {
      const panel = this.panelChanges[this.active()[0] as number];
      panel && panel();
      return;
    }
  }
}
