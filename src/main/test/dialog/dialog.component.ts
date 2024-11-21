import { Component } from '@angular/core';
import {
  ExDefaultComponent,
  ExContainerComponent,
  ExCustomComponent,
  ExDraggableComponent,
  ExResizableComponent,
  ExServiceComponent
} from '@ng-nest/ui/dialog/examples';

@Component({
  selector: 'te-dialog',
  imports: [
    ExDefaultComponent,
    ExContainerComponent,
    ExCustomComponent,
    ExDraggableComponent,
    ExResizableComponent,
    ExServiceComponent
  ],
  templateUrl: './dialog.component.html'
})
export class TeDialogComponent {}
