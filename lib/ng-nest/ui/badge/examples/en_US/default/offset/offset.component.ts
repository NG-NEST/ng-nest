import { Component } from '@angular/core';
import { XBadgeComponent } from '@ng-nest/ui/badge';
import { XButtonComponent } from '@ng-nest/ui/button';

@Component({
  selector: 'ex-offset',
  imports: [XBadgeComponent, XButtonComponent],
  templateUrl: './offset.component.html',
  styleUrls: ['./offset.component.scss']
})
export class ExOffsetComponent {}