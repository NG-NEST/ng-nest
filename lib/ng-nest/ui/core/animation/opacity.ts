import { AnimationTriggerMetadata, trigger, state, style, animate, transition } from '@angular/animations';
import { XDuration } from './consts';

/**
 * @zh_CN 透明度淡入淡出动画
 * @en_US The transparency fades into the animation
 */
export const XOpacityAnimation: AnimationTriggerMetadata = trigger('x-opacity-animation', [
  state('*', style({ opacity: 0 })),
  state('false', style({ opacity: 0 })),
  state('true', style({ opacity: 1 })),
  transition('* => *', animate(`${XDuration.Slow} cubic-bezier(0.25, 0.8, 0.25, 1)`))
]);
