import { Component } from '@angular/core';
import { ExDefaultComponent, ExCustomComponent } from '@ng-nest/ui/empty/examples';

@Component({
  selector: 'te-empty',
  standalone: true,
  imports: [ExDefaultComponent, ExCustomComponent],
  templateUrl: './empty.component.html'
})
export class TeEmptyComponent {}
