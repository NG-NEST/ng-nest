import { Component } from '@angular/core';
import { XButtonComponent } from '@ng-nest/ui/button';
import { XResultComponent } from '@ng-nest/ui/result';

@Component({
  selector: 'ex-error',
  standalone: true,
  imports: [XButtonComponent, XResultComponent],
  templateUrl: './error.component.html'
})
export class ExErrorComponent {}
