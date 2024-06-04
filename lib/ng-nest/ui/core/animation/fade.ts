import { AnimationTriggerMetadata, trigger, style, animate, transition } from '@angular/animations';
import { XDuration } from './consts';

/**
 * @zh_CN 进场动画
 * @en_US Enter an animation
 */
const XDURATION_BASE_EASE_IN = `${XDuration.Fast} ease-in`;

/**
 * @zh_CN 移除动画
 * @en_US Remove animation
 */
const XDURATION_BASE_EASE_OUT = `${XDuration.Fast} ease-out`;

/**
 * @zh_CN 淡入淡出动画
 * @en_US Fade into the animation
 */
export const XFadeAnimation: AnimationTriggerMetadata = trigger('x-fade-animation', [
  transition(':enter', [
    style({ opacity: 0, transform: 'scale(0.8)' }),
    animate(`${XDURATION_BASE_EASE_IN}`, style({ opacity: 1, transform: 'scale(1)' }))
  ]),
  transition(':leave', [animate(`${XDURATION_BASE_EASE_OUT}`, style({ opacity: 0 }))])
]);
