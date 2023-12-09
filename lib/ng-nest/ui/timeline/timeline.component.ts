import {
  Component,
  OnInit,
  ViewEncapsulation,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  SimpleChanges,
  OnChanges,
  inject,
  OnDestroy
} from '@angular/core';
import { XTimelinePrefix, XTimelineNode, XTimelineProperty } from './timeline.property';
import { XIsChange, XSetData, XConfigService, XClearClass } from '@ng-nest/ui/core';
import { Subject } from 'rxjs';
import { CommonModule } from '@angular/common';
import { XIconComponent } from '@ng-nest/ui/icon';
import { XTimeAgoPipe } from '@ng-nest/ui/time-ago';
import { XLinkComponent } from '@ng-nest/ui/link';
import { XOutletDirective } from '@ng-nest/ui/outlet';

@Component({
  selector: `${XTimelinePrefix}`,
  standalone: true,
  imports: [CommonModule, XIconComponent, XTimeAgoPipe, XLinkComponent, XOutletDirective],
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XTimelineComponent extends XTimelineProperty implements OnInit, OnChanges, OnDestroy {
  nodes: XTimelineNode[] = [];
  private _unSubject = new Subject<void>();
  private cdr = inject(ChangeDetectorRef);
  configService = inject(XConfigService);

  ngOnInit() {
    this.setClassMap();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { data, mode } = changes;
    XIsChange(data) && this.setData();
    XIsChange(mode) && this.setClassMap();
  }

  ngOnDestroy(): void {
    this._unSubject.next();
    this._unSubject.unsubscribe();
  }

  setClassMap() {
    XClearClass(this.classMap);
    this.classMap[`${XTimelinePrefix}-${this.mode}`] = this.mode ? true : false;
    this.cdr.detectChanges();
  }

  trackByNode(_index: number, item: XTimelineNode) {
    return item.id;
  }

  private setData() {
    XSetData<XTimelineNode>(this.data, this._unSubject).subscribe((x) => {
      this.setDashed(x);
      this.nodes = x;
      this.cdr.detectChanges();
    });
  }

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
