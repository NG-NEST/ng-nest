import { XIdentityInput, XFormProperty, XParentIdentityInput } from "@ng-nest/ui/core";

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
