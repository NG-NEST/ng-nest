import { Component } from '@angular/core';
import { XLayoutModule } from '@ng-nest/ui/layout';
import { XLinkComponent } from '@ng-nest/ui/link';

@Component({
  selector: 'ex-default',
  standalone: true,
  imports: [XLinkComponent, XLayoutModule],
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class ExDefaultComponent {}
