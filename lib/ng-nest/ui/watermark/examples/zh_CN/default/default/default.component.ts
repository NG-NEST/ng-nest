import { Component } from '@angular/core';
import { XButtonComponent } from '@ng-nest/ui/button';
import { XWatermarkComponent } from '@ng-nest/ui/watermark';

@Component({
  selector: 'ex-default',
  imports: [XWatermarkComponent, XButtonComponent],
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class ExDefaultComponent {}
