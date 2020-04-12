import { XDate, XData, XProperty, XParentIdentityProperty, XDataConvert, XInputNumber } from '@ng-nest/ui/core';
import { Input, EventEmitter, Output } from '@angular/core';

/**
 * Comment
 * @selector x-comment
 * @decorator component
 */
export const XCommentPrefix = 'x-comment';

/**
 * Comment Property
 */
export class XCommentProperty extends XProperty {
  /**
   * 评论数据
   */
  @Input() @XDataConvert() data: XData<XCommentNode> = [];
  /**
   * 评论最大字数
   */
  @Input() @XInputNumber() contentMax = 512;
  /**
   * 点赞的事件
   */
  @Output() likeClick = new EventEmitter<XCommentNode>();
  /**
   * 评论的事件
   */
  @Output() commentClick = new EventEmitter<XCommentNode>();
  /**
   * 回复的事件
   */
  @Output() replyClick = new EventEmitter<XCommentNode>();
  /**
   * 确认提交的事件
   */
  @Output() sureClick = new EventEmitter<XCommentNode>();
  /**
   * 更多的事件
   */
  @Output() moreClick = new EventEmitter<XCommentNode>();
}

/**
 * Comment 数据对象
 */
export interface XCommentNode extends XParentIdentityProperty<XCommentNode> {
  /**
   * 作者
   */
  author?: string;
  /**
   * 作者头像地址
   */
  src?: string;
  /**
   * 发布时间
   */
  datetime?: XDate;
  /**
   * 发布内容
   */
  content?: string;
  /**
   * 点赞数量
   */
  likes?: number;
  /**
   * 评论数量
   */
  count?: number;
  /**
   * 回复作者
   */
  replyAuthor?: string;
  /**
   * 点击评论/回复提交的内容
   */
  replyContent?: string;
  /**
   * 显示评论/回复框
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
export class XCommentReplyProperty extends XProperty {
  /**
   * 回复的最大字数
   */
  @Input() @XInputNumber() maxlength: number = 512;
  /**
   * 回复确认的事件
   */
  @Output() sureClick = new EventEmitter<string>();
}
