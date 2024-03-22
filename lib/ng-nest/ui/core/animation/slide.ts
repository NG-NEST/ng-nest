import { AnimationTriggerMetadata, trigger, style, animate, transition } from '@angular/animations';
import { XDuration } from './consts';

/**
 * @zh_CN 抽屉动画
 * @en_US Drawer animation
 */
export const XSlideAnimation: AnimationTriggerMetadata = trigger('x-slide-animation', [
  transition('void => right', [style({ transform: 'translate(100%,0)' }), animate(`${XDuration.Base} ease-in`)]),
  transition('right => void', [animate(`${XDuration.Base} ease-out`, style({ transform: 'translate(100%,0)' }))]),
  transition('void => left', [style({ transform: 'translate(-100%,0)' }), animate(`${XDuration.Base} ease-in`)]),
  transition('left => void', [animate(`${XDuration.Base} ease-out`, style({ transform: 'translate(-100%,0)' }))]),
  transition('void => top', [style({ transform: 'translate(0,-100%)' }), animate(`${XDuration.Base} ease-in`)]),
  transition('top => void', [animate(`${XDuration.Base} ease-out`, style({ transform: 'translate(0,-100%)' }))]),
  transition('void => bottom', [style({ transform: 'translate(0,100%)' }), animate(`${XDuration.Base} ease-in`)]),
  transition('bottom => void', [animate(`${XDuration.Base} ease-out`, style({ transform: 'translate(0,100%)' }))])
]);
