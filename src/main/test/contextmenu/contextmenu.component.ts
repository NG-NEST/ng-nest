import { Component } from '@angular/core';
import {
  ExDefaultComponent,
  ExTreeComponent,
  ExPortalComponent,
  ExSizeComponent,
  ExDisabledComponent
} from '@ng-nest/ui/contextmenu/examples';

@Component({
  selector: 'te-contextmenu',
  imports: [ExDefaultComponent, ExPortalComponent, ExSizeComponent, ExDisabledComponent, ExTreeComponent],
  templateUrl: './contextmenu.component.html'
})
export class TeContextmenuComponent {}
