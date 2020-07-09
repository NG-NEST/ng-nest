import { Component, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { XEmptyPrefix, XEmptyProperty } from './empty.property';
import { XConfigService } from '@ng-nest/ui/core';

@Component({
  selector: `${XEmptyPrefix}`,
  templateUrl: './empty.component.html',
  styleUrls: ['./empty.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XEmptyComponent extends XEmptyProperty {
  constructor(public configService: XConfigService) {
    super();
  }
}
