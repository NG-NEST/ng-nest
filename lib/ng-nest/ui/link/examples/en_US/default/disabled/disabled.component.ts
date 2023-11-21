import { Component } from '@angular/core';
import { XRowComponent, XColComponent } from '@ng-nest/ui/layout';
import { XLinkComponent } from '@ng-nest/ui/link';

@Component({
  selector: 'ex-disabled',
  standalone: true,
  imports: [XLinkComponent, XRowComponent, XColComponent],
  templateUrl: './disabled.component.html',
  styleUrls: ['./disabled.component.scss']
})
export class ExDisabledComponent {}
