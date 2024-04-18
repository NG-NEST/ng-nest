import { Component, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { XAffixPrefix, XAffixProperty } from './affix.property';

@Component({
  selector: `${XAffixPrefix}`,
  standalone: true,
  templateUrl: './affix.component.html',
  styleUrls: ['./affix.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XAffixComponent extends XAffixProperty {}
