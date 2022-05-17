import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal, ComponentType, TemplatePortal } from '@angular/cdk/portal';
import { Injectable, Renderer2, RendererFactory2, TemplateRef } from '@angular/core';
import { fillDefault, XConfigService, XDialogConfig } from '@ng-nest/ui/core';
import { PortalResizablePrefix, XPortalService } from '@ng-nest/ui/portal';
import { XDialogPortalComponent } from './dialog-portal.component';
import { XDialogRef } from './dialog-ref';
import { XDialogRefOption, X_DIALOG_CONFIG_NAME, X_DIALOG_DATA } from './dialog.property';

@Injectable()
export class XDialogService {
  default: XDialogRefOption = {
    placement: 'center',
    offset: '1rem',
    width: '32rem',
    minWidth: '18rem',
    minHeight: '8rem',
    backdropClose: true,
    hasBackdrop: true,
    draggable: false,
    resizable: false
  };
  configDefault?: XDialogConfig;

  renderer!: Renderer2;

  constructor(
    public portalService: XPortalService,
    public configService: XConfigService,
    public overlay: Overlay,
    public rendererFactory: RendererFactory2
  ) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
    this.configDefault = this.configService.getConfigForComponent(X_DIALOG_CONFIG_NAME);
    Object.assign(this.default, this.configDefault);
  }

  create<T>(content: TemplateRef<any> | ComponentType<T>, option: XDialogRefOption = {}): XDialogRef<T> {
    fillDefault(option, this.default);
    const portal = this.portalService.attach<XDialogPortalComponent>({
      content: XDialogPortalComponent,
      viewContainerRef: option.viewContainerRef,
      overlayConfig: {
        hasBackdrop: option.hasBackdrop,
        panelClass: option.className,
        scrollStrategy: this.overlay.scrollStrategies.block(),
        width: option.width,
        height: option.height,
        minWidth: option.minWidth,
        minHeight: option.minHeight,
        positionStrategy: this.portalService.setPlace(option.placement, option.offset!)
      }
    });

    const { overlayRef, componentRef } = portal || {};
    const { instance } = componentRef! || {};
    const { hostElement, overlayElement } = overlayRef || {};
    const dialogRef = new XDialogRef<T>(overlayRef!, instance, this.renderer, this.portalService);
    let dialogBox = {
      draggable: option.draggable,
      resizable: option.resizable
    };
    let defaultMaximize = this.setMaximize(option);
    Object.assign(dialogBox, {
      width: defaultMaximize ? this.default.width : option.width,
      height: defaultMaximize ? null : option.height,
      minWidth: option.minWidth,
      minHeight: option.minHeight
    });
    instance.placement = option.placement;
    instance.option = option;
    instance.dialogRef = dialogRef;
    instance.defaultMaximize = defaultMaximize;
    instance.dialogBox = dialogBox;
    instance.hostElement = hostElement;
    instance.overlayElement = overlayElement;
    dialogRef.option = option;
    dialogRef.fullscreen = defaultMaximize;
    if (option.resizable && !defaultMaximize) {
      this.renderer.addClass(hostElement, PortalResizablePrefix);
      setTimeout(() => {
        Object.assign(dialogBox, this.portalService.setResizable(overlayElement!, option.placement));
        instance.offsetLeft = overlayElement!.offsetLeft;
        instance.offsetTop = overlayElement!.offsetTop;
        const dialogDraggable = overlayElement?.querySelector('.x-dialog-portal')!;
        instance.initHeight = dialogDraggable.clientHeight;
        instance.dialogContent = overlayElement?.querySelector('.x-dialog-portal-content')!;
        instance.initContentHeight = instance.dialogContent?.clientHeight;
        instance.dialogBox = dialogBox;
      });
    }
    if (defaultMaximize) {
      this.renderer.addClass(overlayElement, 'x-dialog-portal-fullscreen');
    }
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

  private setMaximize(option: XDialogRefOption = {}) {
    const ws = ['100%', '100vw'];
    const hs = ['100%', '100vh'];
    if (ws.includes(option.width as string) && hs.includes(option.height as string)) {
      option.resizable = false;
      option.draggable = false;
      return true;
    }
    return false;
  }
}
