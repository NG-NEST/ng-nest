import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { XAttachmentsProperty } from './attachments.property';
import { XUploadComponent } from '@ng-nest/ui/upload';
import { FormsModule } from '@angular/forms';
import { XValueAccessor } from '@ng-nest/ui/base-form';

@Component({
  selector: 'x-attachments',
  templateUrl: './attachments.component.html',
  styleUrls: ['./attachments.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, XUploadComponent],
  providers: [XValueAccessor(XAttachmentsComponent)]
})
export class XAttachmentsComponent extends XAttachmentsProperty {
  valueChange(value: any) {
    this.onChange && this.onChange(value);
  }
}
