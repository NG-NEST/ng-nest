import { Component } from '@angular/core';
import { XTextRetractComponent } from '@ng-nest/ui/text-retract';

@Component({
  selector: 'ex-default',
  standalone: true,
  imports: [XTextRetractComponent],
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class ExDefaultComponent {
  content = `The more you learn, the more you don't know. The more you learn, the more you don't know. 
  The more you learn, the more you don't know. The more you learn, the more you don't know. 
  The more you learn, the more you don't know. The more you learn, the more you don't know. 
  The more you learn, the more you don't know. The more you learn, the more you don't know. 
  The more you learn, the more you don't know. The more you learn, the more you don't know. 
  The more you learn, the more you don't know. The more you learn, the more you don't know. `;
}
