import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { XButtonComponent } from '@ng-nest/ui/button';
import { XMessageService } from '@ng-nest/ui/message';
import { XUploadComponent, XUploadNode } from '@ng-nest/ui/upload';

@Component({
  selector: 'ex-drop',
  imports: [FormsModule, XUploadComponent, XButtonComponent],
  templateUrl: './drop.component.html',
  styleUrl: './drop.component.scss'
})
export class ExDropComponent {
  filesValue1 = signal<XUploadNode[]>([]);
  filesValue2 = signal<XUploadNode[]>([]);

  message = inject(XMessageService);

  change(value: XUploadNode[]) {
    if (value && value.length > 0) {
      this.message.info(`upload ${value[0].name}`);
    }
  }
}
