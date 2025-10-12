import { Component, ElementRef, input, output } from '@angular/core';
import { XBoolean, XNumber, XPropertyFunction, XTemplate, XToBoolean, XToNumber } from '@ng-nest/ui/core';
import { XUploadMultipleModel, XUploadNode, XUploadType } from '@ng-nest/ui/upload';
import { XFormControlFunction } from '@ng-nest/ui/base-form';

/**
 * Attachments
 * @selector x-attachments
 * @decorator component
 */
export const XAttachmentsPrefix = 'x-attachments';
const X_ATTACHMENTS_CONFIG_NAME = 'attachments';

/**
 * Attachments Property
 */
@Component({ selector: `${XAttachmentsPrefix}-property`, template: '' })
export class XAttachmentsProperty extends XFormControlFunction(X_ATTACHMENTS_CONFIG_NAME) {
  /**
   * @zh_CN 请求地址
   * @en_US Request address
   */
  readonly action = input<string>();
  /**
   * @zh_CN 可拖拽上传的区域
   * @en_US Drag and drop upload area
   */
  readonly dropContainer = input<ElementRef | HTMLElement>();
  /**
   * @zh_CN 可拖拽上传的区域的图标
   * @en_US Drag and drop upload area icon
   */
  readonly dropIcon = input<XTemplate>();
  /**
   * @zh_CN 可拖拽上传的区域的标题
   * @en_US Drag and drop upload area title
   */
  readonly dropTitle = input<XTemplate>();
  /**
   * @zh_CN 可拖拽上传的区域的描述
   * @en_US Drag and drop upload area description
   */
  readonly dropDescription = input<XTemplate>();
  /**
   * @zh_CN 直接显示可拖拽上传的区域
   * @en_US Show the drag and drop upload area directly
   */
  readonly showDrop = input<boolean, XBoolean>(false, { transform: XToBoolean });
  /**
   * @zh_CN 上传文件类型，与原生的 input file 组件一致
   * @en_US Upload file type, consistent with native input file component
   */
  readonly accept = input<string>();
  /**
   * @zh_CN 文件显示类型
   * @en_US File display type
   */
  readonly type = input<XUploadType>('list');
  /**
   * @zh_CN 图片类型下面加载失败显示
   * @en_US Photo type below loading failed display
   */
  readonly imgFallback = input<string>();
  /**
   * @zh_CN 图片剪裁
   * @en_US Picture cropping
   */
  readonly imgCut = input<boolean, XBoolean>(false, { transform: XToBoolean });
  /**
   * @zh_CN 多文件上传
   * @en_US Multiple file upload
   */
  readonly multiple = input<boolean, XBoolean>(false, { transform: XToBoolean });
  /**
   * @zh_CN 点击下载
   * @en_US click download
   */
  readonly download = input<boolean, XBoolean>(this.config?.download ?? true, { transform: XToBoolean });
  /**
   * @zh_CN 多次上传的模式，cover 覆盖现有, add 继续添加
   * @en_US For many upload mode, 'cover' covers the existing, 'add' continue to add
   */
  readonly multipleModel = input<XUploadMultipleModel>(this.config?.multipleModel ?? 'cover');
  /**
   * @zh_CN 文件列表自定义显示模板
   * @en_US File list custom display template
   */
  readonly filesTpl = input<XTemplate>();
  /**
   * @zh_CN 限制单次上传文件个数，只有开启多文件上传 multiple 时生效，默认不做限制
   * @en_US Limit the number of files uploaded files. Do not restrict the default
   */
  readonly maxLimit = input<number, XNumber>(-1, { transform: XToNumber });
  /**
   * @zh_CN 设置上传的请求头部
   * @en_US Set the upload request header
   */
  readonly headers = input<{ [key: string]: any }>();
  /**
   * @zh_CN 删除按钮的事件
   * @en_US Delete button event
   */
  readonly removeClick = output<{ file: XUploadNode; index: number }>();
  /**
   * @zh_CN 开始上传事件
   * @en_US Start upload event
   */
  readonly uploadReady = output<XUploadNode>();
  /**
   * @zh_CN 正在上传事件
   * @en_US Start upload event
   */
  readonly uploading = output<XUploadNode>();
  /**
   * @zh_CN 上传成功事件
   * @en_US Start upload event
   */
  readonly uploadSuccess = output<XUploadNode>();
  /**
   * @zh_CN 上传失败事件
   * @en_US Start upload event
   */
  readonly uploadError = output<XUploadNode>();
}

/**
 * FileCard
 * @selector x-file-card
 * @decorator component
 */
export const XFileCardPrefix = 'x-file-card';
export const X_FILE_CARD_CONFIG_NAME = 'fileCard';

/**
 * FileCard Property
 */
@Component({ selector: `${XFileCardPrefix}-property`, template: '' })
export class XFileCardProperty extends XPropertyFunction(X_FILE_CARD_CONFIG_NAME) {
  /**
   * @zh_CN 图标
   * @en_US Icon
   */
  readonly icon = input<XTemplate>();
  /**
   * @zh_CN 图标颜色
   * @en_US Icon color
   */
  readonly iconColor = input<string>();
  /**
   * @zh_CN 文件名
   * @en_US File name
   */
  readonly name = input<XTemplate>();
  /**
   * @zh_CN 文件大小
   * @en_US File size
   */
  readonly size = input<number, XNumber>(0, { transform: XToNumber });
  /**
   * @zh_CN 文件描述
   * @en_US File description
   */
  readonly description = input<XTemplate>();
  /**
   * @zh_CN 文件类型
   * @en_US File type
   */
  readonly type = input<XFileCard>('file');
  /**
   * @zh_CN 文件/图片链接地址
   * @en_US File/image url
   */
  readonly url = input<string>();
  /**
   * @zh_CN 形态变体
   * @en_US Bubble variant
   */
  readonly variant = input<XFileCardVariant>(this.config?.variant ?? 'outlined');
}

/**
 * @zh_CN 文件卡片类型
 * @en_US File card type
 */
export type XFileCard = 'file' | 'img';

/**
 * @zh_CN 形态变体
 * @en_US Bubble variant
 */
export type XFileCardVariant = 'outlined' | 'filled' | 'shadow' | 'borderless';
