import {
  TemplateRef,
  ViewContainerRef,
  ComponentFactoryResolver
} from "@angular/core";
import {
  ComponentType,
  TemplatePortal,
  ComponentPortal
} from "@angular/cdk/portal";
import { OverlayRef, OverlayPositionBuilder, OverlayConfig } from "@angular/cdk/overlay";

/**
 * Portal 组件名
 * @selector x-portal
 * @decorator component
 */
export const PortalPrefix = "x-portal";

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
   * 创建的覆盖视图层
   */
  overlayRef?: OverlayRef;
  /**
   * 模板视图
   */
  templatePortal: TemplatePortal<any>;
  /**
   * 组件视图
   */
  componentPortal: ComponentPortal<any>;
}
