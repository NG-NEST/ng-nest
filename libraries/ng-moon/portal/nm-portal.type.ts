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
 * @selector nm-portal
 * @decorator component
 */
export const PortalPrefix = "nm-portal";

/**
 * Portal 参数对象
 */
export interface NmPortalOption {
  /**
   * 内容，模板/组件
   */
  nmContent?: TemplateRef<any> | ComponentType<any>;
  /**
   * 视图容器
   */
  nmViewContainerRef?: ViewContainerRef;
  /**
   * 上下文
   */
  nmContext?: any;
  /**
   * 注入器
   */
  nmInjector?: any;
  /**
   * 组件解析器
   */
  nmComponentFactoryResolver?: ComponentFactoryResolver;
  /**
   * 覆盖视图层配置
   */
  nmOverlayConfig?: OverlayConfig;
}

export interface NmPortalOverlayRef {
  /**
   * 创建的覆盖视图层
   */
  nmOverlayRef?: OverlayRef;
  /**
   * 模板视图
   */
  nmTemplatePortal: TemplatePortal<any>;
  /**
   * 组件视图
   */
  nmComponentPortal: ComponentPortal<any>;
}
