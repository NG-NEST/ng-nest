import { Component, ViewEncapsulation, ChangeDetectionStrategy, signal, SimpleChanges } from '@angular/core';
import { XCollapsePrefix, XCollapseProperty } from './collapse.property';
import { XIsChange } from '@ng-nest/ui/core';

@Component({
  selector: `${XCollapsePrefix}`,
  templateUrl: './collapse.component.html',
  styleUrls: ['./collapse.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XCollapseComponent extends XCollapseProperty {
  start = signal(0);
  panelChanges = signal<(() => void)[]>([]);

  ngOnChanges(changes: SimpleChanges) {
    const { active } = changes;
    XIsChange(active) && this.setActives();
  }

  setActives() {
    for (let active of this.active()) {
      const panel = this.panelChanges()[active];
      panel && panel();
    }
  }

  change(num: number, add = true) {
    const i = this.active().indexOf(num);
    if (i === -1) {
      if (add) {
        this.active.update((x) => [...x, num]);
      }
    } else {
      if (!add) {
        this.active.update((x) => {
          x.splice(i, 1);
          return [...x];
        });
      }
    }
    if (this.accordion() && this.active().length === 2) {
      const panel = this.panelChanges()[this.active()[0] as number];
      panel && panel();
      return;
    }
  }
}
