import { Component } from '@angular/core';
import { XLayoutModule } from '@ng-nest/ui/layout';
import { XLinkComponent } from '@ng-nest/ui/link';

@Component({
  selector: 'ex-underline',
  standalone: true,
  imports: [XLinkComponent, XLayoutModule],
  templateUrl: './underline.component.html',
  styleUrls: ['./underline.component.scss']
})
export class ExUnderlineComponent {}
