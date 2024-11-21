import { Component, signal } from '@angular/core';
import { XCheckboxComponent } from '@ng-nest/ui/checkbox';

@Component({
  selector: 'ex-vertical',
  imports: [XCheckboxComponent],
  templateUrl: './vertical.component.html',
  styleUrls: ['./vertical.component.scss']
})
export class ExVerticalComponent {
  data = signal(['QQ', '微信', '钉钉', '微博']);
  model = signal(['微信']);
}
