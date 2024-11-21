import { Component } from '@angular/core';
import { XButtonComponent } from '@ng-nest/ui/button';
import { XEmptyComponent } from '@ng-nest/ui/empty';
import { XIconComponent } from '@ng-nest/ui/icon';

@Component({
  selector: 'ex-custom',
  imports: [XEmptyComponent, XIconComponent, XButtonComponent],
  templateUrl: './custom.component.html',
  styleUrls: ['./custom.component.scss']
})
export class ExCustomComponent {}
