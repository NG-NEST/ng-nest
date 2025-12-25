import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal, ComponentType, TemplatePortal } from '@angular/cdk/portal';
import { DOCUMENT, Injectable, RendererFactory2, TemplateRef, inject } from '@angular/core';
import { XFillDefault, XConfigService, XDialogConfig } from '@ng-nest/ui/core';
import { XPortalService } from '@ng-nest/ui/portal';
import { XDialogPortalComponent } from './dialog-portal.component';
import { XDialogRef } from './dialog-ref';
import { XDialogPortalOverlayRef, XDialogRefOption, X_DIALOG_CONFIG_NAME, X_DIALOG_DATA } from './dialog.property';
import { fromEvent, takeUntil } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class XDialogService {
  default: XDialogRefOption = {
    placement: 'center',
    offset: '1rem',
    width: '32rem',
    minWidth: '18rem',
    minHeight: '8rem',
    backdropClose: true,
    hasBackdrop: true,
    keyboard: true,
    draggable: false
  };
  configDefault?: XDialogConfig;

  private portalService = inject(XPortalService);
  private configService = inject(XConfigService);
  private overlay = inject(Overlay);
  private rendererFactory = inject(RendererFactory2);
  private document = inject(DOCUMENT);
  private renderer = this.rendererFactory.createRenderer(null, null);
  private dialogRefs: XDialogRef<any>[] = [];

  constructor() {
    this.configDefault = this.configService.getConfigForComponent(X_DIALOG_CONFIG_NAME);
    Object.assign(this.default, this.configDefault);
  }

  create<T>(content: TemplateRef<any> | ComponentType<T>, option: XDialogRefOption = {}): XDialogRef<T> {
    XFillDefault(option, this.default);
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
    }) as XDialogPortalOverlayRef;

    const { overlayRef, componentRef } = portal || {};
    const { instance } = componentRef! || {};
    const { hostElement, overlayElement } = overlayRef || {};
    let defaultMaximize = this.setMaximize(option);
    let dialogBox = {
      draggable: option.draggable
    };
    Object.assign(dialogBox, {
      width: defaultMaximize ? this.default.width : option.width,
      height: defaultMaximize ? null : option.height,
      minWidth: option.minWidth,
      minHeight: option.minHeight
    });
    const dialogRef = new XDialogRef<T>({
      overlayRef: overlayRef!,
      containerInstance: instance,
      renderer: this.renderer,
      option,
      fullscreen: defaultMaximize,
      portalService: this.portalService
    });
    componentRef?.setInput('placement', option.placement);
    instance.option = option;
    instance.defaultMaximize = defaultMaximize;
    instance.dialogBox = dialogBox;
    instance.hostElement = hostElement;
    instance.overlayElement = overlayElement;
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

    this.dialogRefs.push(dialogRef);

    const close = () => {
      dialogRef.close();
      this.dialogRefs.splice(this.dialogRefs.indexOf(dialogRef), 1);
    };

    if (option.hasBackdrop && option.backdropClose && overlayRef) {
      overlayRef
        .backdropClick()
        .pipe(takeUntil(dialogRef.unsubject))
        .subscribe(() => {
          close();
        });
    }

    if (option.keyboard) {
      fromEvent<KeyboardEvent>(this.document, 'keydown')
        .pipe(takeUntil(dialogRef.unsubject))
        .subscribe((event: KeyboardEvent) => {
          if (event.key === 'Escape' || event.keyCode === 27) {
            if (this.dialogRefs[this.dialogRefs.length - 1] === dialogRef) {
              close();
            }
          }
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
