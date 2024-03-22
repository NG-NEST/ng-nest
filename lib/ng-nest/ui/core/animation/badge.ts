import { AnimationTriggerMetadata, trigger, style, animate, transition } from '@angular/animations';
import { XDuration } from './consts';

/**
 * @zh_CN 进场动画
 * @en_US Enter an animation
 */
const XDURATION_SLOW_EASE_IN = `${XDuration.Slow} ease-in`;

/**
 * @zh_CN 移除动画
 * @en_US Remove animation
 */
const XDURATION_SLOW_EASE_OUT = `${XDuration.Slow} ease-out`;

/**
 * @zh_CN Badge 动画
 * @en_US Badge animation
 */
export const XBadgeAnimation: AnimationTriggerMetadata = trigger('x-badge-animation', [
  transition(':enter', [
    style({ opacity: 0, transform: 'scale(0) translate(50%, -50%)' }),
    animate(
      XDURATION_SLOW_EASE_IN,
      style({
        opacity: 1,
        transform: 'scale(1) translate(50%, -50%)'
      })
    )
  ]),
  transition(':leave', [
    style({ opacity: 1, transform: 'scale(1) translate(50%, -50%)' }),
    animate(
      XDURATION_SLOW_EASE_OUT,
      style({
        opacity: 0,
        transform: 'scale(0) translate(50%, -50%)'
      })
    )
  ])
]);

/**
 * @zh_CN Badge 独立存在时的动画
 * @en_US The animation when Badge exists independently
 */
export const XBadgeStandaloneAnimation: AnimationTriggerMetadata = trigger('x-badge-standalone-animation', [
  transition(':enter', [
    style({ opacity: 0, transform: 'scale(0)' }),
    animate(
      XDURATION_SLOW_EASE_IN,
      style({
        opacity: 1,
        transform: 'scale(1)'
      })
    )
  ]),
  transition(':leave', [
    style({ opacity: 1, transform: 'scale(1)' }),
    animate(
      XDURATION_SLOW_EASE_OUT,
      style({
        opacity: 0,
        transform: 'scale(0)'
      })
    )
  ])
]);
