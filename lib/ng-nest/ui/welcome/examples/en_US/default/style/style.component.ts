import { Component } from '@angular/core';
import { XWelcomeComponent } from '@ng-nest/ui/welcome';

@Component({
  selector: 'ex-style',
  imports: [XWelcomeComponent],
  templateUrl: './style.component.html',
  styleUrl: './style.component.scss'
})
export class ExStyleComponent {}
