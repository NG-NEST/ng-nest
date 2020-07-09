import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  OnChanges,
  SimpleChanges,
  ChangeDetectorRef,
  OnDestroy
} from '@angular/core';
import { XCrumbPrefix, XCrumbNode, XCrumbProperty } from './crumb.property';
import { XIsChange, XSetData, XConfigService } from '@ng-nest/ui/core';
import { Subject } from 'rxjs';

@Component({
  selector: `${XCrumbPrefix}`,
  templateUrl: './crumb.component.html',
  styleUrls: ['./style/index.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XCrumbComponent extends XCrumbProperty implements OnChanges, OnDestroy {
  nodes: XCrumbNode[] = [];
  private _unSubject = new Subject<void>();

  constructor(private cdr: ChangeDetectorRef, public configService: XConfigService) {
    super();
  }

  ngOnChanges(changes: SimpleChanges): void {
    XIsChange(changes.data) && this.setData();
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

  private setData() {
    XSetData<XCrumbNode>(this.data, this._unSubject).subscribe((x) => {
      this.nodes = x;
      this.cdr.detectChanges();
    });
  }
}
