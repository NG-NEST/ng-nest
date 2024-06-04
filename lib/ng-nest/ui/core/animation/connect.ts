import { AnimationTriggerMetadata, trigger, style, animate, transition } from '@angular/animations';
import { XDuration } from './consts';

/**
 * @zh_CN 进场动画
 * @en_US Enter an animation
 */
const XDURATION_BASE_EASE_IN = `${XDuration.Base} ease-in`;
const XDURATION_FAST_EASE_IN = `${XDuration.Fast} ease-in`;

/**
 * @zh_CN 移除动画
 * @en_US Remove animation
 */
const XDURATION_BASE_EASE_OUT = `${XDuration.Base} ease-out`;
const XDURATION_FAST_EASE_OUT = `${XDuration.Fast} ease-out`;

/**
 * @zh_CN 弹框连接时的动画，只处理 Y 轴
 * @en_US The animation when the bomb frame is connected, only the y-axis
 */
export const XConnectBaseAnimation: AnimationTriggerMetadata = trigger('x-connect-base-animation', [
  transition(':enter', [style({ opacity: 0, transform: 'scaleY(0.8)' }), animate(XDURATION_FAST_EASE_IN)]),
  transition(':leave', [animate(XDURATION_FAST_EASE_OUT, style({ opacity: 0 }))])
]);

/**
 * @zh_CN 弹框连接时的动画，缩放
 * @en_US The animation when the bomb frame is connected, zoomed in
 */
export const XBaseAnimation: AnimationTriggerMetadata = trigger('x-base-animation', [
  transition(':enter', [style({ opacity: 0, transform: 'scale(0.2)' }), animate(XDURATION_BASE_EASE_IN)]),
  transition(':leave', [animate(XDURATION_BASE_EASE_OUT, style({ opacity: 0, transform: 'scale(0.2)' }))])
]);
