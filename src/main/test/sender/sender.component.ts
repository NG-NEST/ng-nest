import { Component } from '@angular/core';
import { ExActionsComponent, ExDefaultComponent, ExSubmitTypeComponent } from '@ng-nest/ui/sender/examples';

@Component({
  selector: 'te-sender',
  imports: [ExDefaultComponent, ExSubmitTypeComponent, ExActionsComponent],
  templateUrl: './sender.component.html'
})
export class TeSenderComponent {}
