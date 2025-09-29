import { Component } from '@angular/core';
import { ExDefaultComponent, ExDisabledComponent, ExVerticalComponent } from '@ng-nest/ui/prompts/examples';

@Component({
  selector: 'te-prompts',
  imports: [ExDefaultComponent, ExDisabledComponent, ExVerticalComponent],
  templateUrl: './prompts.component.html'
})
export class TePromptsComponent {}
