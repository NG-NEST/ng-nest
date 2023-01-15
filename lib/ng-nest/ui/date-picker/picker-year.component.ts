import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Renderer2,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { XChunk, XIsChange, XConfigService } from '@ng-nest/ui/core';
import { XPickerYearProperty } from './date-picker.property';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'x-picker-year',
  templateUrl: './picker-year.component.html',
  styleUrls: ['./picker-year.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DatePipe]
})
export class XPickerYearComponent extends XPickerYearProperty implements OnChanges {
  now = new Date();
  dates: Date[][] = [];
  start!: number;
  end!: number;

  constructor(public renderer: Renderer2, public cdr: ChangeDetectorRef, public datePipe: DatePipe, public configService: XConfigService) {
    super();
  }

  ngOnChanges(simples: SimpleChanges) {
    const { display } = simples;
    XIsChange(display) && this.init();
  }

  init() {
    this.setYears(this.display);
  }

  setYears(date: Date) {
    let year = date.getFullYear();
    this.start = Math.floor(year / 10) * 10;
    this.end = this.start + 9;
    let dates: Date[] = [];
    for (let i = -3; i < 13; i++) {
      dates = [...dates, new Date(this.start + i, 1, 1)];
    }
    this.dates = XChunk(dates, 4) as Date[][];
    this.startChange.emit(this.start);
  }

  yearClick(date: Date) {
    this.model = date;
    this.modelChange.emit(date);
    this.cdr.markForCheck();
  }

  lastOrNext(year: Date) {
    const yearStr = this.datePipe.transform(year, 'yyyy') as string;
    return yearStr < `${this.start}` || yearStr > `${this.end}`;
  }

  setDisplay(date: Date) {
    this.display = new Date(date.getFullYear(), date.getMonth(), 1);
    this.setYears(this.display);
  }

  nextYears(num: number) {
    this.start += num;
    let date = new Date(this.display);
    date.setFullYear(this.start);
    this.setDisplay(date);
    this.cdr.detectChanges();
  }

  equalYear(one: Date, two: Date) {
    return this.datePipe.transform(one, 'yyyy') === this.datePipe.transform(two, 'yyyy');
  }

  trackByYear(_index: number, item: Date) {
    return item;
  }
}
