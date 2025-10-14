import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { XAttachmentsComponent } from '@ng-nest/ui/attachments';
import { XButtonComponent } from '@ng-nest/ui/button';
import { XMessageService } from '@ng-nest/ui/message';
import { XSenderComponent } from '@ng-nest/ui/sender';
import { XUploadNode } from '@ng-nest/ui/upload';

@Component({
  selector: 'ex-drop',
  imports: [FormsModule, XAttachmentsComponent, XSenderComponent, XButtonComponent],
  templateUrl: './drop.component.html',
  styleUrl: './drop.component.scss'
})
export class ExDropComponent {
  message = inject(XMessageService);
  model = signal('Click to show header template');
  filesValue = signal<XUploadNode[]>([]);
  showHeader = signal(true);
  change(value: XUploadNode[]) {
    if (value && value.length > 0) {
      this.message.info(`Upload ${value[0].name}`);
    }
  }

  onShowHeader() {
    this.showHeader.update((x) => !x);
  }
}
