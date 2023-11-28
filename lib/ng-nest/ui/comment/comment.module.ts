import { NgModule } from '@angular/core';
import { XCommentComponent } from './comment.component';
import { XCommentReplyComponent } from './comment-reply.component';

@NgModule({
  exports: [XCommentComponent, XCommentReplyComponent],
  imports: [XCommentComponent, XCommentReplyComponent]
})
export class XCommentModule {}
