import { AnimationTriggerMetadata, trigger, style, animate, transition } from '@angular/animations';
import { XDuration } from './consts';

// TODO: 延迟执行动画需要优化
// 进场动画，此处延迟 5ms 执行，指定的 placement 方位可能无法显示完全，会尝试从其它方位显示，需要延迟等候确认方位
const XDURATION_BASE_EASE_IN = `${XDuration.Base} 5ms ease-in`;
// 移除动画
const XDURATION_BASE_EASE_OUT = `${XDuration.Base} ease-out`;

export const XConnectAnimation: AnimationTriggerMetadata = trigger('x-connect-animation', [
  transition('* => top-start, * => top, * => top-end, * => center', [
    style({
      opacity: 0,
      transform: 'scaleY(0.8)',
      transformOrigin: '0% 100%'
    }),
    animate(
      XDURATION_BASE_EASE_IN,
      style({
        opacity: 1,
        transform: 'scaleY(1)',
        transformOrigin: '0% 100%'
      })
    )
  ]),
  transition('top-start => void, top => void, top-end => void, center => void', [
    style({
      opacity: 1,
      transform: 'scaleY(1)',
      transformOrigin: '0% 100%'
    }),
    animate(
      XDURATION_BASE_EASE_OUT,
      style({
        opacity: 0,
        transform: 'scaleY(0.8)',
        transformOrigin: '0% 100%'
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
  transition('* => bottom-start, * => bottom, * => bottom-end', [
    style({
      opacity: 0,
      transform: 'scaleY(0.8)',
      transformOrigin: '0% 0%'
    }),
    animate(
      XDURATION_BASE_EASE_IN,
      style({
        opacity: 1,
        transform: 'scaleY(1)',
        transformOrigin: '0% 0%'
      })
    )
  ]),
  transition('bottom-start => void, bottom => void, bottom-end => void', [
    style({
      opacity: 1,
      transform: 'scaleY(1)',
      transformOrigin: '0% 0%'
    }),
    animate(
      XDURATION_BASE_EASE_OUT,
      style({
        opacity: 0,
        transform: 'scaleY(0.8)',
        transformOrigin: '0% 0%'
      })
    )
  ])
]);
