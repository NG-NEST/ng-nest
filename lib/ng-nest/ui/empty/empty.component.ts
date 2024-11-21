import { Component, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { XEmptyPrefix, XEmptyProperty } from './empty.property';
import { XOutletDirective } from '@ng-nest/ui/outlet';
import { XIconComponent } from '@ng-nest/ui/icon';
import { XI18nPipe } from '@ng-nest/ui/i18n';

@Component({
  selector: `${XEmptyPrefix}`,
  imports: [XOutletDirective, XIconComponent, XI18nPipe],
  templateUrl: './empty.component.html',
  styleUrls: ['./empty.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XEmptyComponent extends XEmptyProperty {}
