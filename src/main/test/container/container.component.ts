import { Component } from '@angular/core';
import { ExDefaultComponent } from '@ng-nest/ui/container/examples';

@Component({
  selector: 'te-container',
  standalone: true,
  imports: [ExDefaultComponent],
  templateUrl: './container.component.html'
})
export class TeContainerComponent {}
