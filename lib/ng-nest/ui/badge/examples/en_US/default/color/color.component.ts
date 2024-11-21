import { Component } from '@angular/core';
import { XBadgeComponent } from '@ng-nest/ui/badge';
import { XButtonComponent } from '@ng-nest/ui/button';

@Component({
  selector: 'ex-color',
  imports: [XBadgeComponent, XButtonComponent],
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.scss']
})
export class ExColorComponent {}
