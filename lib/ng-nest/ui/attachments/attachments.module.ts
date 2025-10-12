import { NgModule } from '@angular/core';
import { XAttachmentsComponent } from './attachments.component';
import { XFileCardComponent } from './file-card.component';

@NgModule({
  exports: [XAttachmentsComponent, XFileCardComponent],
  imports: [XAttachmentsComponent, XFileCardComponent]
})
export class XAttachmentsModule {}
