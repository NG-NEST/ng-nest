import {
  Component,
  OnInit,
  ViewEncapsulation,
  Renderer2,
  ElementRef,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  ViewChild,
  SimpleChanges,
  OnChanges,
  Input
} from '@angular/core';
import { XStatisticPrefix } from './statistic.type';
import { XTemplate, XIsNumber } from '@ng-nest/ui/core';

@Component({
  selector: `${XStatisticPrefix}`,
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XStatisticComponent implements OnChanges {
  @Input() value?: XTemplate;
  @Input() label?: XTemplate;
  @Input() prefix?: XTemplate;
  @Input() suffix?: XTemplate;
  @Input() valueStyle = {};
  @ViewChild('statistic', { static: true }) statistic: ElementRef;
  displayInt = '';
  displayDecimal = '';

  ngOnChanges(simple: SimpleChanges) {
    let valueChange = simple.value;
    if (valueChange && valueChange.currentValue !== valueChange.previousValue) {
      this.setDisplay();
      console.log(this.value);
    }
  }

  setDisplay() {
    const decimalSeparator: string = '.';
    const val = String(this.value);
    const [int, decimal] = val.split(decimalSeparator);
    this.displayInt = decimal ? `${int}${decimalSeparator}` : int;
    this.displayDecimal = decimal;
  }
}
