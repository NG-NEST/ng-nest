import { TemplateRef, ViewContainerRef, ComponentFactoryResolver, ComponentRef, EmbeddedViewRef } from '@angular/core';
import { ComponentType, TemplatePortal, ComponentPortal } from '@angular/cdk/portal';
import { OverlayRef, OverlayConfig, ConnectedPosition } from '@angular/cdk/overlay';

/**
 * Portal 组件名
 * @selector x-portal
 * @decorator component
 */
export const PortalPrefix = 'x-portal';

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

/**
 * Portal @Input
 */
export interface XPortalInput {
  /**
   * 内容，模板/组件
   */
  content?: TemplateRef<any> | ComponentType<any>;
  /**
   * 视图容器
   */
  viewContainerRef?: ViewContainerRef;
  /**
   * 上下文
   */
  context?: any;
  /**
   * 注入器
   */
  injector?: any;
  /**
   * 组件解析器
   */
  componentFactoryResolver?: ComponentFactoryResolver;
  /**
   * 覆盖视图层配置
   */
  overlayConfig?: OverlayConfig;
}

export interface XPortalOverlayRef {
  /**
   * cdk 创建的覆盖视图层
   */
  overlayRef: OverlayRef;
  /**
   * cdk 模板视图
   */
  templatePortal: TemplatePortal<any>;
  /**
   * cdk 组件视图
   */
  componentPortal: ComponentPortal<any>;
  /**
   * 组件视图
   */
  componentRef: ComponentRef<any>;
  /**
   * 模板视图
   */
  embeddedViewRef: EmbeddedViewRef<any>;
}
