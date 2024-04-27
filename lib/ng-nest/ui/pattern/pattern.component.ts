import { Component, ViewEncapsulation, ChangeDetectionStrategy, HostBinding } from '@angular/core';

@Component({
  selector: 'x-pattern',
  standalone: true,
  templateUrl: './pattern.component.html',
  styleUrls: ['./style/index.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XPatternComponent {
  @HostBinding('class.x-pattern') _has = true;
}
