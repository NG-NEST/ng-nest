import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'x-sender-stop',
  templateUrl: './stop.component.html',
  styleUrls: ['./stop.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: []
})
export class XSenderStopComponent {}
