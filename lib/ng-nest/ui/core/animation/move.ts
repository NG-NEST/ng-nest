import { AnimationTriggerMetadata, trigger, style, animate, transition } from '@angular/animations';
import { XDuration } from './consts';

/**
 * @zh_CN 移入移出动画
 * @en_US Move in the animation
 */
export const XMoveAnimation: AnimationTriggerMetadata = trigger('x-move-animation', [
  transition('void => top-start, void => top, void => top-end, void => center', [
    style({
      transform: 'translateY(-200%)',
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
        transform: 'translateY(-200%)',
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
      transform: 'translateY(200%)',
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
        transform: 'translateY(200%)',
        opacity: 0
      })
    )
  ])
]);

export const XMoveBoxAnimation: AnimationTriggerMetadata = trigger('x-move-box-animation', [
  transition('void => top-start, void => top, void => top-end, void => center', [
    style({
      transform: 'translateY(-2rem)',
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
      opacity: 1
    }),
    animate(
      `${XDuration.Base}`,
      style({
        transform: 'translateY(-2rem)',
        opacity: 0
      })
    )
  ]),
  transition('void => left', [
    style({
      transform: 'translateX(-2rem)',
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
      opacity: 1
    }),
    animate(
      `${XDuration.Base}`,
      style({
        transform: 'translateX(-2rem)',
        opacity: 0
      })
    )
  ]),
  transition('void => right', [
    style({
      transform: 'translateX(2rem)',
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
      opacity: 1
    }),
    animate(
      `${XDuration.Base}`,
      style({
        transform: 'translateX(2rem)',
        opacity: 0
      })
    )
  ]),
  transition('void => bottom-start, void => bottom, void => bottom-end', [
    style({
      transform: 'translateY(2rem)',
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
  transition('bottom-start => void, bottom => void, bottom-end => void', [
    style({
      transform: 'translateY(0%)',
      opacity: 1
    }),
    animate(
      `${XDuration.Base}`,
      style({
        transform: 'translateY(2rem)',
        opacity: 0
      })
    )
  ])
]);
