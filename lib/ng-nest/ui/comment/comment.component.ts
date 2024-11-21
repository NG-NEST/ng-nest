import { Component, ViewEncapsulation, ChangeDetectionStrategy, computed } from '@angular/core';
import { XCommentPrefix, XCommentProperty } from './comment.property';
import { XIsEmpty, XGetChildren } from '@ng-nest/ui/core';
import { XI18nPipe } from '@ng-nest/ui/i18n';
import { XAvatarComponent } from '@ng-nest/ui/avatar';
import { XButtonComponent, XButtonsComponent } from '@ng-nest/ui/button';
import { XLinkComponent } from '@ng-nest/ui/link';
import { XTextRetractComponent } from '@ng-nest/ui/text-retract';
import { XTimeAgoPipe } from '@ng-nest/ui/time-ago';
import { XCommentReplyComponent } from './comment-reply.component';
import type { XCommentNode } from './comment.property';

@Component({
  selector: `${XCommentPrefix}`,
  imports: [
    XI18nPipe,
    XLinkComponent,
    XAvatarComponent,
    XButtonComponent,
    XButtonsComponent,
    XTextRetractComponent,
    XTimeAgoPipe,
    XCommentReplyComponent
  ],
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XCommentComponent extends XCommentProperty {
  nodes = computed(() =>
    this.data()
      .filter((dt) => XIsEmpty(dt.pid))
      .map((dt) => XGetChildren<XCommentNode>(this.data(), dt, 0))
  );

  likeOnClick(node: XCommentNode) {
    this.likeClick.emit(node);
  }

  commentOnClick(node: XCommentNode) {
    node.commentShow = !node.commentShow;
    this.commentClick.emit(node);
  }

  replyOnClick(node: XCommentNode) {
    node.commentShow = !node.commentShow;
    this.replyClick.emit(node);
  }

  sureOnClick(content: string, node: XCommentNode) {
    node.replyContent = content;
  }

  moreOnClick(node: XCommentNode) {
    this.moreClick.emit(node);
  }

  hasMore(node: XCommentNode) {
    return (node.count as number) > (node.children?.length as number);
  }
}
