import { Component, signal } from '@angular/core';
import { XButtonModule } from '@ng-nest/ui/button';
import { XPlace } from '@ng-nest/ui/core';
import { XDialogComponent } from '@ng-nest/ui/dialog';
import { XMessageBoxService, XMessageBoxAction } from '@ng-nest/ui/message-box';

@Component({
  selector: 'ex-default',
  standalone: true,
  imports: [XButtonModule, XDialogComponent],
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class ExDefaultComponent {
  visible = signal(false);
  placement = signal<XPlace>('center');
  constructor(private msgBox: XMessageBoxService) {}

  dialog(place: XPlace) {
    this.placement.set(place);
    this.visible.set(true);
  }

  close() {
    this.visible.set(false);
  }

  beforeClose = () => {
    this.msgBox.confirm({
      title: 'prompt',
      content: 'There is unsaved data. Do you want to close it?',
      type: 'warning',
      callback: (action: XMessageBoxAction) => {
        action === 'confirm' && this.close();
      }
    });
  };
}
