import { Injectable } from '@angular/core';
import { XTemplate, XIsXTemplate, fillDefault, XIsEmpty, XIsString } from '@ng-nest/ui/core';
import {
  XNotificationOption,
  XNotificationOverlayRef,
  XNotificationType,
  XNotificationPlacement,
  XNotificationRef,
  XNotificationPortal
} from './notification.property';
import { XNotificationComponent } from './notification.component';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { XPortalService } from '@ng-nest/ui/portal';

@Injectable()
export class XNotificationService {
  notifications: XNotificationPlacement = {};

  default: XNotificationOption = {
    type: 'info',
    width: '20rem',
    placement: 'top-end',
    offset: '0.5rem',
    effect: 'white',
    duration: 4500,
    showIcon: true
  };

  constructor(public portal: XPortalService) {}

  info(option: XTemplate | XNotificationOption): XNotificationRef {
    return this.createNotification(option, 'info');
  }

  success(option: XTemplate | XNotificationOption): XNotificationRef {
    return this.createNotification(option, 'success');
  }

  warning(option: XTemplate | XNotificationOption): XNotificationRef {
    return this.createNotification(option, 'warning');
  }

  error(option: XTemplate | XNotificationOption): XNotificationRef {
    return this.createNotification(option, 'error');
  }

  create(option: XNotificationOption): XNotificationOverlayRef {
    const offset = XIsString(option.offset) ? [option.offset as string] : (option.offset as string[]);
    return this.portal.attach({
      content: XNotificationComponent,
      overlayConfig: {
        panelClass: XNotificationPortal,
        width: option.width,
        height: option.height,
        positionStrategy: this.portal.setPlace(option.placement, ...offset)
      }
    });
  }

  private createNotification(option: XTemplate | XNotificationOption, type: XNotificationType): XNotificationRef {
    let opt: XNotificationOption;
    if (XIsXTemplate(option)) {
      opt = { title: option as XTemplate, type: type };
    } else {
      opt = option as XNotificationOption;
      opt.type = type;
    }
    fillDefault(opt, this.default);
    return this.createNotificationPlacement(opt);
  }

  private createNotificationPlacement(option: XNotificationOption): XNotificationRef {
    if (typeof option.placement === 'undefined') return {};
    let msgPlacement = this.notifications[option.placement];
    this.setDuration(option);
    if (XIsEmpty(msgPlacement) || !msgPlacement.ref?.overlayRef?.hasAttached()) {
      this.notifications[option.placement] = {
        ref: this.create(option),
        list: [option]
      };
    } else {
      this.notifications[option.placement].list = [...(this.notifications[option.placement].list as XNotificationOption[]), option];
    }
    this.notificationChange(this.notifications[option.placement]);

    return this.notifications[option.placement];
  }

  private notificationChange(notification: XNotificationRef) {
    if (!notification.ref?.overlayRef?.hasAttached() || !notification?.ref?.componentRef?.instance) return;
    notification.ref.componentRef.instance.notification = notification;
    notification.ref.componentRef.instance.cdr.detectChanges();
  }

  private setDuration(option: XNotificationOption) {
    if (option.duration) {
      option.duration$ = of(true)
        .pipe(delay(option.duration))
        .subscribe(() => {
          this.removeNotification(option);
          option.duration$ && option.duration$.unsubscribe();
        });
    }
  }

  private removeNotification(option: XNotificationOption) {
    if (typeof option.placement === 'undefined') return;
    this.notifications[option.placement].ref?.componentRef?.instance.onClose(option);
  }
}
