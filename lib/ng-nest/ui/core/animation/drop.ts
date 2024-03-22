import { AnimationTriggerMetadata, trigger, state, style, animate, transition } from '@angular/animations';
import { XDuration } from './consts';

/**
 * @zh_CN 放置动画
 * @en_US Drop animation
 */
export const XDropAnimation: AnimationTriggerMetadata = trigger('x-drop-animation', [
  state('*', style({ opacity: 0, height: 0, border: 0, padding: 0, visibility: 'hidden' })),
  state('false', style({ opacity: 0, height: 0, border: 0, padding: 0, visibility: 'hidden' })),
  state('true', style({ opacity: 1, height: '*', border: '*', padding: '*', visibility: 'inherit' })),
  transition('* => *', animate(`${XDuration.Base} ease-out`))
]);
