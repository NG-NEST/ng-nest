import {
  Component,
  ViewEncapsulation,
  Renderer2,
  ElementRef,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  OnDestroy,
  HostListener,
  ViewContainerRef
} from '@angular/core';
import { XDropdownPortalPrefix, XDropdownNode, XDropdownTrigger } from './dropdown.property';
import { XPortalOverlayRef, XPortalService } from '@ng-nest/ui/portal';

@Component({
  selector: `${XDropdownPortalPrefix}`,
  templateUrl: './dropdown-portal.component.html',
  styleUrls: ['./dropdown-portal.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XDropdownPortalComponent implements OnDestroy {
  data: XDropdownNode[];
  trigger: XDropdownTrigger;
  close: Function;
  nodeEmit: Function;
  docClickFunction: Function;
  portalHover: Function;
  portal: XPortalOverlayRef<XDropdownPortalComponent>;
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
    private viewContainerRef: ViewContainerRef
  ) {}

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
    return this.portal?.overlayRef?.hasAttached();
  }

  closePortal() {
    if (this.portalAttached()) {
      this.portal?.overlayRef?.dispose();
      return true;
    }
    return false;
  }

  createPortal() {
    this.portal = this.portalService.attach({
      content: XDropdownPortalComponent,
      viewContainerRef: this.viewContainerRef,
      overlayConfig: {
        backdropClass: '',
        positionStrategy: this.setPlacement()
      }
    });
    this.setInstance();
  }

  setInstance() {
    let componentRef = this.portal?.componentRef;
    if (!componentRef) return;
    Object.assign(componentRef.instance, {
      data: this.node?.children,
      close: () => this.closePortal(),
      nodeEmit: (node: XDropdownNode) => this.nodeClick(node),
      portalHover: (hover: boolean) => this.hover(hover)
    });
    componentRef.changeDetectorRef.detectChanges();
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
    return this.portalService.setPlacement(new ElementRef(this.node?.event?.target), 'right-start', 'right-end', 'left-start', 'left-end');
  }

  onEnter(node: XDropdownNode) {
    if (!node.leaf || node.disabled) return;
    if (this.timeoutHide) clearTimeout(this.timeoutHide);
    if (this.portalAttached() && this.node?.id !== node.id) {
      this.portal?.overlayRef?.dispose();
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
        this.portal?.overlayRef?.dispose();
      });
    }
  }
}
