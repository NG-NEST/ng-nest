import { Directive, EventEmitter, Output } from '@angular/core';

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
  @Output() dragStarted = new EventEmitter<XDragDistance>();
  @Output() dragMoved = new EventEmitter<XDragDistanceOffset>();
  @Output() dragEnded = new EventEmitter<XDragDistance>();
}

export interface XDragDistance {
  x: number;
  y: number;
}

export interface XDragDistanceOffset extends XDragDistance {
  offsetX: number;
  offsetY: number;
}
