import { Component } from '@angular/core';
import {
  ExActionsComponent,
  ExDefaultComponent,
  ExHeaderComponent,
  ExSubmitTypeComponent
} from '@ng-nest/ui/sender/examples';

@Component({
  selector: 'te-sender',
  imports: [ExDefaultComponent, ExSubmitTypeComponent, ExActionsComponent, ExHeaderComponent],
  templateUrl: './sender.component.html'
})
export class TeSenderComponent {}
