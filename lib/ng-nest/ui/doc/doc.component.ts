import { Component, ViewEncapsulation, ChangeDetectionStrategy, HostBinding } from '@angular/core';
import { XDocPrefix } from './doc.property';

@Component({
  selector: XDocPrefix,
  standalone: true,
  templateUrl: './doc.component.html',
  styleUrls: ['./style/index.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XDocComponent {
  @HostBinding('class') className = XDocPrefix;
}
