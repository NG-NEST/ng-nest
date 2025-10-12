import { Component } from '@angular/core';
import { ExDefaultComponent, ExDropComponent, ExFileCardComponent } from '@ng-nest/ui/attachments/examples';

@Component({
  selector: 'te-attachments',
  imports: [ExDefaultComponent, ExDropComponent, ExFileCardComponent],
  templateUrl: './attachments.component.html'
})
export class TeAttachmentsComponent {}
