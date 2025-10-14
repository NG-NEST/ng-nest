import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, ViewEncapsulation } from '@angular/core';
import { XThoughtChainNode, XThoughtChainProperty } from './thought-chain.property';
import { XTimelineComponent } from '@ng-nest/ui/timeline';
import { XOutletDirective } from '@ng-nest/ui/outlet';
import { XIconComponent } from '@ng-nest/ui/icon';
import { XLoadingComponent } from '@ng-nest/ui/loading';
import { XCollapseModule } from '@ng-nest/ui/collapse';

@Component({
  selector: 'x-thought-chain',
  templateUrl: './thought-chain.component.html',
  styleUrls: ['./thought-chain.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [XTimelineComponent, XOutletDirective, XIconComponent, XLoadingComponent, XCollapseModule]
})
export class XThoughtChainComponent extends XThoughtChainProperty {
  cdr = inject(ChangeDetectorRef);
  addNode(node: XThoughtChainNode) {
    this.data.update((x) => [...x, node]);
  }

  updateNode(node: XThoughtChainNode) {
    const nd = this.data().find((x) => x.id === node.id);
    if (nd) Object.assign(nd, node);
    this.cdr.detectChanges();
  }

  removeNode(node: XThoughtChainNode) {
    this.data.update((x) => [...x.filter((y) => y.id !== node.id)]);
  }
}
