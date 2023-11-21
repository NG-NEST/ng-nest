import { Component } from '@angular/core';
import { XRowComponent, XColComponent } from '@ng-nest/ui/layout';
import { XLinkComponent } from '@ng-nest/ui/link';

@Component({
  selector: 'ex-default',
  standalone: true,
  imports: [XLinkComponent, XRowComponent, XColComponent],
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class ExDefaultComponent {}
