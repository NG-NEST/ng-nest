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
  Input,
  ViewContainerRef,
  ViewChild,
  Output,
  EventEmitter
} from '@angular/core';
import { XDropdownPrefix, XDropdownNode, XDropdownTrigger } from './dropdown.type';
import {
  XClassMap,
  XDataConvert,
  XData,
  XIsChange,
  XIsObservable,
  XToDataConvert,
  XPlace,
  XInputBoolean,
  XIsEmpty
} from '@ng-nest/ui/core';
import { Subject, Observable } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { XPortalOverlayRef, XPortalService } from '@ng-nest/ui/portal';
import { Overlay } from '@angular/cdk/overlay';
import { XDropdownPortalComponent } from './dropdown-portal.component';

@Component({
  selector: `${XDropdownPrefix}`,
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XDropdownComponent implements OnInit, OnChanges {
  @Input() @XDataConvert() data?: XData<XDropdownNode[]>;
  @Input() trigger: XDropdownTrigger = 'hover';
  @Input() placement: XPlace = 'bottom-start';
  @Input() @XInputBoolean() disabled?: boolean;
  @Input() @XInputBoolean() children?: boolean;
  @Output() nodeClick = new EventEmitter<XDropdownNode>();
  @ViewChild('dropdown', { static: true }) dropdown: ElementRef;
  datas: XDropdownNode[] = [];
  nodes: XDropdownNode[] = [];
  portal: XPortalOverlayRef;
  timeoutHide: any;
  visible: boolean = false;
  classMap: XClassMap = {};
  private unSubject = new Subject();

  constructor(
    public renderer: Renderer2,
    public elementRef: ElementRef,
    public cdr: ChangeDetectorRef,
    private portalService: XPortalService,
    private viewContainerRef: ViewContainerRef,
    private overlay: Overlay
  ) {}

  ngOnInit() {
    this.setClassMap();
  }

  ngOnChanges(changes: SimpleChanges) {
    XIsChange(changes.data) && this.setData();
  }

  ngOnDestroy(): void {
    this.unSubject.next();
    this.unSubject.unsubscribe();
  }

  onEnter() {
    if (this.disabled || this.trigger === 'click') return;
    if (this.timeoutHide) clearTimeout(this.timeoutHide);
    if (!this.portal || (this.portal && !this.portal.overlayRef.hasAttached())) {
      this.visible = true;
      this.createPortal();
      this.cdr.detectChanges();
    }
  }

  onLeave() {
    if (this.disabled || this.trigger === 'click') return;
    if (this.portal?.overlayRef.hasAttached()) {
      this.timeoutHide = setTimeout(() => {
        this.visible = false;
        this.portal.overlayRef.dispose();
        this.cdr.detectChanges();
      });
    }
  }

  showPortal() {
    if (this.disabled || this.trigger === 'hover' || this.closePortal()) return;
    this.createPortal();
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
    this.portal.componentRef.instance.data = this.nodes;
    this.portal.componentRef.instance.trigger = this.trigger;
    this.portal.componentRef.instance.close = () => this.closePortal();
    this.portal.componentRef.instance.nodeEmit = (node: XDropdownNode) => this.nodeClick.emit(node);
    this.portal.componentRef.instance.portalHover = (hover: boolean) => this.portalHover(hover);
    this.portal.componentRef.changeDetectorRef.detectChanges();
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

  setClassMap() {
    // this.classMap[`${XDropdownPrefix}-${this.shadow}`] = this.shadow ? true : false;
  }

  private setData() {
    if (typeof this.data === 'undefined') return;
    if (XIsObservable(this.data)) {
      (this.data as Observable<any>)
        .pipe(
          map(x => XToDataConvert(x)),
          takeUntil(this.unSubject)
        )
        .subscribe(x => {
          this.setDataChange(x);
        });
    } else {
      this.setDataChange(this.data as XDropdownNode[]);
    }
  }

  private setDataChange(value: XDropdownNode[]) {
    this.datas = value;
    if (!this.children) {
      let getChildren = (node: XDropdownNode, level: number) => {
        node.level = level;
        node.children = value.filter(y => y.pid === node.id);
        node.leaf = node.children.length > 0;
        if (node.leaf) node.children.map(y => getChildren(y, level + 1));
        return node;
      };
      this.nodes = value.filter(x => XIsEmpty(x.pid)).map(x => getChildren(x, 0));
    } else {
      this.nodes = value;
    }
    this.cdr.detectChanges();
  }
}
