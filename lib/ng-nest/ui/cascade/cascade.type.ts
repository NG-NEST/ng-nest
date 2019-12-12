import { XIdentityInput, XFormProperty, XParentIdentityInput } from "@ng-nest/ui/core";
import { InjectionToken } from "@angular/core";

/**
 * Cascade 组件名
 * @selector x-cascade
 * @decorator component
 */
export const XCascadePrefix = "x-cascade";

/**
 * Cascade @Cascade
 */
export interface XCascadeInput extends XIdentityInput, XFormProperty {}

/**
 * Cascade 数据对象
 */
export interface XCascadeNode extends XParentIdentityInput {}

/**
 * Cascade-Portal 组件名
 * @selector x-cascade-portal
 * @decorator component
 */
export const XCascadePortalPrefix = "x-cascade-portal";

export const XCascadePortal = new InjectionToken<{}>("x-cascade-portal");
