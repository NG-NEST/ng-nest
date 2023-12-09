import {
  Component,
  OnInit,
  ViewEncapsulation,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  SimpleChanges,
  OnChanges,
  OnDestroy,
  AfterViewInit,
  inject
} from '@angular/core';
import { XStepsPrefix, XStepsNode, XStepsProperty } from './steps.property';
import { XIsChange, XIsUndefined, XIsNumber, XSetData, XIsEmpty, XConfigService } from '@ng-nest/ui/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { XIconComponent } from '@ng-nest/ui/icon';
import { XOutletDirective } from '@ng-nest/ui/outlet';

@Component({
  selector: `${XStepsPrefix}`,
  standalone: true,
  imports: [CommonModule, XIconComponent, XOutletDirective],
  templateUrl: './steps.component.html',
  styleUrls: ['./steps.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XStepsComponent extends XStepsProperty implements OnInit, OnChanges, OnDestroy, AfterViewInit {
  nodes: XStepsNode[] = [];
  private _unSubject = new Subject<void>();
  private cdr = inject(ChangeDetectorRef);
  configService = inject(XConfigService);

  ngOnInit() {
    this.setClassMap();
  }

  ngOnChanges(changes: SimpleChanges) {
    const { data, activatedIndex } = changes;
    XIsChange(data) && this.setData();
    XIsChange(activatedIndex) && this.setActivated();
  }

  ngOnDestroy(): void {
    this._unSubject.next();
    this._unSubject.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }

  setClassMap() {
    this.classMap[`${XStepsPrefix}-${this.layout}`] = !XIsEmpty(this.layout);
  }

  getIndex(index: number) {
    return Number(this.startIndex) + index + 1;
  }

  private setData() {
    XSetData<XStepsNode>(this.data, this._unSubject)
      .pipe(map((x) => this.setStatus(x)))
      .subscribe((x) => {
        this.nodes = x;
        this.cdr.detectChanges();
      });
  }

  private setStatus(value: XStepsNode[]) {
    return value.map((x, index) => {
      if (this.nodeStatus) {
        if (XIsUndefined(x.status)) {
          x.status = 'wait';
        }
      } else {
        if (XIsUndefined(this.activatedIndex)) {
          x.status = 'wait';
        } else if (XIsNumber(this.activatedIndex)) {
          x.status =
            index < Number(this.activatedIndex) ? 'finish' : index === this.activatedIndex ? 'process' : 'wait';
        }
        if (this.status && index === this.activatedIndex) x.status = this.status;
      }

      return x;
    });
  }

  private setActivated() {
    this.nodes = this.setStatus(this.nodes);
    this.cdr.detectChanges();
  }

  trackByNode(_index: number, item: XStepsNode) {
    return item.id;
  }
}
