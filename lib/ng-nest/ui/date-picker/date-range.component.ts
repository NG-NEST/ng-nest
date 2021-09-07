import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnChanges, OnInit, Renderer2, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { XValueAccessor } from '@ng-nest/ui/base-form';
import { XConfigService } from '@ng-nest/ui/core';
import { XDateRangePrefix, XDateRangeProperty } from './date-picker.property';

@Component({
  selector: `${XDateRangePrefix}`,
  templateUrl: './date-range.component.html',
  styleUrls: ['./date-range.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [XValueAccessor(XDateRangeComponent), DatePipe]
})
export class XDateRangeComponent extends XDateRangeProperty implements OnInit, OnChanges {
  constructor(public renderer: Renderer2, public configService: XConfigService) {
    super();
  }

  ngOnInit(): void {}
  ngOnChanges(changes: SimpleChanges): void {}
}
