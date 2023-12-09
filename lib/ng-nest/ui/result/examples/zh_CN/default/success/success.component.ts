import { Component } from '@angular/core';
import { XButtonComponent, XButtonsComponent } from '@ng-nest/ui/button';
import { XResultComponent } from '@ng-nest/ui/result';

@Component({
  selector: 'ex-success',
  standalone: true,
  imports: [XButtonComponent, XButtonsComponent, XResultComponent],
  templateUrl: './success.component.html'
})
export class ExSuccessComponent {}
