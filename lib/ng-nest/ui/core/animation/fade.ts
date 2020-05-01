import { AnimationTriggerMetadata, trigger, state, style, animate, transition } from '@angular/animations';
import { XDuration } from './consts';

export const XFadeAnimation: AnimationTriggerMetadata = trigger('x-fade-animation', [
  transition(':enter', [style({ opacity: 0 }), animate(`${XDuration.Base} ease-in`, style({ opacity: 1 }))]),
  transition(':leave', [animate(`${XDuration.Base} ease-out`, style({ opacity: 0 }))])
]);
