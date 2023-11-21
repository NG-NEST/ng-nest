import { Component } from '@angular/core';
import { XRowComponent, XColComponent } from '@ng-nest/ui/layout';
import { XLinkComponent } from '@ng-nest/ui/link';

@Component({
  selector: 'ex-icon',
  standalone: true,
  imports: [XLinkComponent, XRowComponent, XColComponent],
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss']
})
export class ExIconComponent {}
