import { AnimationTriggerMetadata, trigger, style, animate, transition } from '@angular/animations';
import { XDuration } from './consts';

// 进场动画
const XDURATION_SLOW_EASE_IN = `${XDuration.Slow} ease-in`;
// 移除动画
const XDURATION_SLOW_EASE_OUT = `${XDuration.Slow} ease-out`;

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
