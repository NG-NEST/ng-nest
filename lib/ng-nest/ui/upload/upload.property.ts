import { XControlValueAccessor, XInputBoolean } from '@ng-nest/ui/core';
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
export class XUploadProperty extends XControlValueAccessor<any> {
  /**
   * 请求地址
   */
  @Input() action: string;
  /**
   * 上传文件类型，与原生的 input file 组件一致
   */
  @Input() accept: string;
  /**
   * 多文件上传
   */
  @Input() @XInputBoolean() multiple: boolean;
  /**
   * 删除按钮的事件
   */
  @Output() removeClick = new EventEmitter<{ file: XUploadNode; index: number }>();
}

/**
 * Upload 数据对象
 */
export interface XUploadNode extends File {
  /**
   * 地址
   */
  url?: string;
  /**
   * 状态
   */
  state?: XStateType;
  /**
   * 上传进度
   */
  percent?: number;
}

/**
 * 文件状态
 */
export type XStateType = 'ready' | 'uploading' | 'success' | 'error';
