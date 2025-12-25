import { OverlayRef } from '@angular/cdk/overlay';
import { Subject, filter, take } from 'rxjs';
import { XDialogPortalHandle, XDialogRefOption } from './dialog.property';
import { XDialogRefHandle } from './dialog-ref.token';
import { Renderer2 } from '@angular/core';
import { XPortalResizablePrefix, XPortalService } from '@ng-nest/ui/portal';

// TODO: add more function
export class XDialogRef<C> implements XDialogRefHandle {
  componentInstance!: C;
  option!: XDialogRefOption;
  fullscreen = false;
  afterClose = new Subject<any>();
  unsubject = new Subject<void>();
  private _isFristFullscreen = true;

  overlayRef: OverlayRef;
  containerInstance: XDialogPortalHandle;
  renderer: Renderer2;
  portalService: XPortalService;

  constructor(params: {
    overlayRef: OverlayRef;
    containerInstance: XDialogPortalHandle;
    renderer: Renderer2;
    option: XDialogRefOption;
    fullscreen: boolean;
    portalService: XPortalService;
  }) {
    this.overlayRef = params.overlayRef;
    this.containerInstance = params.containerInstance;
    this.renderer = params.renderer;
    this.option = params.option;
    this.fullscreen = params.fullscreen;
    this.portalService = params.portalService;
  }

  close(result?: any) {
    this.containerInstance.animationChanged
      .pipe(
        filter((event) => event.animationName.endsWith('-leave') && event.action === 'end'),
        take(1)
      )
      .subscribe(() => {
        this.overlayRef.dispose();
        this.afterClose.next(result);
      });

    setTimeout(() => {
      this.overlayRef.detach();
      this.unsubject.next();
      this.unsubject.complete();
    });
  }

  onFullscreen(): void {
    let { dialogBox, overlayElement, distance, hostElement, defaultMaximize } = this.containerInstance;
    if (!this.fullscreen) {
      this.overlayRef.updateSize({
        width: '100%',
        height: '100%',
        minWidth: '100%',
        minHeight: '100%'
      });
      this.fullscreen = true;
      dialogBox.minWidth = '100%';
      dialogBox.minHeight = '100%';
      dialogBox.draggable = false;
      dialogBox.resizable = false;
      if (this.option.resizable) {
        this.renderer.setStyle(overlayElement, 'margin', '0 0 0 0');
      }
      if (this.option.draggable) {
        dialogBox.distance = { x: 0, y: 0 };
      }
      this.renderer.addClass(overlayElement, 'x-dialog-portal-fullscreen');
    } else {
      dialogBox.minWidth = this.option.minWidth;
      dialogBox.minHeight = this.option.minHeight;
      if (this._isFristFullscreen && defaultMaximize) {
        this.option.draggable = dialogBox.draggable;
        this.option.resizable = dialogBox.resizable;
      } else {
        dialogBox.draggable = this.option.draggable;
        dialogBox.resizable = this.option.resizable;
      }

      this.overlayRef.updateSize({
        width: dialogBox['width'],
        height: dialogBox['height'],
        minWidth: dialogBox['minWidth'],
        minHeight: dialogBox['minHeight']
      });
      this.fullscreen = false;
      if (this.option.draggable) {
        dialogBox.distance = { ...distance };
      }
      if (this.option.resizable) {
        if (dialogBox.marginTop) {
          this.renderer.setStyle(overlayElement, 'margin-top', `${dialogBox.marginTop}`);
        }
        if (dialogBox.marginLeft) {
          this.renderer.setStyle(overlayElement, 'margin-left', `${dialogBox.marginLeft}`);
        }
        if (dialogBox.marginRight) {
          this.renderer.setStyle(overlayElement, 'margin-right', `${dialogBox.marginRight}`);
        }
        if (dialogBox.marginBottom) {
          this.renderer.setStyle(overlayElement, 'margin-bottom', `${dialogBox.marginBottom}`);
        }
      }
      this.renderer.removeClass(overlayElement, 'x-dialog-portal-fullscreen');
      if (this._isFristFullscreen && defaultMaximize) {
        this.overlayRef.updatePositionStrategy(this.portalService.setPlace(this.option.placement, this.option.offset!));
        this.renderer.addClass(hostElement, XPortalResizablePrefix);
        setTimeout(() => {
          Object.assign(dialogBox, this.portalService.setResizable(overlayElement!, this.option.placement));
          this.containerInstance.offsetLeft = overlayElement!.offsetLeft;
          this.containerInstance.offsetTop = overlayElement!.offsetTop;
          const dialogDraggable = overlayElement?.querySelector('.x-dialog-portal')!;
          this.containerInstance.initHeight = dialogDraggable.clientHeight;
          this.containerInstance.dialogContent = overlayElement?.querySelector('.x-dialog-portal-content')!;
          this.containerInstance.initContentHeight = this.containerInstance.dialogContent?.clientHeight;
          this.containerInstance.dialogBox = dialogBox;
        });
      }
    }
    this._isFristFullscreen = false;
  }
}
