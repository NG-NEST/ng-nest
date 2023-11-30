import { Component } from '@angular/core';
import { XLinkComponent } from '@ng-nest/ui/link';

@Component({
  selector: 'ex-icon',
  standalone: true,
  imports: [XLinkComponent],
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss']
})
export class ExIconComponent {}
