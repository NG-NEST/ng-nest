import { Component, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { XAffixPrefix, XAffixProperty } from './affix.property';
import { XConfigService } from '@ng-nest/ui/core';

@Component({
  selector: `${XAffixPrefix}`,
  templateUrl: './affix.component.html',
  styleUrls: ['./affix.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XAffixComponent extends XAffixProperty {
  constructor(public configService: XConfigService) {
    super();
  }
}
