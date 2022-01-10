import { Component } from '@angular/core';
import { XDialogService } from '@ng-nest/ui/dialog';
import { ExServiceDialogComponent } from './service-dialog.component';

@Component({
  selector: 'ex-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss']
})
export class ExServiceComponent {
  constructor(private dialogService: XDialogService) {}

  create() {
    this.dialogService.create(ExServiceDialogComponent, {
      placement: 'top', // 默认center
      data: { title: '标题', content: '传递内容信息，传递内容信息，传递内容信息' }
    });
  }
}
