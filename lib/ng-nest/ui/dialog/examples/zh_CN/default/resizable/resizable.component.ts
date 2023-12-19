import { Component } from '@angular/core';
import { XButtonComponent } from '@ng-nest/ui/button';
import { XDialogComponent } from '@ng-nest/ui/dialog';
import { XMessageBoxService, XMessageBoxAction } from '@ng-nest/ui/message-box';

@Component({
  selector: 'ex-resizable',
  standalone: true,
  imports: [XDialogComponent, XButtonComponent],
  templateUrl: './resizable.component.html',
  styleUrls: ['./resizable.component.scss']
})
export class ExResizableComponent {
  visible1!: boolean;
  visible2!: boolean;
  constructor(private msgBox: XMessageBoxService) {}

  beforeClose1 = () => {
    this.msgBox.confirm({
      title: '提示',
      content: '有未保存的数据，确认关闭吗？',
      type: 'warning',
      callback: (action: XMessageBoxAction) => {
        if (action === 'confirm') this.visible1 = false;
      }
    });
  };

  beforeClose2 = () => {
    this.msgBox.confirm({
      title: '提示',
      content: '有未保存的数据，确认关闭吗？',
      type: 'warning',
      callback: (action: XMessageBoxAction) => {
        if (action === 'confirm') this.visible2 = false;
      }
    });
  };
}
