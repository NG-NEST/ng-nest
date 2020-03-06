import { XParentIdentityInput, XDate, XData } from '@ng-nest/ui/core';

/**
 * Comment 组件名
 * @selector x-comment
 * @decorator component
 */
export const XCommentPrefix = 'x-comment';

/**
 * Comment @Input
 */
export interface XCommentInput {
  /**
   * 评论数据
   */
  data?: XData<XCommentNode[]>;
  /**
   * 评论最大字数
   * @default 512
   */
  contentMax;
}

/**
 * Comment 数据对象
 */
export interface XCommentNode extends XParentIdentityInput {
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
  /**
   * 子节点
   */
  children?: XCommentNode[];
}

/**
 * Comment Reply 组件名
 * @selector x-comment-reply
 * @decorator component
 */
export const XCommentReplyPrefix = 'x-comment-reply';

/**
 * Comment Reply @Input
 */
export interface XCommentReplyInput {}
