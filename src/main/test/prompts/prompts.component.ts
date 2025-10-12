import { Component } from '@angular/core';
import {
  ExDefaultComponent,
  ExDisabledComponent,
  ExVerticalComponent,
  ExWrapComponent,
  ExStyleComponent
} from '@ng-nest/ui/prompts/examples';

@Component({
  selector: 'te-prompts',
  imports: [ExDefaultComponent, ExDisabledComponent, ExVerticalComponent, ExWrapComponent, ExStyleComponent],
  templateUrl: './prompts.component.html'
})
export class TePromptsComponent {}
