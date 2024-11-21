import { Component } from '@angular/core';
import { XIconComponent } from '@ng-nest/ui/icon';
import { XTabComponent, XTabsComponent } from '@ng-nest/ui/tabs';

@Component({
  selector: 'ex-custom',
  imports: [XTabsComponent, XTabComponent, XIconComponent],
  templateUrl: './custom.component.html',
  styleUrls: ['./custom.component.scss']
})
export class ExCustomComponent {}
