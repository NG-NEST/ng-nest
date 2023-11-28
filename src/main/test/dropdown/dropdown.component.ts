import { Component } from '@angular/core';
import {
  ExDefaultComponent,
  ExMultistageComponent,
  ExPropComponent,
  ExTriggerComponent
} from '@ng-nest/ui/dropdown/examples';

@Component({
  selector: 'te-dropdown',
  standalone: true,
  imports: [ExDefaultComponent, ExMultistageComponent, ExPropComponent, ExTriggerComponent],
  templateUrl: './dropdown.component.html'
})
export class TeDropdownComponent {}
