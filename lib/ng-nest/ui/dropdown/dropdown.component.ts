import {
  Component,
  ViewEncapsulation,
  Renderer2,
  ElementRef,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  SimpleChanges,
  OnChanges,
  ViewContainerRef,
  ViewChild
} from '@angular/core';
import { XDropdownPrefix, XDropdownNode, XDropdownProperty } from './dropdown.property';
import { XIsChange, XIsEmpty, XSetData, XGetChildren } from '@ng-nest/ui/core';
import { Subject } from 'rxjs';
import { XPortalOverlayRef, XPortalService } from '@ng-nest/ui/portal';
import { XDropdownPortalComponent } from './dropdown-portal.component';

@Component({
  selector: `${XDropdownPrefix}`,
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XDropdownComponent extends XDropdownProperty implements OnChanges {
  @ViewChild('dropdown', { static: true }) dropdown: ElementRef;
  datas: XDropdownNode[] = [];
  nodes: XDropdownNode[] = [];
  portal: XPortalOverlayRef<XDropdownPortalComponent>;
  timeoutHide: any;
  visible: boolean = false;
  private _unSubject = new Subject<void>();

  constructor(
    public renderer: Renderer2,
    public elementRef: ElementRef,
    public cdr: ChangeDetectorRef,
    private portalService: XPortalService,
    private viewContainerRef: ViewContainerRef
  ) {
    super();
  }

  ngOnChanges(changes: SimpleChanges) {
    XIsChange(changes.data) && this.setData();
  }

  ngOnDestroy(): void {
    this._unSubject.next();
    this._unSubject.unsubscribe();
  }

  onEnter() {
    if (this.disabled || this.trigger === 'click') return;
    if (this.timeoutHide) clearTimeout(this.timeoutHide);
    if (!this.portal || (this.portal && !this.portal?.overlayRef?.hasAttached())) {
      this.visible = true;
      this.createPortal();
      this.cdr.detectChanges();
    }
  }

  onLeave() {
    if (this.disabled || this.trigger === 'click') return;
    if (this.portal?.overlayRef?.hasAttached()) {
      this.timeoutHide = setTimeout(() => {
        this.visible = false;
        this.portal?.overlayRef?.dispose();
        this.cdr.detectChanges();
      });
    }
  }

  showPortal() {
    if (this.disabled || this.trigger === 'hover' || this.closePortal()) return;
    this.createPortal();
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
      data: this.nodes,
      trigger: this.trigger,
      close: () => this.closePortal(),
      nodeEmit: (node: XDropdownNode) => this.nodeClick.emit(node),
      portalHover: (hover: boolean) => this.portalHover(hover)
    });
    componentRef.changeDetectorRef.detectChanges();
  }

  portalHover(hover: boolean) {
    if (this.timeoutHide && hover) {
      clearTimeout(this.timeoutHide);
    } else {
      this.onLeave();
    }
  }

  setPlacement() {
    return this.portalService.setPlacement(this.dropdown, this.placement, 'bottom-start', 'top-start', 'bottom-end', 'top-end');
  }

  private setData() {
    XSetData<XDropdownNode>(this.data, this._unSubject).subscribe((x) => {
      this.datas = x;
      if (!this.children) {
        this.nodes = x.filter((y) => XIsEmpty(y.pid)).map((y) => XGetChildren<XDropdownNode>(x, y, 0));
      }
      this.cdr.detectChanges();
    });
  }
}
