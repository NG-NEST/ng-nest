import { Component } from '@angular/core';
import {
  ExDefaultComponent,
  ExCloseComponent,
  ExLoadingComponent,
  ExSingleComponent,
  ExTypeComponent
} from '@ng-nest/ui/message/examples';

@Component({
  selector: 'te-message',
  imports: [ExDefaultComponent, ExCloseComponent, ExLoadingComponent, ExSingleComponent, ExTypeComponent],
  templateUrl: './message.component.html'
})
export class TeMessageComponent {}
