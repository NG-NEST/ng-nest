import { Component, ViewEncapsulation, ChangeDetectionStrategy, HostBinding } from '@angular/core';
import { XApiPrefix } from './api.property';

@Component({
  selector: `${XApiPrefix}`,
  templateUrl: './api.component.html',
  styleUrls: ['./style/index.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XApiComponent {
  @HostBinding(`class`) className = XApiPrefix;
}
