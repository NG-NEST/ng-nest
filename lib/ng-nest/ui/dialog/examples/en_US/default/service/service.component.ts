import { Component } from '@angular/core';
import { XPlace } from '@ng-nest/ui/core';
import { XDialogService } from '@ng-nest/ui/dialog';
import { ExServiceDialogComponent } from './service-dialog.component';
import { XButtonComponent } from '@ng-nest/ui/button';

@Component({
  selector: 'ex-service',
  standalone: true,
  imports: [XButtonComponent],
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss']
})
export class ExServiceComponent {
  constructor(private dialogService: XDialogService) {}

  dialog(placement: XPlace) {
    this.dialogService.create(ExServiceDialogComponent, {
      placement: placement, // 默认center
      draggable: true,
      resizable: true,
      data: { title: '标题', content: '传递内容信息，传递内容信息，传递内容信息' }
    });
  }

  createFullScreen(placement: XPlace) {
    this.dialogService.create(ExServiceDialogComponent, {
      placement: placement, // 默认center
      width: '100%',
      height: '100%',
      draggable: true,
      resizable: true,
      data: { title: '标题', content: '传递内容信息，传递内容信息，传递内容信息' }
    });
  }
}
