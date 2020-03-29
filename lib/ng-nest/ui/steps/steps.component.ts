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
  Input,
  OnDestroy,
  AfterViewInit
} from '@angular/core';
import { XStepsPrefix, XStepsNode, XStepsLayout, XStepsStatus } from './steps.type';
import {
  XClassMap,
  XDataConvert,
  XData,
  XIsChange,
  XIsObservable,
  XToDataConvert,
  XIsUndefined,
  XIsNumber,
  XInputNumber
} from '@ng-nest/ui/core';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

@Component({
  selector: `${XStepsPrefix}`,
  templateUrl: './steps.component.html',
  styleUrls: ['./steps.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XStepsComponent implements OnInit, OnChanges, OnDestroy, AfterViewInit {
  @Input() @XDataConvert() data?: XData<XStepsNode[]>;
  @Input() layout: XStepsLayout = 'row';
  @Input() @XInputNumber() activatedIndex: number;
  @Input('start-index') @XInputNumber() startIndex: number = 0;
  @Input() status: XStepsStatus;
  nodes: XStepsNode[] = [];
  classMap: XClassMap = {};
  private unSubject = new Subject();

  constructor(public renderer: Renderer2, public elementRef: ElementRef, public cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.setClassMap();
  }

  ngOnChanges(changes: SimpleChanges) {
    XIsChange(changes.data) && this.setData();
    XIsChange(changes.activatedIndex) && this.setActivated();
  }

  ngOnDestroy(): void {
    this.unSubject.next();
    this.unSubject.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }

  setClassMap() {
    this.classMap[`${XStepsPrefix}-${this.layout}`] = this.layout ? true : false;
  }

  private setData() {
    if (typeof this.data === 'undefined') return;
    if (XIsObservable(this.data)) {
      (this.data as Observable<any>)
        .pipe(
          map(x => XToDataConvert(x)),
          takeUntil(this.unSubject)
        )
        .subscribe(x => {
          this.setDataChange(x);
        });
    } else {
      this.setDataChange(this.data as XStepsNode[]);
    }
  }

  private setDataChange(value: XStepsNode[]) {
    this.nodes = this.setStatus(value);
    this.cdr.detectChanges();
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
