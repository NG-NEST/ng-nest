import { Component } from '@angular/core';
import { XButtonComponent } from '@ng-nest/ui/button';
import { XDialogService } from '@ng-nest/ui/dialog';
import { XImageComponent, XImagePreviewComponent } from '@ng-nest/ui/image';
import { XIconComponent } from '@ng-nest/ui/icon';

@Component({
  selector: 'ex-custom',
  imports: [XButtonComponent, XImageComponent, XIconComponent],
  templateUrl: './custom.component.html',
  styleUrl: './custom.component.scss'
})
export class ExCustomComponent {
  constructor(private dialogSewrvice: XDialogService) {}
  preview() {
    this.dialogSewrvice.create(XImagePreviewComponent, {
      width: '100%',
      height: '100%',
      className: 'x-image-preview-portal',
      data: [
        {
          src: 'https://ngnest.com/static/docs/course/rbac/1-introduction/demo/1__ng-nest-admin/light.png'
        }
      ]
    });
  }
}
