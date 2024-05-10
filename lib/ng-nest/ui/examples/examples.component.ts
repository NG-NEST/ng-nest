import { Component, ViewEncapsulation, ChangeDetectionStrategy, HostBinding } from '@angular/core';
import { XExamplesPrefix } from './examples.property';

@Component({
  selector: `${XExamplesPrefix}`,
  standalone: true,
  templateUrl: './examples.component.html',
  styleUrls: ['./style/index.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XExamplesComponent {
  @HostBinding('class') className = XExamplesPrefix;
}
