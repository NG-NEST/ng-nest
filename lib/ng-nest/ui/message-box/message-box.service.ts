import { ComponentRef, Injectable, inject } from '@angular/core';
import { XTemplate, XIsXTemplate, XFillDefault, XIsString } from '@ng-nest/ui/core';
import { XMessageBoxOption, XMessageBoxOverlayRef, XMessageBoxRef, XMessageBoxPortal } from './message-box.property';
import { XMessageBoxComponent } from './message-box.component';
import { XPortalService } from '@ng-nest/ui/portal';
import { XI18nService } from '@ng-nest/ui/i18n';

@Injectable({ providedIn: 'root' })
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
    showTextarea: false,
    backdropClose: false,
    cancelText: '取消',
    confirmText: '确认',
    inputPlaceholder: '',
    textareaHeight: '6rem'
  };

  private portal = inject(XPortalService);
  private i18n = inject(XI18nService);

  alert(option: XTemplate | XMessageBoxOption): XMessageBoxRef {
    return this.createMessageBox(option, { showIcon: false, showCancel: false, showInput: false });
  }

  confirm(option: XTemplate | XMessageBoxOption): XMessageBoxRef {
    return this.createMessageBox(option, { showIcon: true, showCancel: true, showInput: false });
  }

  prompt(option: XTemplate | XMessageBoxOption): XMessageBoxRef {
    const opt = option as XMessageBoxOption;
    let def: XMessageBoxOption = { showIcon: false, showCancel: true, showInput: true };
    if (!opt.showInput && opt.showTextarea) {
      def = { showIcon: false, showCancel: true, showTextarea: true };
    }
    return this.createMessageBox(option, def);
  }

  create(option: XMessageBoxOption): XMessageBoxOverlayRef {
    const offset = XIsString(option.offset) ? [option.offset as string] : (option.offset as string[]);
    return this.portal.attach({
      content: XMessageBoxComponent,
      overlayConfig: {
        panelClass: XMessageBoxPortal,
        hasBackdrop: true,
        width: option.width,
        height: option.height,
        positionStrategy: this.portal.setPlace(option.placement, ...offset)
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
    XFillDefault(opt, Object.assign({ ...this.default }, def));
    return this.createMessageBoxPlacement(opt);
  }

  private createMessageBoxPlacement(option: XMessageBoxOption): XMessageBoxRef {
    const ref = this.create(option);
    const { overlayRef, componentRef } = ref;
    const { instance } = componentRef as ComponentRef<XMessageBoxComponent>;
    const result = {
      ref: ref,
      input: option,
      close: () => {
        instance.close();
      }
    };
    instance.messageBox = result;
    if (option.backdropClose && overlayRef) {
      overlayRef.backdropClick().subscribe(() => instance.onClose());
    }
    return result;
  }

  private setLocal() {
    const messageBoxLocale = this.i18n.getLocale().messageBox;
    this.default = { ...this.default, ...messageBoxLocale };
  }
}
