import { Component } from '@angular/core';
import { XDropdownComponent } from '@ng-nest/ui/dropdown';
import { XLinkComponent } from '@ng-nest/ui/link';

@Component({
  selector: 'ex-default',
  standalone: true,
  imports: [XDropdownComponent, XLinkComponent],
  templateUrl: './default.component.html'
})
export class ExDefaultComponent {
  data = ['User manage', 'Role manage', 'Organization manage', 'Module manage', 'Log manage'];
}
