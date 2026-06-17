import { Component } from '@angular/core';
import { XWatermarkComponent } from '@ng-nest/ui/watermark';

@Component({
  selector: 'ex-image',
  imports: [XWatermarkComponent],
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ExImageComponent {}
