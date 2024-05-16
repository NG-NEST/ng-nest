import { Component, signal } from '@angular/core';
import { XRadioComponent } from '@ng-nest/ui/radio';

@Component({
  selector: 'ex-vertical',
  standalone: true,
  imports: [XRadioComponent],
  templateUrl: './vertical.component.html',
  styleUrls: ['./vertical.component.scss']
})
export class ExVerticalComponent {
  data = signal(['QQ', '微信', '钉钉', '微博']);
}
