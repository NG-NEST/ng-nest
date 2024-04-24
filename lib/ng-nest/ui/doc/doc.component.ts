import { Component, ViewEncapsulation, ChangeDetectionStrategy, HostBinding } from '@angular/core';

@Component({
  selector: 'x-doc',
  standalone: true,
  templateUrl: './doc.component.html',
  styleUrls: ['./style/index.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XDocComponent {
  @HostBinding('class.x-doc') _has = true;
}
