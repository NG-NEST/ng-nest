import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnInit,
  Renderer2,
  OnDestroy,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  ElementRef,
  TemplateRef
} from '@angular/core';
import { chunk, XIsChange } from '@ng-nest/ui/core';

@Component({
  selector: 'x-picker-month',
  templateUrl: './picker-month.component.html',
  styleUrls: ['./picker-month.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XPickerMonthComponent implements OnInit, OnChanges, OnDestroy {
  now = new Date();
  @Input() display = new Date();
  @Input() model;
  @Input() monthTemp?: TemplateRef<any>;
  @Output() modelChange = new EventEmitter();
  @Output() rangeChange = new EventEmitter();
  dates = [];

  constructor(public renderer: Renderer2, public cdr: ChangeDetectorRef) {}

  ngOnInit(): void {}

  ngOnChanges(simples: SimpleChanges) {
    XIsChange(simples.display) && this.init();
  }

  ngOnDestroy(): void {}

  init() {
    this.setMonths();
  }

  setMonths() {
    let year = this.display.getFullYear();
    let dates = [];
    for (let i = 0; i < 16; i++) {
      dates = [...dates, new Date(year, i, 1)];
    }
    this.dates = chunk(dates, 4);
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
