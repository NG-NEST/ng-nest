import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XCommentComponent } from './comment.component';
import { XCommentReplyComponent } from './comment-reply.component';
import { FormsModule } from '@angular/forms';
import { XAvatarComponent } from '@ng-nest/ui/avatar';
import { XButtonComponent, XButtonsComponent } from '@ng-nest/ui/button';
import { XLinkComponent } from '@ng-nest/ui/link';
import { XInputModule } from '@ng-nest/ui/input';
import { XTextRetractModule } from '@ng-nest/ui/text-retract';
import { XTimeAgoModule } from '@ng-nest/ui/time-ago';
import { XI18nPipe } from '@ng-nest/ui/i18n';
import { XCommentProperty, XCommentReplyProperty } from './comment.property';

@NgModule({
  declarations: [
    XCommentComponent,
    XCommentReplyComponent,
    XCommentProperty,
    XCommentReplyProperty
  ],
  exports: [XCommentComponent, XCommentReplyComponent],
  imports: [
    CommonModule,
    FormsModule,
    XI18nPipe,
    XInputModule,
    XLinkComponent,
    XAvatarComponent,
    XButtonComponent,
    XButtonsComponent,
    XTextRetractModule,
    XTimeAgoModule
  ]
})
export class XCommentModule {}
