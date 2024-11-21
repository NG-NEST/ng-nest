import { Component, ViewEncapsulation, ChangeDetectionStrategy, HostBinding } from '@angular/core';
import { XExamplesPrefix } from './examples.property';

@Component({
  selector: `${XExamplesPrefix}`,
  templateUrl: './examples.component.html',
  styleUrls: ['./style/index.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XExamplesComponent {
  @HostBinding('class') className = XExamplesPrefix;
}
