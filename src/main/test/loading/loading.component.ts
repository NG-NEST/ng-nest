import { Component } from '@angular/core';
import {
  ExDefaultComponent,
  ExCustomComponent,
  ExFullScreenComponent,
  ExTypeComponent
} from '@ng-nest/ui/loading/examples';

@Component({
  selector: 'te-loading',
  imports: [ExDefaultComponent, ExCustomComponent, ExFullScreenComponent, ExTypeComponent],
  templateUrl: './loading.component.html'
})
export class TeLoadingComponent {}
