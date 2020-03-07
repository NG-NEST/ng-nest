import { AnimationTriggerMetadata, trigger, state, style, animate, transition } from '@angular/animations';
import { XDuration } from './consts';

export const XFadeAnimation: AnimationTriggerMetadata = trigger('XFadeAnimation', [
  state(
    'true',
    style({
      opacity: 0,
      display: 'none'
    })
  ),
  state(
    'false',
    style({
      opacity: 1
    })
  ),
  transition('* => *', animate(`${XDuration.Base} ease-in-out`))
]);
