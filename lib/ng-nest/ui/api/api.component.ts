import { Component, ViewEncapsulation, ChangeDetectionStrategy, HostBinding } from '@angular/core';
import { XApiPrefix } from './api.property';

@Component({
  selector: `${XApiPrefix}`,
  standalone: true,
  templateUrl: './api.component.html',
  styleUrls: ['./style/index.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XApiComponent {
  @HostBinding(`class.${XApiPrefix}`) _has = true;
}
