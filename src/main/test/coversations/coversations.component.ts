import { Component } from '@angular/core';
import {
  ExDefaultComponent,
  ExModelComponent,
  ExTemplateComponent,
  ExGroupComponent,
  ExLoadMoreComponent
} from '@ng-nest/ui/coversations/examples';

@Component({
  selector: 'te-coversations',
  imports: [ExDefaultComponent, ExTemplateComponent, ExModelComponent, ExGroupComponent, ExLoadMoreComponent],
  templateUrl: './coversations.component.html'
})
export class TeCoversationsComponent {}
