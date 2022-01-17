import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal, ComponentType, TemplatePortal } from '@angular/cdk/portal';
import { Injectable, TemplateRef } from '@angular/core';
import { fillDefault, XConfigService, XDialogConfig } from '@ng-nest/ui/core';
import { XPortalService } from '@ng-nest/ui/portal';
import { XDialogContainerComponent } from './dialog-container.component';
import { XDialogRef } from './dialog-ref';
import { XDialogRefOption, X_DIALOG_CONFIG_NAME, X_DIALOG_DATA } from './dialog.property';

@Injectable()
export class XDialogService {
  default: XDialogRefOption = {
    placement: 'center',
    offset: '1rem',
    width: '32rem',
    backdropClose: true,
    hasBackdrop: true,
    draggable: false
  };
  configDefault?: XDialogConfig;

  constructor(public portalService: XPortalService, public configService: XConfigService, public overlay: Overlay) {
    this.configDefault = this.configService.getConfigForComponent(X_DIALOG_CONFIG_NAME);
    Object.assign(this.default, this.configDefault);
  }

  create<T>(content: TemplateRef<any> | ComponentType<T>, option: XDialogRefOption = {}): XDialogRef<T> {
    fillDefault(option, this.default);
    const portal = this.portalService.attach<XDialogContainerComponent>({
      content: XDialogContainerComponent,
      viewContainerRef: option.viewContainerRef,
      overlayConfig: {
        hasBackdrop: option.hasBackdrop,
        panelClass: option.className,
        scrollStrategy: this.overlay.scrollStrategies.reposition(),
        positionStrategy: this.portalService.setPlace(option.placement, option.width, option.height, option.offset!)
      }
    });
    const { overlayRef, componentRef } = portal || {};
    const { instance } = componentRef! || {};
    instance.placement = option.placement;
    const dialogRef = new XDialogRef<T>(overlayRef!, instance);
    if (content instanceof TemplateRef) {
      instance.attachTemplatePortal(
        new TemplatePortal(content, option.viewContainerRef!, { $implicit: option.data, dialogRef: dialogRef })
      );
    } else {
      const injector = this.portalService.createInjector([
        { provide: X_DIALOG_DATA, useValue: option.data },
        { provide: XDialogRef, useValue: dialogRef }
      ]);
      const comRef = instance.attachComponentPortal(new ComponentPortal(content, option.viewContainerRef, injector));
      dialogRef.componentInstance = comRef.instance;
    }

    if (option.hasBackdrop && option.backdropClose && overlayRef) {
      overlayRef.backdropClick().subscribe(() => {
        dialogRef.close();
      });
    }

    return dialogRef;
  }
}
