import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { XCollapsePanelPrefix, XCollapsePanelProperty } from './collapse.property';
import { XCollapseComponent } from './collapse.component';
import { XIconComponent } from '@ng-nest/ui/icon';
import { XOutletDirective } from '@ng-nest/ui/outlet';

@Component({
  selector: `${XCollapsePanelPrefix}`,
  imports: [XIconComponent, XOutletDirective],
  templateUrl: './collapse-panel.component.html',
  styleUrls: ['./collapse-panel.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XCollapsePanelComponent extends XCollapsePanelProperty implements OnInit {
  index = signal<number>(0);
  collapseComponent = inject(XCollapseComponent, { optional: true, host: true });
  activeSignal = signal(false);

  ngOnInit() {
    if (!this.collapseComponent) return;
    this.activeSignal.set(this.active());
    this.index.set(this.collapseComponent.start());
    this.collapseComponent.start.update((x) => x + 1);
    this.collapseComponent.panelChanges.update((x) => {
      x.push(() => {
        this.headerClick();
      });
      return [...x];
    });
    if (this.activeSignal()) {
      this.collapseComponent.change(this.index());
    }
  }

  headerClick() {
    this.activeSignal.update((x) => !x);
    if (!this.collapseComponent) return;
    if (this.activeSignal()) this.collapseComponent.change(this.index());
    else this.collapseComponent.change(this.index(), false);
  }
}
