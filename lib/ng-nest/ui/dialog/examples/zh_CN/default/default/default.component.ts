import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { XButtonModule } from '@ng-nest/ui/button';
import { XPlace } from '@ng-nest/ui/core';
import { XDialogAction, XDialogComponent } from '@ng-nest/ui/dialog';
import { XMessageBoxService, XMessageBoxAction } from '@ng-nest/ui/message-box';

@Component({
  selector: 'ex-default',
  standalone: true,
  imports: [CommonModule, XButtonModule, XDialogComponent],
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class ExDefaultComponent {
  visible!: boolean;
  placement!: XPlace;
  constructor(private msgBox: XMessageBoxService) {}

  dialog(place: XPlace) {
    this.placement = place;
    this.visible = true;
  }

  close() {
    this.visible = false;
  }

  evt(type: string) {
    console.log('output', type);
  }

  beforeClose = (action: XDialogAction) => {
    console.log('beforeClose', action);
    this.msgBox.confirm({
      title: '提示',
      content: '有未保存的数据，确认关闭吗？',
      type: 'warning',
      callback: (action: XMessageBoxAction) => {
        action === 'confirm' && this.close();
      }
    });
  };
}
