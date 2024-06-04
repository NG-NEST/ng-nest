import { Directive, output } from '@angular/core';

/**
 * Drag 指令名称
 * @selector x-drag
 * @decorator directive
 */
export const XDragPrefix = 'x-drag';

/**
 * Resizable Property
 */
@Directive({ selector: '[x-drag]' })
export class XDragProperty {
  readonly dragStarted = output<XDragDistance>();
  readonly dragMoved = output<XDragDistanceOffset>();
  readonly dragEnded = output<XDragDistance>();
}

export interface XDragDistance {
  x: number;
  y: number;
}

export interface XDragDistanceOffset extends XDragDistance {
  offsetX: number;
  offsetY: number;
}
