import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy, inject } from '@angular/core';
import { XCollapsePrefix, XCollapseProperty } from './collapse.property';
import { XIsArray, XConfigService } from '@ng-nest/ui/core';

@Component({
  selector: `${XCollapsePrefix}`,
  standalone: true,
  templateUrl: './collapse.component.html',
  styleUrls: ['./collapse.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XCollapseComponent extends XCollapseProperty implements OnInit {
  start: number = 0;
  panelChanges: Function[] = [];
  configService = inject(XConfigService);

  ngOnInit() {
    if (!XIsArray(this.active)) this.active = [Number(this.active)];
  }

  change(num: number, add = true) {
    this.active = this.active as number[];
    const i = this.active.indexOf(num);
    if (i === -1) {
      if (add) {
        this.active = [...this.active, num];
      }
    } else {
      if (!add) {
        this.active.splice(i, 1);
      }
    }
    if (this.accordion && this.active.length === 2) {
      const panel = this.panelChanges[this.active[0] as number];
      panel && panel();
      return;
    }
    this.activeChange.emit(this.active);
  }
}
