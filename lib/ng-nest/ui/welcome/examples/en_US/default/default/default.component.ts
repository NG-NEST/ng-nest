import { Component } from '@angular/core';
import { XWelcomeComponent } from '@ng-nest/ui/welcome';

@Component({
  selector: 'ex-default',
  imports: [XWelcomeComponent],
  templateUrl: './default.component.html',
  styleUrl: './default.component.scss'
})
export class ExDefaultComponent {}
