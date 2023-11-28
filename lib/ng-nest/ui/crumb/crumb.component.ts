import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  OnChanges,
  SimpleChanges,
  ChangeDetectorRef,
  OnDestroy,
  inject
} from '@angular/core';
import { XCrumbPrefix, XCrumbNode, XCrumbProperty } from './crumb.property';
import { XIsChange, XSetData, XConfigService } from '@ng-nest/ui/core';
import { Subject } from 'rxjs';
import { XLinkComponent } from '@ng-nest/ui/link';
import { XOutletDirective } from '@ng-nest/ui/outlet';
import { CommonModule } from '@angular/common';

@Component({
  selector: `${XCrumbPrefix}`,
  standalone: true,
  imports: [CommonModule, XLinkComponent, XOutletDirective],
  templateUrl: './crumb.component.html',
  styleUrls: ['./style/index.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XCrumbComponent extends XCrumbProperty implements OnChanges, OnDestroy {
  nodes: XCrumbNode[] = [];
  private _unSubject = new Subject<void>();
  private cdr = inject(ChangeDetectorRef);
  configService = inject(XConfigService);

  ngOnChanges(changes: SimpleChanges): void {
    const { data } = changes;
    XIsChange(data) && this.setData();
  }

  ngOnDestroy(): void {
    this._unSubject.next();
    this._unSubject.unsubscribe();
  }

  action(type: string, option: XCrumbNode, event: Event) {
    switch (type) {
      case 'click':
        this.nodeClick.emit({
          event: event,
          node: option
        });
        break;
    }
  }

  trackByNode(_index: number, item: XCrumbNode) {
    return item.id;
  }

  private setData() {
    XSetData<XCrumbNode>(this.data, this._unSubject).subscribe((x) => {
      this.nodes = x;
      this.cdr.detectChanges();
    });
  }
}
