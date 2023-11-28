import { ChangeDetectionStrategy, Component, HostBinding, ViewEncapsulation } from '@angular/core';
import { XDialogContainerProperty, X_DIALOG_CONTAINER } from './dialog.property';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'x-dialog-container',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dialog-container.component.html',
  styleUrls: ['./dialog-container.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: X_DIALOG_CONTAINER,
      useExisting: XDialogContainerComponent
    }
  ]
})
export class XDialogContainerComponent extends XDialogContainerProperty {
  @HostBinding('class.x-dialog-container') _has = true;
}
