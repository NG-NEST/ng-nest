import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentRef, DOCUMENT, inject, Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { XDragOverlayComponent } from './drag-overlay.component';
import { ComponentPortal } from '@angular/cdk/portal';
import { XComputedStyle, XTemplate } from '@ng-nest/ui/core';
import { ViewContainerRef } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class XDragOverlayService {
  overlay = inject(Overlay);
  document = inject(DOCUMENT);
  overlayRef: OverlayRef | null = null;
  componentRef: ComponentRef<XDragOverlayComponent> | null = null;
  containerPosition: string = '';
  private renderer!: Renderer2;
  private factory = inject(RendererFactory2);

  constructor() {
    this.renderer = this.factory.createRenderer(null, null);
  }

  createOverlay(
    container: HTMLElement,
    viewContainerRef: ViewContainerRef,
    params: { icon: XTemplate; title: XTemplate; description: XTemplate }
  ): void {
    this.removeOverlay(container);

    const isBodyOrWindow = container === this.document.body || container === this.document.documentElement;

    this.containerPosition = container.style.position;
    this.renderer.setStyle(container, 'position', 'relative');

    const overlayConfig = new OverlayConfig({
      positionStrategy: this.overlay.position().global(),
      hasBackdrop: false,
      scrollStrategy: this.overlay.scrollStrategies.block()
    });

    this.overlayRef = this.overlay.create(overlayConfig);

    if (this.overlayRef && this.overlayRef.overlayElement) {
      this.renderer.setStyle(this.overlayRef.overlayElement, 'width', container.offsetWidth + 'px');
      this.renderer.setStyle(this.overlayRef.overlayElement, 'height', container.offsetHeight + 'px');
      this.renderer.setStyle(
        this.overlayRef.overlayElement,
        'border-radius',
        XComputedStyle(container, 'border-radius')
      );

      this.renderer.setStyle(this.overlayRef.overlayElement, 'position', 'absolute');
      this.renderer.setStyle(this.overlayRef.overlayElement, 'pointer-events', 'none');
      this.renderer.setStyle(this.overlayRef.overlayElement, 'z-index', 'none');
    }

    const portal = new ComponentPortal(XDragOverlayComponent, viewContainerRef);
    this.componentRef = this.overlayRef.attach(portal);
    this.componentRef.setInput('icon', params.icon);
    this.componentRef.setInput('title', params.title);
    this.componentRef.setInput('description', params.description);

    if (this.overlayRef && this.overlayRef.overlayElement) {
      if (!isBodyOrWindow) {
        container.appendChild(this.overlayRef.overlayElement);
      }
    }
  }

  removeOverlay(container: HTMLElement): void {
    if (this.overlayRef) {
      const resizeObserver = (this.overlayRef as any).resizeObserver;
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
      if (this.overlayRef.overlayElement && this.overlayRef.overlayElement.parentNode) {
        this.overlayRef.overlayElement.parentNode.removeChild(this.overlayRef.overlayElement);
      }
      this.renderer.setStyle(container, 'position', this.containerPosition);
      this.overlayRef.dispose();
      this.overlayRef = null;
      this.componentRef = null;
    }
  }
}
