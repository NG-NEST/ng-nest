import { Component } from '@angular/core';
import { XBadgeComponent } from '@ng-nest/ui/badge';
import { XButtonComponent } from '@ng-nest/ui/button';

@Component({
  selector: 'ex-default',
  imports: [XBadgeComponent, XButtonComponent],
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class ExDefaultComponent {}
