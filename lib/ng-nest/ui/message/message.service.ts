import { Injectable } from '@angular/core';
import { XTemplate, XIsXTemplate, XIsEmpty, fillDefault, XIsString, XConfigService, XMessageConfig } from '@ng-nest/ui/core';
import {
  XMessageOverlayRef,
  XMessageType,
  XMessagePlacement,
  XMessageRef,
  XMessagePortal,
  XMessageOption,
  X_CONFIG_NAME
} from './message.property';
import { XMessageComponent } from './message.component';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { XPortalService } from '@ng-nest/ui/portal';

@Injectable()
export class XMessageService {
  messages: XMessagePlacement = {};

  default: XMessageOption = {
    type: 'info',
    width: '16rem',
    placement: 'top',
    offset: '2rem',
    effect: 'white',
    duration: 3000,
    hideClose: true,
    showIcon: true,
    hide: false
  };

  configDefault?: XMessageConfig;

  constructor(public portal: XPortalService, public configService: XConfigService) {
    this.configDefault = this.configService.getConfigForComponent(X_CONFIG_NAME);
    Object.assign(this.default, this.configDefault);
  }

  info(option: XTemplate | XMessageOption): XMessageRef {
    return this.createMessage(option, 'info');
  }

  success(option: XTemplate | XMessageOption): XMessageRef {
    return this.createMessage(option, 'success');
  }

  warning(option: XTemplate | XMessageOption): XMessageRef {
    return this.createMessage(option, 'warning');
  }

  error(option: XTemplate | XMessageOption): XMessageRef {
    return this.createMessage(option, 'error');
  }

  create(option: XMessageOption): XMessageOverlayRef {
    const offset = XIsString(option.offset) ? [option.offset as string] : (option.offset as string[]);
    return this.portal.attach({
      content: XMessageComponent,
      overlayConfig: {
        panelClass: XMessagePortal,
        positionStrategy: this.portal.setPlace(option.placement, option.width, option.height, ...offset)
      }
    });
  }

  private createMessage(option: XTemplate | XMessageOption, type: XMessageType): XMessageRef {
    let opt: XMessageOption;
    if (XIsXTemplate(option)) {
      opt = { title: option as XTemplate, type: type };
    } else {
      opt = option as XMessageOption;
      opt.type = type;
    }
    fillDefault(opt, this.default);

    return this.createMessagePlacement(opt);
  }

  private createMessagePlacement(option: XMessageOption): XMessageRef {
    if (typeof option.placement === 'undefined') return { ref: {}, list: [], currentClose: () => {}, closeAll: () => {} };
    let msgPlacement = this.messages[option.placement];
    this.setDuration(option);
    if (XIsEmpty(msgPlacement) || !msgPlacement.ref?.overlayRef?.hasAttached()) {
      this.messages[option.placement] = {
        ref: this.create(option),
        list: [option],
        currentClose: () => {
          this.removeMessage(option);
        },
        closeAll: () => {
          for (let key in this.messages) {
            this.messages[key].list = [];
            this.messageChange(this.messages[key]);
          }
        }
      };
    } else {
      this.messages[option.placement].list = [...(this.messages[option.placement].list as XMessageOption[]), option];
    }
    this.messageChange(this.messages[option.placement]);

    return this.messages[option.placement];
  }

  private messageChange(message: XMessageRef) {
    if (!message.ref?.overlayRef?.hasAttached() || !message?.ref?.componentRef?.instance) return;
    message.ref.componentRef.instance.message = message;
    message.ref.componentRef.instance.cdr.detectChanges();
  }

  private setDuration(option: XMessageOption) {
    if (option.duration) {
      option.duration$ = of(true)
        .pipe(delay(option.duration))
        .subscribe(() => {
          this.removeMessage(option);
        });
    }
  }

  private removeMessage(option: XMessageOption) {
    if (typeof option.placement === 'undefined') return;
    this.messages[option.placement].ref?.componentRef?.instance.onClose(option);
  }
}
