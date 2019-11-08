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
 * @selector nu-portal
 * @decorator component
 */
export const PortalPrefix = "nu-portal";

/**
 * Portal 参数对象
 */
export interface NuPortalOption {
  /**
   * 内容，模板/组件
   */
  nuContent?: TemplateRef<any> | ComponentType<any>;
  /**
   * 视图容器
   */
  nuViewContainerRef?: ViewContainerRef;
  /**
   * 上下文
   */
  nuContext?: any;
  /**
   * 注入器
   */
  nuInjector?: any;
  /**
   * 组件解析器
   */
  nuComponentFactoryResolver?: ComponentFactoryResolver;
  /**
   * 覆盖视图层配置
   */
  nuOverlayConfig?: OverlayConfig;
}

export interface NuPortalOverlayRef {
  /**
   * 创建的覆盖视图层
   */
  nuOverlayRef?: OverlayRef;
  /**
   * 模板视图
   */
  nuTemplatePortal: TemplatePortal<any>;
  /**
   * 组件视图
   */
  nuComponentPortal: ComponentPortal<any>;
}
