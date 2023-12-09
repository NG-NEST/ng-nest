import { Component } from '@angular/core';
import { ExDefaultComponent } from '@ng-nest/ui/outlet/examples';

@Component({
  selector: 'te-outlet',
  standalone: true,
  imports: [ExDefaultComponent],
  templateUrl: './outlet.component.html'
})
export class TeOutletComponent {}
