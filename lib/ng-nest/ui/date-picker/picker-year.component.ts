import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Renderer2,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { chunk, XIsChange } from '@ng-nest/ui/core';
import { XPickerYearProperty } from './date-picker.property';

@Component({
  selector: 'x-picker-year',
  templateUrl: './picker-year.component.html',
  styleUrls: ['./picker-year.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XPickerYearComponent extends XPickerYearProperty implements OnChanges {
  now = new Date();
  dates: Date[] = [];
  start: number;
  end: number;

  constructor(public renderer: Renderer2, public cdr: ChangeDetectorRef) {
    super();
  }

  ngOnChanges(simples: SimpleChanges) {
    XIsChange(simples.display) && this.init();
  }

  init() {
    this.setYears();
  }

  setYears() {
    let year = this.display.getFullYear();
    this.start = Math.floor(year / 10) * 10;
    this.end = this.start + 9;
    let dates: Date[] = [];
    for (let i = -3; i < 13; i++) {
      dates = [...dates, new Date(this.start + i, 1, 1)];
    }
    this.dates = chunk(dates, 4);
    this.startChange.emit(this.start);
  }

  yearClick(date: Date) {
    this.model = date;
    this.modelChange.emit(date);
    this.cdr.markForCheck();
  }
}
