import { Component } from '@angular/core';
import { XBubbleComponent } from '@ng-nest/ui/bubble';
import { XButtonComponent, XButtonsComponent } from '@ng-nest/ui/button';

@Component({
  selector: 'ex-header',
  imports: [XBubbleComponent, XButtonComponent, XButtonsComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class ExHeaderComponent {}
