import { Component } from '@angular/core';
import { XButtonComponent } from '@ng-nest/ui/button';

@Component({
  selector: 'ex-text',
  standalone: true,
  imports: [XButtonComponent],
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss']
})
export class ExTextComponent {}
