import { Injectable } from '@angular/core';
import { XTemplate, XIsXTemplate, fillDefault, XIsString } from '@ng-nest/ui/core';
import { XMessageBoxOption, XMessageBoxOverlayRef, XMessageBoxRef, XMessageBoxPortal } from './message-box.property';
import { XMessageBoxComponent } from './message-box.component';
import { XPortalService } from '@ng-nest/ui/portal';
import { XI18nService } from '@ng-nest/ui/i18n';

@Injectable()
export class XMessageBoxService {
  default: XMessageBoxOption = {
    type: 'info',
    width: '20rem',
    placement: 'center',
    offset: '2rem',
    effect: 'white',
    duration: 3000,
    showIcon: false,
    showInput: false,
    backdropClose: false,
    cancelText: '取消',
    confirmText: '确认',
    inputPlaceholder: '',
    hide: false
  };

  constructor(public portal: XPortalService, public i18n: XI18nService) {}

  alert(option: XTemplate | XMessageBoxOption): XMessageBoxRef {
    return this.createMessageBox(option, { showIcon: false, showCancel: false, showInput: false });
  }

  confirm(option: XTemplate | XMessageBoxOption): XMessageBoxRef {
    return this.createMessageBox(option, { showIcon: true, showCancel: true, showInput: false });
  }

  prompt(option: XTemplate | XMessageBoxOption): XMessageBoxRef {
    return this.createMessageBox(option, { showIcon: false, showCancel: true, showInput: true });
  }

  create(option: XMessageBoxOption): XMessageBoxOverlayRef {
    const offset = XIsString(option.offset) ? [option.offset as string] : (option.offset as string[]);
    return this.portal.attach({
      content: XMessageBoxComponent,
      overlayConfig: {
        panelClass: XMessageBoxPortal,
        hasBackdrop: true,
        positionStrategy: this.portal.setPlace(option.placement, option.width, option.height, ...offset)
      }
    });
  }

  private createMessageBox(option: XTemplate | XMessageBoxOption, def: XMessageBoxOption): XMessageBoxRef {
    let opt: XMessageBoxOption;
    if (XIsXTemplate(option)) {
      opt = { title: option as XTemplate };
    } else {
      opt = option as XMessageBoxOption;
    }
    this.setLocal();
    fillDefault(opt, Object.assign(this.default, def));
    return this.createMessageBoxPlacement(opt);
  }

  private createMessageBoxPlacement(option: XMessageBoxOption): XMessageBoxRef {
    let result = { ref: this.create(option), input: option };
    (result.ref?.componentRef?.instance as any).messageBox = result;
    if (option.backdropClose) result.ref?.overlayRef?.backdropClick().subscribe(() => result.ref?.componentRef?.instance.onClose());
    return result;
  }

  private setLocal() {
    const messageBoxLocale = this.i18n.getLocale().messageBox;
    this.default = { ...this.default, ...messageBoxLocale };
    console.log(messageBoxLocale, this.default);
  }
}
