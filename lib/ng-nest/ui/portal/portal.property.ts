import { TemplateRef, ViewContainerRef, ComponentFactoryResolver, ComponentRef, EmbeddedViewRef } from '@angular/core';
import { ComponentType, TemplatePortal, ComponentPortal } from '@angular/cdk/portal';
import { OverlayRef, OverlayConfig, ConnectedPosition } from '@angular/cdk/overlay';
import { XInvertKeyValues } from '@ng-nest/ui/core';

/**
 * Portal
 * @selector x-portal
 * @decorator component
 */
export const XPortalPrefix = 'x-portal';
export const XPortalResizablePrefix = 'x-portal-resizable';

export const XPortalPlacement: { [proptery: string]: ConnectedPosition } = {
  bottom: { originX: 'center', originY: 'bottom', overlayX: 'center', overlayY: 'top' },
  left: { originX: 'start', originY: 'center', overlayX: 'end', overlayY: 'center' },
  right: { originX: 'end', originY: 'center', overlayX: 'start', overlayY: 'center' },
  top: { originX: 'center', originY: 'top', overlayX: 'center', overlayY: 'bottom' },
  'bottom-end': { originX: 'end', originY: 'bottom', overlayX: 'end', overlayY: 'top' },
  'bottom-start': { originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top' },
  'left-end': { originX: 'start', originY: 'bottom', overlayX: 'end', overlayY: 'bottom' },
  'left-start': { originX: 'start', originY: 'top', overlayX: 'end', overlayY: 'top' },
  'right-end': { originX: 'end', originY: 'bottom', overlayX: 'start', overlayY: 'bottom' },
  'right-start': { originX: 'end', originY: 'top', overlayX: 'start', overlayY: 'top' },
  'top-end': { originX: 'end', originY: 'top', overlayX: 'end', overlayY: 'bottom' },
  'top-start': { originX: 'start', originY: 'top', overlayX: 'start', overlayY: 'bottom' }
};

export const XPortalConnectedPosition: Map<ConnectedPosition, string> = XInvertKeyValues(XPortalPlacement);

/**
 * Portal Property
 */
export interface XPortalProperty<T> {
  /**
   * @zh_CN 内容，模板/组件
   * @en_US Content, template/component
   */
  content?: TemplateRef<any> | ComponentType<T>;
  /**
   * @zh_CN 视图容器
   * @en_US View container
   */
  viewContainerRef?: ViewContainerRef;
  /**
   * @zh_CN 上下文
   * @en_US Context
   */
  context?: any;
  /**
   * @zh_CN 注入器
   * @en_US Injector
   */
  injector?: any;
  /**
   * @zh_CN 组件解析器
   * @en_US Component parser
   */
  componentFactoryResolver?: ComponentFactoryResolver;
  /**
   * @zh_CN 覆盖视图层配置
   * @en_US Overlay view layer configuration
   */
  overlayConfig?: OverlayConfig;
}

export interface XPortalOverlayRef<T> {
  /**
   * @zh_CN cdk 创建的覆盖视图层
   * @en_US Overlay view layer created by cdk
   */
  overlayRef?: OverlayRef;
  /**
   * @zh_CN cdk 模板视图
   * @en_US Cdk template view
   */
  templatePortal?: TemplatePortal<any>;
  /**
   * @zh_CN cdk 组件视图
   * @en_US Cdk component view
   */
  componentPortal?: ComponentPortal<T>;
  /**
   * @zh_CN 组件视图
   * @en_US Component view
   */
  componentRef?: ComponentRef<T>;
  /**
   * @zh_CN 模板视图
   * @en_US Template view
   */
  embeddedViewRef?: EmbeddedViewRef<any>;
}
