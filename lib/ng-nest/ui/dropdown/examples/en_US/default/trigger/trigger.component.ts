import { Component, signal } from '@angular/core';
import { XButtonComponent } from '@ng-nest/ui/button';
import { XDropdownComponent } from '@ng-nest/ui/dropdown';
import { XLinkComponent } from '@ng-nest/ui/link';

@Component({
  selector: 'ex-trigger',
  imports: [XDropdownComponent, XButtonComponent, XLinkComponent],
  templateUrl: './trigger.component.html',
  styleUrls: ['./trigger.component.scss']
})
export class ExTriggerComponent {
  data = signal(['User manage', 'Role manage', 'Organization manage', 'Module manage', 'Log manage']);
  visible = signal(false);

  onVisible() {
    this.visible.update((x) => !x);
  }
}
