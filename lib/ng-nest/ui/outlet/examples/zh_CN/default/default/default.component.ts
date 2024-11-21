import { Component, signal } from '@angular/core';
import { XOutletDirective } from '@ng-nest/ui/outlet';

@Component({
  selector: 'ex-default',
  imports: [XOutletDirective],
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class ExDefaultComponent {
  label = signal('字符串');
}
