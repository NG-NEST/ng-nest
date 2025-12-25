import { InjectionToken, WritableSignal } from '@angular/core';
import type { XImageHandle } from './image.property';

export interface XImageGroupContext {
  images: WritableSignal<XImageHandle[]>;
  addImage(image: XImageHandle): void;
  removeImage(image: XImageHandle): void;
}

export const X_IMAGE_GROUP_CONTEXT = new InjectionToken<XImageGroupContext>('X_IMAGE_GROUP_CONTEXT');
