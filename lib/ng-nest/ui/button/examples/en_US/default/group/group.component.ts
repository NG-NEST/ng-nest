import { Component } from '@angular/core';
import { XButtonComponent, XButtonsComponent } from '@ng-nest/ui/button';

@Component({
  selector: 'ex-group',
  standalone: true,
  imports: [XButtonComponent, XButtonsComponent],
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class ExGroupComponent {}
