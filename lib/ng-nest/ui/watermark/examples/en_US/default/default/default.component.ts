import { Component } from '@angular/core';
import { XWatermarkComponent } from '@ng-nest/ui/watermark';
import { XButtonComponent } from '@ng-nest/ui/button';

@Component({
  selector: 'ex-default',
  imports: [XWatermarkComponent, XButtonComponent],
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class ExDefaultComponent {}