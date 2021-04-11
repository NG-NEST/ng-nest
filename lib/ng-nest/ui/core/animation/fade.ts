import { AnimationTriggerMetadata, trigger, state, style, animate, transition } from '@angular/animations';
import { XDuration } from './consts';

// 进场动画
const XDURATION_BASE_EASE_IN = `${XDuration.Fast} ease-in`;
// 移除动画
const XDURATION_BASE_EASE_OUT = `${XDuration.Fast} ease-out`;

export const XFadeAnimation: AnimationTriggerMetadata = trigger('x-fade-animation', [
  transition(':enter', [
    style({ opacity: 0, transform: 'scale(0.8)' }),
    animate(`${XDURATION_BASE_EASE_IN}`, style({ opacity: 1, transform: 'scale(1)' }))
  ]),
  transition(':leave', [animate(`${XDURATION_BASE_EASE_OUT}`, style({ opacity: 0 }))])
]);
