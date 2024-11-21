import { Component } from '@angular/core';
import {
  ExDefaultComponent,
  ExActionComponent,
  ExCardComponent,
  ExCustomComponent,
  ExExpandComponent,
  ExLayoutComponent,
  ExRouterComponent,
  ExTagComponent
} from '@ng-nest/ui/tabs/examples';

@Component({
  selector: 'te-tabs',
  imports: [
    ExDefaultComponent,
    ExActionComponent,
    ExCardComponent,
    ExCustomComponent,
    ExExpandComponent,
    ExLayoutComponent,
    ExRouterComponent,
    ExTagComponent
  ],
  templateUrl: './tabs.component.html'
})
export class TeTabsComponent {}
