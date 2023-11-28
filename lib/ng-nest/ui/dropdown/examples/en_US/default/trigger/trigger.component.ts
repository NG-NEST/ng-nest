import { Component } from '@angular/core';
import { XButtonComponent } from '@ng-nest/ui/button';
import { XDropdownComponent } from '@ng-nest/ui/dropdown';
import { XLinkComponent } from '@ng-nest/ui/link';

@Component({
  selector: 'ex-trigger',
  standalone: true,
  imports: [XDropdownComponent, XButtonComponent, XLinkComponent],
  templateUrl: './trigger.component.html',
  styleUrls: ['./trigger.component.scss']
})
export class ExTriggerComponent {
  data = ['User manage', 'Role manage', 'Organization manage', 'Module manage', 'Log manage'];
}
