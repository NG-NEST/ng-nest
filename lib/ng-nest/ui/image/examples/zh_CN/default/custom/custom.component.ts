import { Component } from '@angular/core';
import { XButtonComponent } from '@ng-nest/ui/button';
import { XDialogService } from '@ng-nest/ui/dialog';
import { XImagePreviewComponent } from '@ng-nest/ui/image';

@Component({
  selector: 'ex-custom',
  standalone: true,
  imports: [XButtonComponent],
  templateUrl: './custom.component.html'
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
