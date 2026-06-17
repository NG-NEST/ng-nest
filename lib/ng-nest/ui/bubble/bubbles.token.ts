import { InjectionToken, Signal } from '@angular/core';

export interface XBubblesContext {
  size: Signal<string | undefined>;
  variant: Signal<string | undefined>;
}

export const X_BUBBLES_CONTEXT = new InjectionToken<XBubblesContext>('X_BUBBLES_CONTEXT');
