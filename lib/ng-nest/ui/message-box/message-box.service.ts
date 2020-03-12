import { Injectable } from '@angular/core';
import { XMessageBoxServiceModule } from './message-box.service.module';
import { XPortalService } from '@ng-nest/ui/portal';
import { XTemplate, XIsXTemplate, fillDefault } from '@ng-nest/ui/core';
import { XMessageBoxInput, XMessageBoxOverlayRef, XMessageBoxRef, XMessageBoxPortal } from './message-box.type';
import { XMessageBoxComponent } from './message-box.component';
import { Overlay } from '@angular/cdk/overlay';

@Injectable({ providedIn: XMessageBoxServiceModule })
export class XMessageBoxService {
  default: XMessageBoxInput = {
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
    inputPlaceholder: ''
  };

  constructor(private protalService: XPortalService) {}

  alert(option: XTemplate | XMessageBoxInput): XMessageBoxRef {
    return this.createMessageBox(option, { showIcon: false, showCancel: false, showInput: false });
  }

  confirm(option: XTemplate | XMessageBoxInput): XMessageBoxRef {
    return this.createMessageBox(option, { showIcon: true, showCancel: true, showInput: false });
  }

  prompt(option: XTemplate | XMessageBoxInput): XMessageBoxRef {
    return this.createMessageBox(option, { showIcon: false, showCancel: true, showInput: true });
  }

  create(option: XMessageBoxInput): XMessageBoxOverlayRef {
    return this.protalService.create({
      content: XMessageBoxComponent,
      overlayConfig: {
        panelClass: XMessageBoxPortal,
        hasBackdrop: true,
        positionStrategy: this.protalService.setPlace(option.placement, option.offset, option.width, option.height)
      }
    });
  }

  private createMessageBox(option: XTemplate | XMessageBoxInput, def: XMessageBoxInput): XMessageBoxRef {
    let opt: XMessageBoxInput;
    if (XIsXTemplate(option)) {
      opt = { title: option as XTemplate };
    } else {
      opt = option as XMessageBoxInput;
    }
    console.log(opt, Object.assign(this.default, def));
    fillDefault(opt, Object.assign(this.default, def));
    return this.createMessageBoxPlacement(opt);
  }

  private createMessageBoxPlacement(option: XMessageBoxInput): XMessageBoxRef {
    let result = { ref: this.create(option), input: option };
    result.ref.componentRef.instance.messageBox = result;
    if (option.backdropClose)
      result.ref.overlayRef.backdropClick().subscribe(() => result.ref.componentRef.instance.onClose());
    return result;
  }
}
