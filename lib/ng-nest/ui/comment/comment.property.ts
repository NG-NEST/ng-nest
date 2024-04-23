import { XPropertyFunction, XToDataNew, XToNumber } from '@ng-nest/ui/core';
import { Component, input, output } from '@angular/core';
import type { XDate, XParentIdentityProperty, XNumber, XDataNew } from '@ng-nest/ui/core';

/**
 * Comment
 * @selector x-comment
 * @decorator component
 */
export const XCommentPrefix = 'x-comment';
const X_COMMENT_CONFIG_NAME = 'comment';

/**
 * Comment Property
 */
@Component({ selector: `${XCommentPrefix}-property`, template: '' })
export class XCommentProperty extends XPropertyFunction(X_COMMENT_CONFIG_NAME) {
  /**
   * @zh_CN 评论数据
   * @en_US Comment data
   */
  readonly data = input<XCommentNode[], XDataNew<XCommentNode>>([], { transform: XToDataNew });
  /**
   * @zh_CN 评论最大字数
   * @en_US Maximum number of comments
   */
  readonly contentMax = input<number, XNumber>(this.config?.contentMax ?? 512, { transform: XToNumber });
  /**
   * @zh_CN 点赞的事件
   * @en_US Like events
   */
  readonly likeClick = output<XCommentNode>();
  /**
   * @zh_CN 评论的事件
   * @en_US Commented event
   */
  readonly commentClick = output<XCommentNode>();
  /**
   * @zh_CN 回复的事件
   * @en_US Reply event
   */
  readonly replyClick = output<XCommentNode>();
  /**
   * @zh_CN 确认提交的事件
   * @en_US Confirm the submitted event
   */
  readonly sureClick = output<XCommentNode>();
  /**
   * @zh_CN 更多的事件
   * @en_US More events
   */
  readonly moreClick = output<XCommentNode>();
}

/**
 * @zh_CN Comment 数据对象
 * @en_US Comment data object
 */
export interface XCommentNode extends XParentIdentityProperty<XCommentNode> {
  /**
   * @zh_CN 作者
   * @en_US Author
   */
  author?: string;
  /**
   * @zh_CN 作者头像地址
   * @en_US Author avatar address
   */
  src?: string;
  /**
   * @zh_CN 发布时间
   * @en_US release time
   */
  datetime?: XDate;
  /**
   * @zh_CN 发布内容
   * @en_US Publish content
   */
  content?: string;
  /**
   * @zh_CN 点赞数量
   * @en_US Like number
   */
  likes?: number;
  /**
   * @zh_CN 评论数量
   * @en_US Number of comments
   */
  count?: number;
  /**
   * @zh_CN 回复作者
   * @en_US Reply to author
   */
  replyAuthor?: string;
  /**
   * @zh_CN 点击评论/回复提交的内容
   * @en_US Click to comment/reply to submitted content
   */
  replyContent?: string;
  /**
   * @zh_CN 显示评论/回复框
   * @en_US Show comment/reply box
   */
  commentShow?: boolean;
}

/**
 * Comment Reply
 * @selector x-comment-reply
 * @decorator component
 */
export const XCommentReplyPrefix = 'x-comment-reply';

/**
 * Comment Reply Property
 */
@Component({ selector: `${XCommentReplyPrefix}-property`, template: '' })
export class XCommentReplyProperty extends XPropertyFunction(X_COMMENT_CONFIG_NAME) {
  /**
   * @zh_CN 回复的最大字数
   * @en_US Maximum number of words to reply
   */
  readonly maxlength = input<number, XNumber>(this.config?.maxlength ?? 512, { transform: XToNumber });
  /**
   * @zh_CN 回复确认的事件
   * @en_US Reply to confirmed event
   */
  readonly sureClick = output<string>();
}
