import { Component } from '@angular/core';
import { XButtonComponent } from '@ng-nest/ui/button';
import { XPlace } from '@ng-nest/ui/core';
import { XDialogAction, XDialogComponent, XDialogContainerComponent } from '@ng-nest/ui/dialog';
import { XMessageBoxAction, XMessageBoxService } from '@ng-nest/ui/message-box';

@Component({
  selector: 'ex-container',
  standalone: true,
  imports: [XDialogContainerComponent, XDialogComponent, XButtonComponent],
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ExContainerComponent {
  visible: boolean = false;
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
