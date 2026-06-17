import { InjectionToken } from '@angular/core';

export interface XDialogRefHandle {
  fullscreen: boolean;
  option: { draggable?: boolean };
  close(result?: any): void;
  onFullscreen(): void;
}

export const X_DIALOG_REF = new InjectionToken<XDialogRefHandle>('X_DIALOG_REF');
