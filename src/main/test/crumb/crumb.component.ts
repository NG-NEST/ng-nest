import { Component } from '@angular/core';
import {
  ExCustomComponent,
  ExDefaultComponent,
  ExIconComponent,
  ExSeparatorComponent
} from '@ng-nest/ui/crumb/examples';

@Component({
  selector: 'te-crumb',
  imports: [ExCustomComponent, ExDefaultComponent, ExIconComponent, ExSeparatorComponent],
  templateUrl: './crumb.component.html'
})
export class TeCrumbComponent {}
