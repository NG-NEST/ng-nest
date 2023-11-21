import { Component } from '@angular/core';
import { XBadgeComponent } from '@ng-nest/ui/badge';

@Component({
  selector: 'ex-standalone',
  standalone: true,
  imports: [XBadgeComponent],
  templateUrl: './standalone.component.html',
  styleUrls: ['./standalone.component.scss']
})
export class ExStandaloneComponent {}
