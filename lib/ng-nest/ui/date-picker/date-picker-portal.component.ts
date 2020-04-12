import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnInit,
  Renderer2,
  OnDestroy,
  AfterViewInit
} from '@angular/core';
import { XDatePickerPortalPrefix, XDatePickerType } from './date-picker.property';
import { XIsEmpty } from '@ng-nest/ui/core';
import { Subscription, Subject } from 'rxjs';

@Component({
  selector: `${XDatePickerPortalPrefix}`,
  templateUrl: './date-picker-portal.component.html',
  styleUrls: ['./date-picker-portal.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XDatePickerPortalComponent implements OnInit, OnDestroy, AfterViewInit {
  type: XDatePickerType = 'date';
  display = new Date();
  model: Date;
  startYear: number;
  value: any;
  valueChange: Subject<any>;
  closePortal: Function;
  nodeEmit: Function;

  private _type: XDatePickerType;

  valueChange$: Subscription | null = null;
  docClickFunction: Function;

  constructor(public renderer: Renderer2, public cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.valueChange$ = this.valueChange.subscribe((x) => {
      this.value = x;
      this.init();
    });
    setTimeout(
      () =>
        (this.docClickFunction = this.renderer.listen('document', 'click', () => {
          this.closePortal();
        }))
    );
  }

  ngAfterViewInit() {
    this.init();
  }

  ngOnDestroy(): void {
    this.valueChange$?.unsubscribe();
    this.docClickFunction?.();
  }

  init() {
    if (!XIsEmpty(this.value)) {
      this.setDefault();
    } else {
      this.model = this.display;
    }
    this.type = this.type;
    this._type = this.type;
    this.setDisplay(this.model);
    this.cdr.detectChanges();
  }

  stopPropagation(event: Event): void {
    event.stopPropagation();
  }

  setDefault() {
    const date = new Date(this.value);
    this.model = date;
  }

  setDisplay(date: Date) {
    this.display = new Date(date.getFullYear(), date.getMonth(), 1);
  }

  dateChange(date: Date) {
    this.setDisplay(date);
    this.model = date;
    this.nodeEmit(date);
  }

  monthChange(date: Date) {
    this.setDisplay(date);
    if (this._type === 'month') {
      this.model = date;
      this.nodeEmit(date);
    } else {
      this.type = 'date';
    }
    this.cdr.markForCheck();
  }

  yearChange(date: Date) {
    this.setDisplay(date);
    if (this._type === 'year') {
      this.model = date;
      this.nodeEmit(date);
    } else {
      this.type = 'month';
    }
    this.cdr.markForCheck();
  }

  yearStartChange(number: number) {
    this.startYear = number;
    this.cdr.detectChanges();
  }

  nextMonth(num: number) {
    let date = new Date(this.display);
    date.setMonth(date.getMonth() + num);
    this.setDisplay(date);
    this.cdr.markForCheck();
  }

  nextYear(num: number) {
    let date = new Date(this.display);
    date.setFullYear(date.getFullYear() + num);
    this.setDisplay(date);
    this.cdr.markForCheck();
  }

  nextYears(num: number) {
    this.startYear += num;
    let date = new Date(this.display);
    date.setFullYear(this.startYear);
    this.setDisplay(date);
    this.cdr.markForCheck();
  }
}
