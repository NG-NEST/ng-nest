import { Component } from '@angular/core';
import { XBadgeComponent } from '@ng-nest/ui/badge';
import { XButtonComponent } from '@ng-nest/ui/button';
import { XIconComponent } from '@ng-nest/ui/icon';

@Component({
  selector: 'ex-dot',
  imports: [XBadgeComponent, XButtonComponent, XIconComponent],
  templateUrl: './dot.component.html',
  styleUrls: ['./dot.component.scss']
})
export class ExDotComponent {}
