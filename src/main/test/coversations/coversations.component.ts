import { Component } from '@angular/core';
import {
  ExDefaultComponent,
  ExModelComponent,
  ExTemplateComponent,
  ExGroupComponent
} from '@ng-nest/ui/coversations/examples';

@Component({
  selector: 'te-coversations',
  imports: [ExDefaultComponent, ExTemplateComponent, ExModelComponent, ExGroupComponent],
  templateUrl: './coversations.component.html'
})
export class TeCoversationsComponent {}
