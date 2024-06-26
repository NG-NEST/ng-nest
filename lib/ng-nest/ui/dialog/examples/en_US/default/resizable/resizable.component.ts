import { Component, signal } from '@angular/core';
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
  visible1 = signal(false);
  visible2 = signal(false);
  constructor(private msgBox: XMessageBoxService) {}

  beforeClose1 = () => {
    this.msgBox.confirm({
      title: 'prompt',
      content: 'There is unsaved data. Do you want to close it?',
      type: 'warning',
      callback: (action: XMessageBoxAction) => {
        if (action === 'confirm') this.visible1.set(false);
      }
    });
  };

  beforeClose2 = () => {
    this.msgBox.confirm({
      title: 'prompt',
      content: 'There is unsaved data. Do you want to close it?',
      type: 'warning',
      callback: (action: XMessageBoxAction) => {
        if (action === 'confirm') this.visible2.set(false);
      }
    });
  };
}
