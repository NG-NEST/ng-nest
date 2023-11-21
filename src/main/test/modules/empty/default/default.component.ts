import { Component } from '@angular/core';
import { XEmptyComponent } from '@ng-nest/ui/empty';

@Component({
  selector: 'ex-default',
  standalone: true,
  imports: [XEmptyComponent],
  templateUrl: './default.component.html'
})
export class ExDefaultComponent {}
