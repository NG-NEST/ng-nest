import {
  Component,
  OnInit,
  ViewEncapsulation,
  Renderer2,
  ElementRef,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  SimpleChanges,
  OnChanges,
  OnDestroy,
  AfterViewInit
} from '@angular/core';
import { XStepsPrefix, XStepsNode, XStepsProperty } from './steps.property';
import { XIsChange, XIsUndefined, XIsNumber, XSetData, XIsEmpty, XConfigService } from '@ng-nest/ui/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: `${XStepsPrefix}`,
  templateUrl: './steps.component.html',
  styleUrls: ['./steps.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XStepsComponent extends XStepsProperty implements OnInit, OnChanges, OnDestroy, AfterViewInit {
  nodes: XStepsNode[] = [];
  private _unSubject = new Subject<void>();

  constructor(
    public renderer: Renderer2,
    public elementRef: ElementRef,
    public cdr: ChangeDetectorRef,
    public configService: XConfigService
  ) {
    super();
  }

  ngOnInit() {
    this.setClassMap();
  }

  ngOnChanges(changes: SimpleChanges) {
    XIsChange(changes.data) && this.setData();
    XIsChange(changes.activatedIndex) && this.setActivated();
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
      if (XIsUndefined(this.activatedIndex)) {
        x.status = 'wait';
      } else if (XIsNumber(this.activatedIndex)) {
        x.status = index < this.activatedIndex ? 'finish' : index === this.activatedIndex ? 'process' : 'wait';
      }
      if (this.status && index === this.activatedIndex) x.status = this.status;
      return x;
    });
  }

  private setActivated() {
    this.nodes = this.setStatus(this.nodes);
    this.cdr.detectChanges();
  }
}
