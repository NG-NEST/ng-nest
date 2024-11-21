import { Component } from '@angular/core';
import {
  ExDefaultComponent,
  ExContainerComponent,
  ExCustomComponent,
  ExMultipleComponent,
  ExServiceComponent,
  ExTitleComponent
} from '@ng-nest/ui/drawer/examples';

@Component({
  selector: 'te-drawer',
  imports: [
    ExDefaultComponent,
    ExContainerComponent,
    ExCustomComponent,
    ExMultipleComponent,
    ExServiceComponent,
    ExTitleComponent
  ],
  templateUrl: './drawer.component.html'
})
export class TeDrawerComponent {}
