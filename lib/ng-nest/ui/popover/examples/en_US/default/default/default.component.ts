import { Component } from '@angular/core';
import { XButtonComponent } from '@ng-nest/ui/button';
import { XPopoverDirective } from '@ng-nest/ui/popover';

@Component({
  selector: 'ex-default',
  imports: [XPopoverDirective, XButtonComponent],
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class ExDefaultComponent {}
