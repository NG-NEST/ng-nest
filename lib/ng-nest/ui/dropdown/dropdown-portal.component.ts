import {
  Component,
  ViewEncapsulation,
  Renderer2,
  ElementRef,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  OnDestroy,
  HostListener,
  ViewContainerRef,
  HostBinding
} from '@angular/core';
import { XDropdownPortalPrefix, XDropdownNode, XDropdownTrigger } from './dropdown.property';
import { XPortalConnectedPosition, XPortalOverlayRef, XPortalService } from '@ng-nest/ui/portal';
import { XConnectBaseAnimation, XIsString, XPositionTopBottom } from '@ng-nest/ui/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ConnectedOverlayPositionChange, FlexibleConnectedPositionStrategy, Overlay, OverlayConfig } from '@angular/cdk/overlay';

@Component({
  selector: `${XDropdownPortalPrefix}`,
  templateUrl: './dropdown-portal.component.html',
  styleUrls: ['./dropdown-portal.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [XConnectBaseAnimation]
})
export class XDropdownPortalComponent implements OnDestroy {
  @HostBinding('@x-connect-base-animation') public placement!: XPositionTopBottom;
  @HostListener('@x-connect-base-animation.done', ['$event']) done(event: { toState: any }) {
    this.animating(false);
    event.toState === 'void' && this.destroyPortal();
  }
  @HostListener('@x-connect-base-animation.start', ['$event']) start() {
    this.animating(true);
  }
  data!: XDropdownNode[];
  trigger!: XDropdownTrigger;
  close!: Function;
  nodeEmit!: Function;
  portalHover!: Function;
  animating!: Function;
  destroyPortal!: Function;
  portal!: XPortalOverlayRef<XDropdownPortalComponent>;
  positionChange!: Subject<any>;
  portalPositionChange: Subject<any> = new Subject();
  node!: XDropdownNode;
  timeoutHide: any;
  timespan = 200;
  minWidth!: string | number;
  maxWidth!: string | number;
  minHeight!: string | number;
  maxHeight!: string | number;
  portalPlacement!: XPositionTopBottom;
  childAnimating = false;
  activatedId!: any;
  activatedIdSub!: Subject<any>;
  private _unSubject = new Subject<void>();

  get getMinWidth() {
    return XIsString(this.minWidth) ? this.minWidth : `${this.minWidth}px`;
  }
  get getMaxWidth() {
    return XIsString(this.maxWidth) ? this.maxWidth : `${this.maxWidth}px`;
  }
  get getMinHeight() {
    return XIsString(this.minHeight) ? this.minHeight : `${this.minHeight}px`;
  }
  get getMaxHeight() {
    return XIsString(this.maxHeight) ? this.maxHeight : `${this.maxHeight}px`;
  }

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
    private overlay: Overlay,
    private viewContainerRef: ViewContainerRef
  ) {}

  ngOnInit() {
    this.positionChange.pipe(takeUntil(this._unSubject)).subscribe((x) => {
      this.placement = x;
      this.cdr.detectChanges();
    });
  }

  ngAfterViewInit() {}

  ngOnDestroy(): void {
    this._unSubject.next();
    this._unSubject.unsubscribe();
  }

  nodeClick(node: XDropdownNode) {
    if (!node.leaf) {
      this.close();
      this.activatedId = node.id;
      this.activatedIdSub.next(this.activatedId);
    }
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
    const config: OverlayConfig = {
      backdropClass: '',
      panelClass: 'x-dropdown-portal-child',
      positionStrategy: this.setPlacement(),
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
      minWidth: this.minWidth
    };
    this.setPosition(config);
    this.portal = this.portalService.attach({
      content: XDropdownPortalComponent,
      viewContainerRef: this.viewContainerRef,
      overlayConfig: config
    });
    this.setInstance();
  }

  setPosition(config: OverlayConfig) {
    let position = config.positionStrategy as FlexibleConnectedPositionStrategy;
    position.positionChanges.pipe(takeUntil(this._unSubject)).subscribe((pos: ConnectedOverlayPositionChange) => {
      const place = XPortalConnectedPosition.get(pos.connectionPair) as XPositionTopBottom;
      place !== this.portalPlacement && this.portalPositionChange.next(place);
    });
  }

  setInstance() {
    let componentRef = this.portal?.componentRef;
    if (!componentRef) return;
    Object.assign(componentRef.instance, {
      data: this.node?.children,
      minWidth: this.minWidth,
      maxWidth: this.maxWidth,
      minHeight: this.minHeight,
      maxHeight: this.maxHeight,
      close: () => this.closePortal(),
      placement: this.portalPlacement,
      positionChange: this.portalPositionChange,
      activatedId: this.activatedId,
      activatedIdSub: this.activatedIdSub,
      nodeEmit: (node: XDropdownNode) => this.nodeClick(node),
      portalHover: (hover: boolean) => this.hover(hover),
      animating: (ing: boolean) => (this.childAnimating = ing)
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
    return this.portalService.setPlacement({
      elementRef: new ElementRef(this.node?.event?.target),
      placement: ['right-start', 'right-end', 'left-start', 'left-end'],
      transformOriginOn: 'x-dropdown-portal'
    });
  }

  onEnter(node: XDropdownNode) {
    if (!node.leaf || node.disabled || this.childAnimating) return;
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
