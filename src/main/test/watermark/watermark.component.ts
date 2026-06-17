import { Component } from '@angular/core';
import { ExDefaultComponent } from '@ng-nest/ui/watermark/examples';
import { ExImageComponent } from '@ng-nest/ui/watermark/examples';
import { ExImageTextComponent } from '@ng-nest/ui/watermark/examples';
import { ExCustomComponent } from '@ng-nest/ui/watermark/examples';

@Component({
  selector: 'te-watermark',
  imports: [ExDefaultComponent, ExImageComponent, ExImageTextComponent, ExCustomComponent],
  templateUrl: './watermark.component.html'
})
export class TeWatermarkComponent {}
