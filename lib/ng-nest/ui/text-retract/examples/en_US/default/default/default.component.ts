import { Component, signal } from '@angular/core';
import { XTextRetractComponent } from '@ng-nest/ui/text-retract';

@Component({
  selector: 'ex-default',
  imports: [XTextRetractComponent],
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class ExDefaultComponent {
  content = signal(`The more you learn, the more you don't know. The more you learn, the more you don't know. 
  The more you learn, the more you don't know. The more you learn, the more you don't know. 
  The more you learn, the more you don't know. The more you learn, the more you don't know. 
  The more you learn, the more you don't know. The more you learn, the more you don't know. 
  The more you learn, the more you don't know. The more you learn, the more you don't know. 
  The more you learn, the more you don't know. The more you learn, the more you don't know. `);
}
