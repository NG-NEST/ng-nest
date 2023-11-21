import { Component } from '@angular/core';
import { XLayoutModule } from '@ng-nest/ui/layout';
import { XLinkComponent } from '@ng-nest/ui/link';

@Component({
  selector: 'ex-disabled',
  standalone: true,
  imports: [XLinkComponent, XLayoutModule],
  templateUrl: './disabled.component.html',
  styleUrls: ['./disabled.component.scss']
})
export class ExDisabledComponent {}
