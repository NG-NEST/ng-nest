import { AnimationTriggerMetadata, trigger, style, animate, transition } from '@angular/animations';
import { XDuration } from './consts';
export const XMoveAnimation: AnimationTriggerMetadata = trigger('x-move-animation', [
  transition('void => top-start, void => top, void => top-end, void => center', [
    style({
      transform: 'translateY(-100%)',
      opacity: 0
    }),
    animate(
      `${XDuration.Base}`,
      style({
        transform: 'translateY(0%)',
        opacity: 1
      })
    )
  ]),
  transition('top-start => void, top => void, top-end => void, center => void', [
    style({
      transform: 'translateY(0%)',
      opacity: 1,
      height: '*'
    }),
    animate(
      `${XDuration.Base}`,
      style({
        transform: 'translateY(-100%)',
        opacity: 0,
        height: 0
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
      transform: 'translateY(100%)',
      opacity: 0,
      height: 0
    }),
    animate(
      `${XDuration.Base}`,
      style({
        transform: 'translateY(0%)',
        opacity: 1,
        height: '*'
      })
    )
  ]),
  transition('bottom-start => void, bottom => void, bottom-end => void', [
    style({
      transform: 'translateY(0%)',
      opacity: 1
    }),
    animate(
      `${XDuration.Base}`,
      style({
        transform: 'translateY(100%)',
        opacity: 0
      })
    )
  ])
]);
