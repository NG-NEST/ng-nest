import { Component } from '@angular/core';
import { XButtonComponent } from '@ng-nest/ui/button';
import { XTooltipDirective } from '@ng-nest/ui/tooltip';

@Component({
  selector: 'ex-default',
  imports: [XTooltipDirective, XButtonComponent],
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class ExDefaultComponent {}
