import { XInputBoolean, XBoolean, XTemplate, XPosition, XCorner, XWithConfig, XNumber, XInputNumber } from '@ng-nest/ui/core';
import { Input, Output, EventEmitter, Component } from '@angular/core';
import { XControlValueAccessor } from '@ng-nest/ui/base-form';

/**
 * Upload
 * @selector x-upload
 * @decorator component
 */
export const XUploadPrefix = 'x-upload';
const X_CONFIG_NAME = 'upload';

/**
 * Upload Property
 */
@Component({ template: '' })
export class XUploadProperty extends XControlValueAccessor<XUploadNode[]> {
  /**
   * @zh_CN 显示文字
   * @en_US Display text
   */
  @Input() text?: XTemplate;
  /**
   * @zh_CN 请求地址
   * @en_US Request address
   */
  @Input() action?: string;
  /**
   * @zh_CN 上传文件类型，与原生的 input file 组件一致
   * @en_US Upload file type, consistent with native input file component
   */
  @Input() accept?: string;
  /**
   * @zh_CN 文件显示类型
   * @en_US File display type
   */
  @Input() type: XUploadType = 'list';
  /**
   * @zh_CN 图片类型下面加载失败显示
   * @en_US Photo type below loading failed display
   */
  @Input() imgFallback?: string;
  /**
   * @zh_CN 图片剪裁
   * @en_US Picture cropping
   */
  @Input() @XInputBoolean() imgCut?: XBoolean;
  /**
   * @zh_CN 多文件上传
   * @en_US Multiple file upload
   */
  @Input() @XInputBoolean() multiple?: XBoolean;
  /**
   * @zh_CN 点击下载
   * @en_US click download
   */
  @Input() @XWithConfig<XBoolean>(X_CONFIG_NAME, true) @XInputBoolean() download!: XBoolean;
  /**
   * @zh_CN 多次上传的模式，cover 覆盖现有 add 继续添加
   * @en_US For many upload mode, 'cover' covers the existing, 'add' continue to add
   */
  @Input() @XWithConfig<XUploadMultipleModel>(X_CONFIG_NAME, 'cover') multipleModel!: XUploadMultipleModel;
  /**
   * @zh_CN 文件列表自定义显示模板
   * @en_US File list custom display template
   */
  @Input() filesTpl?: XTemplate;
  /**
   * @zh_CN 限制单次上传文件个数，只有开启多文件上传 multiple 时生效，默认不做限制
   * @en_US Limit the number of files uploaded files. Do not restrict the default
   */
  @Input() @XInputNumber() maxLimit?: XNumber;
  /**
   * @zh_CN 设置上传的请求头部
   * @en_US Set the upload request header
   */
  @Input() headers?: { [key: string]: any };
  /**
   * @zh_CN 删除按钮的事件
   * @en_US Delete button event
   */
  @Output() removeClick = new EventEmitter<{ file: XUploadNode; index: number }>();
  /**
   * @zh_CN 开始上传事件
   * @en_US Start upload event
   */
  @Output() uploadReady = new EventEmitter<XUploadNode>();
  /**
   * @zh_CN 正在上传事件
   * @en_US Start upload event
   */
  @Output() uploading = new EventEmitter<XUploadNode>();
  /**
   * @zh_CN 上传成功事件
   * @en_US Start upload event
   */
  @Output() uploadSuccess = new EventEmitter<XUploadNode>();
  /**
   * @zh_CN 上传失败事件
   * @en_US Start upload event
   */
  @Output() uploadError = new EventEmitter<XUploadNode>();
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
  percent?: XNumber;
  /**
   * @zh_CN 上传返回数据
   * @en_US Upload body
   */
  body?: any;
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
 * @zh_CN 多次上传的模式，cover 覆盖现有 add 继续添加
 * @en_US For many upload mode, 'cover' covers the existing, 'add' continue to add
 */
export type XUploadMultipleModel = 'cover' | 'add';

/**
 * @zh_CN 剪裁的方位
 * @en_US Tailored orientation
 */
export type XUploadCutType = XPosition | XCorner | '';

/**
 * Upload Portal
 * @selector x-upload-portal
 * @decorator component
 */
export const XUploadPortalPrefix = 'x-upload-portal';
