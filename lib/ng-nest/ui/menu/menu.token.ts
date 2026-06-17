import { ElementRef, InjectionToken, Signal, WritableSignal } from '@angular/core';
import type { XMenuNode } from './menu.property';

export interface XMenuContext {
  activatedId: Signal<any>;
  activatedElementRef: WritableSignal<ElementRef<HTMLElement> | null>;
  setScrollTop(): void;
  onNodeClick(node: XMenuNode): void;
  rootIndexChange(index: number): void;
  onToggle(event: Event | null, node: XMenuNode, isDropdown?: boolean): void;
  setCategory(nodes: XMenuNode[]): void;
  setActivatedNode(nodes: XMenuNode[]): void;
  setParentOpen(nodes: XMenuNode[], node: XMenuNode): void;
}

export const X_MENU_CONTEXT = new InjectionToken<XMenuContext>('X_MENU_CONTEXT');
