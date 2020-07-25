import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XCommentComponent } from './comment.component';
import { XCommentReplyComponent } from './comment-reply.component';
import { FormsModule } from '@angular/forms';
import { XAvatarModule } from '@ng-nest/ui/avatar';
import { XButtonModule } from '@ng-nest/ui/button';
import { XLinkModule } from '@ng-nest/ui/link';
import { XInputModule } from '@ng-nest/ui/input';
import { XTextRetractModule } from '@ng-nest/ui/text-retract';
import { XTimeAgoModule } from '@ng-nest/ui/time-ago';
import { XI18nModule } from '@ng-nest/ui/i18n';
import { XCommentProperty, XCommentReplyProperty } from './comment.property';

@NgModule({
  declarations: [XCommentComponent, XCommentReplyComponent, XCommentProperty, XCommentReplyProperty],
  exports: [XCommentComponent, XCommentReplyComponent],
  imports: [
    CommonModule,
    FormsModule,
    XI18nModule,
    XInputModule,
    XLinkModule,
    XAvatarModule,
    XButtonModule,
    XTextRetractModule,
    XTimeAgoModule
  ]
})
export class XCommentModule {}
