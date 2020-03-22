import { TemplateRef } from '@angular/core';
import { XIdentityInput } from '../core';

/**
 * Slide 组件名
 * @selector x-slide
 * @decorator component
 */
export const XSlidePrefix = 'x-slide';

/**
 * Slide @Input
 */
export interface XSlideInput {}

/**
 * Slide 数据对象
 */
export interface XSlideNode extends XIdentityInput {}

/**
 * 布局方式
 * @value "row"
 * @value "column"
 */
export type XSlideLayout = 'row' | 'column';