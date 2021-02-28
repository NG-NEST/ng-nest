import { XControlValueAccessor, XInputBoolean, XBoolean } from '@ng-nest/ui/core';
import { Input, Output, EventEmitter, Component } from '@angular/core';

/**
 * Upload
 * @selector x-upload
 * @decorator component
 */
export const XUploadPrefix = 'x-upload';

/**
 * Upload Property
 */
@Component({ template: '' })
export class XUploadProperty extends XControlValueAccessor<XUploadNode[]> {
  /**
   * @zh_CN 显示文字
   * @en_US Display text
   */
  @Input() label: string;
  /**
   * @zh_CN 请求地址
   * @en_US Request address
   */
  @Input() action: string;
  /**
   * @zh_CN 上传文件类型，与原生的 input file 组件一致
   * @en_US Upload file type, consistent with native input file component
   */
  @Input() accept: string;
  /**
   * @zh_CN 文件显示类型
   * @en_US File display type
   */
  @Input() type: XUploadType = 'list';
  /**
   * @zh_CN 图片剪裁
   * @en_US Picture cropping
   */
  @Input() @XInputBoolean() imgCut: XBoolean;
  /**
   * @zh_CN 多文件上传
   * @en_US Multiple file upload
   */
  @Input() @XInputBoolean() multiple: XBoolean;
  /**
   * @zh_CN 删除按钮的事件
   * @en_US Delete button event
   */
  @Output() removeClick = new EventEmitter<{ file: XUploadNode; index: number }>();
}

/**
 * @zh_CN Upload 数据对象
 * @en_US Upload data object
 */
export interface XUploadNode extends File {
  /**
   * @zh_CN 地址
   * @en_US address
   */
  url?: string;
  /**
   * @zh_CN 状态
   * @en_US status
   */
  state?: XStateType;
  /**
   * @zh_CN 上传进度
   * @en_US Upload progress
   */
  percent?: number;
}

/**
 * @zh_CN 文件状态
 * @en_US File status
 */
export type XStateType = 'ready' | 'uploading' | 'success' | 'error';

/**
 * @zh_CN 文件显示类型
 * @en_US File display type
 */
export type XUploadType = 'list' | 'img';

/**
 * Upload Portal
 * @selector x-upload-portal
 * @decorator component
 */
export const XUploadPortalPrefix = 'x-upload-portal';
