import { Component, ViewEncapsulation, ChangeDetectionStrategy, HostBinding } from '@angular/core';
import { XPatternPrefix } from './pattern.property';

@Component({
  selector: XPatternPrefix,
  standalone: true,
  templateUrl: './pattern.component.html',
  styleUrls: ['./style/index.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XPatternComponent {
  @HostBinding('class') className = XPatternPrefix;
}
