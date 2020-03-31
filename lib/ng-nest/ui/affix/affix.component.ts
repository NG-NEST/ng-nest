import { Component, ViewEncapsulation, ChangeDetectionStrategy, Input } from '@angular/core';
import { XAffixPrefix } from './affix.type';

@Component({
  selector: `${XAffixPrefix}`,
  templateUrl: './affix.component.html',
  styleUrls: ['./affix.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XAffixComponent {
  @Input() top?: string;
  @Input() left?: string;
}
