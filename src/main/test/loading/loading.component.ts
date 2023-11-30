import { Component } from '@angular/core';
import { ExDefaultComponent, ExCustomComponent, ExFullScreenComponent } from '@ng-nest/ui/loading/examples';

@Component({
  selector: 'te-loading',
  standalone: true,
  imports: [ExDefaultComponent, ExCustomComponent, ExFullScreenComponent],
  templateUrl: './loading.component.html'
})
export class TeLoadingComponent {}
