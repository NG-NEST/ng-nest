import {
  Component,
  OnInit,
  ViewEncapsulation,
  Renderer2,
  ElementRef,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  SimpleChanges,
  OnChanges,
  OnDestroy,
  HostListener,
  ViewContainerRef
} from '@angular/core';
import { XDropdownPortalPrefix, XDropdownNode, XDropdownTrigger } from './dropdown.type';
import { XPortalOverlayRef, XPortalService } from '@ng-nest/ui/portal';
import { Overlay } from '@angular/cdk/overlay';

@Component({
  selector: `${XDropdownPortalPrefix}`,
  templateUrl: './dropdown-portal.component.html',
  styleUrls: ['./dropdown-portal.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XDropdownPortalComponent implements OnInit, OnChanges, OnDestroy {
  data: XDropdownNode[];
  trigger: XDropdownTrigger;
  close: Function;
  nodeEmit: Function;
  docClickFunction: Function;
  portalHover: Function;
  portal: XPortalOverlayRef;
  node: XDropdownNode;
  timeoutHide: any;
  timespan = 200;

  @HostListener('mouseenter') mouseenter() {
    this.portalHover(true);
  }

  @HostListener('mouseleave') mouseleave() {
    !this.portalAttached() && this.portalHover(false);
  }

  constructor(
    public renderer: Renderer2,
    public elementRef: ElementRef,
    public cdr: ChangeDetectorRef,
    private portalService: XPortalService,
    private viewContainerRef: ViewContainerRef,
    private overlay: Overlay
  ) {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {}

  ngAfterViewInit() {
    this.trigger === 'click' &&
      setTimeout(
        () =>
          (this.docClickFunction = this.renderer.listen(document, 'click', () => {
            this.close();
          }))
      );
  }

  ngOnDestroy(): void {
    this.docClickFunction && this.docClickFunction();
  }

  nodeClick(node: XDropdownNode) {
    if (!node.leaf) this.close();
    this.nodeEmit(node);
  }

  portalAttached() {
    return this.portal?.overlayRef.hasAttached();
  }

  closePortal() {
    if (this.portalAttached()) {
      this.portal.overlayRef.dispose();
      return true;
    }
    return false;
  }

  createPortal() {
    this.portal = this.portalService.create({
      content: XDropdownPortalComponent,
      viewContainerRef: this.viewContainerRef,
      overlayConfig: {
        backdropClass: '',
        scrollStrategy: this.overlay.scrollStrategies.reposition({ autoClose: true }),
        positionStrategy: this.setPlacement()
      }
    });
    this.setInstance();
  }

  setInstance() {
    this.portal.componentRef.instance.data = this.node?.children;
    this.portal.componentRef.instance.close = () => this.closePortal();
    this.portal.componentRef.instance.nodeEmit = (node: XDropdownNode) => this.nodeClick(node);
    this.portal.componentRef.instance.portalHover = (hover: boolean) => this.hover(hover);
    this.portal.componentRef.changeDetectorRef.detectChanges();
  }

  hover(hover: boolean) {
    if (this.timeoutHide && hover) {
      clearTimeout(this.timeoutHide);
    } else {
      this.portalHover(false);
      this.onLeave();
    }
  }

  setPlacement() {
    return this.portalService.setPlacement(new ElementRef(this.node?.event.target), 'right-start', 'right-end', 'left-start', 'left-end');
  }

  onEnter(node: XDropdownNode) {
    if (!node.leaf || node.disabled) return;
    if (this.timeoutHide) clearTimeout(this.timeoutHide);
    if (this.portalAttached() && this.node?.id !== node.id) {
      this.portal.overlayRef.dispose();
    }
    this.node = node;
    if (!this.portalAttached()) {
      this.createPortal();
    }
    this.cdr.detectChanges();
  }

  onLeave() {
    if (this.portalAttached()) {
      this.timeoutHide = setTimeout(() => {
        this.portal.overlayRef.dispose();
      });
    }
  }
}
