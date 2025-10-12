import { Component, DOCUMENT, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { XAttachmentsComponent } from '@ng-nest/ui/attachments';
import { XButtonComponent } from '@ng-nest/ui/button';
import { XMessageService } from '@ng-nest/ui/message';
import { XSenderComponent } from '@ng-nest/ui/sender';
import { XSwitchComponent } from '@ng-nest/ui/switch';
import { XUploadNode } from '@ng-nest/ui/upload';

@Component({
  selector: 'ex-default',
  imports: [FormsModule, XAttachmentsComponent, XSenderComponent, XButtonComponent, XSwitchComponent],
  templateUrl: './default.component.html',
  styleUrl: './default.component.scss'
})
export class ExDefaultComponent {
  message = inject(XMessageService);
  document = inject(DOCUMENT);
  filesValue = signal<XUploadNode[]>([]);
  fullScreen = signal(false);
  change(value: XUploadNode[]) {
    if (value && value.length > 0) {
      this.message.info(`Upload ${value[0].name}`);
    }
  }
}
