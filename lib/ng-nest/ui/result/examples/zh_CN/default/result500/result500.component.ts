import { Component } from '@angular/core';
import { XButtonComponent } from '@ng-nest/ui/button';
import { XResultComponent } from '@ng-nest/ui/result';

@Component({
  selector: 'ex-result500',
  standalone: true,
  imports: [XButtonComponent, XResultComponent],
  templateUrl: './result500.component.html'
})
export class ExResult500Component {}
