import { Component } from '@angular/core';
import { XBadgeComponent } from '@ng-nest/ui/badge';
import { XButtonComponent } from '@ng-nest/ui/button';

@Component({
  selector: 'ex-max',
  standalone: true,
  imports: [XBadgeComponent, XButtonComponent],
  templateUrl: './max.component.html',
  styleUrls: ['./max.component.scss']
})
export class ExMaxComponent {}
