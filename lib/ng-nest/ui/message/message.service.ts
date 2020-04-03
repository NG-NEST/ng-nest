import { Injectable } from '@angular/core';
import { XTemplate, XIsXTemplate, fillDefault, XIsEmpty } from '@ng-nest/ui/core';
import { XMessageInput, XMessageOverlayRef, XMessageType, XMessagePlacement, XMessageRef, XMessagePortal } from './message.type';
import { XMessageComponent } from './message.component';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { XPortalService } from '@ng-nest/ui/portal';

@Injectable()
export class XMessageService {
  messages: XMessagePlacement = {};

  default: XMessageInput = {
    type: 'info',
    width: '16rem',
    placement: 'top',
    offset: '2rem',
    effect: 'light',
    duration: 3000,
    hideClose: true,
    showIcon: true
  };

  constructor(public portal: XPortalService) {}

  info(option: XTemplate | XMessageInput): XMessageRef {
    return this.createMessage(option, 'info');
  }

  success(option: XTemplate | XMessageInput): XMessageRef {
    return this.createMessage(option, 'success');
  }

  warning(option: XTemplate | XMessageInput): XMessageRef {
    return this.createMessage(option, 'warning');
  }

  error(option: XTemplate | XMessageInput): XMessageRef {
    return this.createMessage(option, 'error');
  }

  create(option: XMessageInput): XMessageOverlayRef {
    return this.portal.attach({
      content: XMessageComponent,
      overlayConfig: {
        panelClass: XMessagePortal,
        positionStrategy: this.portal.setPlace(option.placement, option.offset, option.width, option.height)
      }
    });
  }

  private createMessage(option: XTemplate | XMessageInput, type: XMessageType): XMessageRef {
    let opt: XMessageInput;
    if (XIsXTemplate(option)) {
      opt = { title: option as XTemplate, type: type };
    } else {
      opt = option as XMessageInput;
      opt.type = type;
    }
    fillDefault(opt, this.default);
    return this.createMessagePlacement(opt);
  }

  private createMessagePlacement(option: XMessageInput): XMessageRef {
    let msgPlacement = this.messages[option.placement];
    this.setDuration(option);
    if (XIsEmpty(msgPlacement) || !msgPlacement.ref.overlayRef.hasAttached()) {
      this.messages[option.placement] = {
        ref: this.create(option),
        list: [option]
      };
    } else {
      this.messages[option.placement].list = [...this.messages[option.placement].list, option];
    }
    this.messageChange(this.messages[option.placement]);

    return this.messages[option.placement];
  }

  private messageChange(message: XMessageRef) {
    if (!message.ref.overlayRef.hasAttached()) return;
    message.ref.componentRef.instance.message = message;
    message.ref.componentRef.instance.cdr.detectChanges();
  }

  private setDuration(option: XMessageInput) {
    if (option.duration) {
      option.duration$ = of(true)
        .pipe(delay(option.duration))
        .subscribe(() => {
          this.removeMessage(option);
        });
    }
  }

  private removeMessage(option: XMessageInput) {
    this.messages[option.placement].ref.componentRef.instance.onClose(option);
  }
}
