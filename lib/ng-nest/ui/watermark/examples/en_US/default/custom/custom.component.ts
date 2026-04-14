import { Component } from '@angular/core';
import { XWatermarkComponent } from '@ng-nest/ui/watermark';

@Component({
  selector: 'ex-custom',
  imports: [XWatermarkComponent],
  templateUrl: './custom.component.html',
  styleUrls: ['./custom.component.scss']
})
export class ExCustomComponent {}
