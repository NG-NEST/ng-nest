import { AnimationTriggerMetadata, trigger, style, animate, transition } from '@angular/animations';
import { XDuration } from './consts';

// 进场动画
const XDURATION_BASE_EASE_IN = `${XDuration.Fast} ease-in`;
// 移除动画
const XDURATION_BASE_EASE_OUT = `${XDuration.Fast} ease-out`;

export const XConnectAnimation: AnimationTriggerMetadata = trigger('x-connect-animation', [
  transition('void => top-start, void => top, void => top-end, void => center', [
    style({
      opacity: 0
      // transform: 'scaleY(0.8)',
      // transformOrigin: '0% 100%'
    }),
    animate(
      XDURATION_BASE_EASE_IN,
      style({
        opacity: 1
        // transform: 'scaleY(1)',
        // transformOrigin: '0% 100%'
      })
    )
  ]),
  transition('top-start => void, top => void, top-end => void, center => void', [
    style({
      opacity: 1
      // transform: 'scaleY(1)',
      // transformOrigin: '0% 100%'
    }),
    animate(
      XDURATION_BASE_EASE_OUT,
      style({
        opacity: 0
        // transform: 'scaleY(0.8)',
        // transformOrigin: '0% 100%'
      })
    )
  ]),
  transition('void => left', [
    style({
      transform: 'translateX(-30%)',
      opacity: 0
    }),
    animate(
      `${XDuration.Base}`,
      style({
        transform: 'translateX(0%)',
        opacity: 1
      })
    )
  ]),
  transition('left => void', [
    style({
      transform: 'translateX(0%)',
      opacity: 1,
      height: '*'
    }),
    animate(
      `${XDuration.Base}`,
      style({
        transform: 'translateX(-30%)',
        opacity: 0,
        height: 0
      })
    )
  ]),
  transition('void => right', [
    style({
      transform: 'translateX(30%)',
      opacity: 0
    }),
    animate(
      `${XDuration.Base}`,
      style({
        transform: 'translateX(0%)',
        opacity: 1
      })
    )
  ]),
  transition('right => void', [
    style({
      transform: 'translateX(0%)',
      opacity: 1,
      height: '*'
    }),
    animate(
      `${XDuration.Base}`,
      style({
        transform: 'translateX(30%)',
        opacity: 0,
        height: 0
      })
    )
  ]),
  transition('void => bottom-start, void => bottom, void => bottom-end', [
    style({
      opacity: 0
      // transform: 'scale(0)',
      // transformOrigin: '0% 0%'
    }),
    animate(
      XDURATION_BASE_EASE_IN,
      style({
        opacity: 1
        // transform: 'scale(1)',
        // transformOrigin: '30% 30%'
      })
    )
  ]),
  transition('bottom-start => void, bottom => void, bottom-end => void', [
    style({
      opacity: 1
      // transform: 'scale(1)',
      // transformOrigin: '30% 30%'
    }),
    animate(
      XDURATION_BASE_EASE_OUT,
      style({
        opacity: 0
        // transform: 'scale(0)',
        // transformOrigin: '0% 0%'
      })
    )
  ])
]);

export const XConnectBaseAnimation: AnimationTriggerMetadata = trigger('x-connect-base-animation', [
  transition(':enter', [style({ opacity: 0, transform: 'scaleY(0.8)' }), animate(XDURATION_BASE_EASE_IN)]),
  transition(':leave', [animate(XDURATION_BASE_EASE_OUT, style({ opacity: 0 }))])
]);
