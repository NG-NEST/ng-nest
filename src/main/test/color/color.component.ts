import { Component } from '@angular/core';
import {
  ExDefaultComponent,
  ExAssistComponent,
  ExNeutralComponent
} from '@ng-nest/ui/color/examples';

@Component({
  selector: 'te-color',
  imports: [ExDefaultComponent, ExAssistComponent, ExNeutralComponent],
  templateUrl: './color.component.html'
})
export class TeColorComponent {}
