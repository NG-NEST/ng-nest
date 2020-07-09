import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Renderer2,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { chunk, XIsChange, XConfigService } from '@ng-nest/ui/core';
import { XPickerMonthProperty } from './date-picker.property';

@Component({
  selector: 'x-picker-month',
  templateUrl: './picker-month.component.html',
  styleUrls: ['./picker-month.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XPickerMonthComponent extends XPickerMonthProperty implements OnChanges {
  now = new Date();
  dates: Date[][] = [];

  constructor(public renderer: Renderer2, public cdr: ChangeDetectorRef, public configService: XConfigService) {
    super();
  }

  ngOnChanges(simples: SimpleChanges) {
    XIsChange(simples.display) && this.init();
  }

  init() {
    this.setMonths();
  }

  setMonths() {
    let year = this.display.getFullYear();
    let dates: Date[] = [];
    for (let i = 0; i < 16; i++) {
      dates = [...dates, new Date(year, i, 1)];
    }
    this.dates = chunk(dates, 4) as Date[][];
    if (this.dates.length > 0) {
      this.rangeChange.emit([dates[0], dates[dates.length - 1]]);
    }
  }

  monthClick(date: Date) {
    this.model = date;
    this.modelChange.emit(date);
    this.cdr.markForCheck();
  }
}
