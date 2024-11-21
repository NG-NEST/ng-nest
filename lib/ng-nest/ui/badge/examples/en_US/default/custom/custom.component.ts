import { Component } from '@angular/core';
import { XBadgeComponent } from '@ng-nest/ui/badge';
import { XButtonComponent } from '@ng-nest/ui/button';

@Component({
  selector: 'ex-custom',
  imports: [XBadgeComponent, XButtonComponent],
  templateUrl: './custom.component.html',
  styleUrls: ['./custom.component.scss']
})
export class ExCustomComponent {}
