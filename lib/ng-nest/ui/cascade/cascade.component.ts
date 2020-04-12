import { XCascadePortalComponent } from './cascade-portal.component';
import { Subject } from 'rxjs';
import {
  Component,
  OnInit,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Renderer2,
  ElementRef,
  SimpleChanges,
  OnChanges,
  ViewContainerRef,
  ViewChild
} from '@angular/core';
import { XCascadePrefix, XCascadeNode, XCascadeProperty } from './cascade.property';
import { XValueAccessor, XIsEmpty, XIsChange, XSetData, XGetChildren } from '@ng-nest/ui/core';
import { XPortalService, XPortalOverlayRef } from '@ng-nest/ui/portal';
import { XInputComponent } from '@ng-nest/ui/input';

@Component({
  selector: 'x-cascade',
  templateUrl: './cascade.component.html',
  styleUrls: ['./cascade.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [XValueAccessor(XCascadeComponent)]
})
export class XCascadeComponent extends XCascadeProperty implements OnInit, OnChanges {
  @ViewChild('cascade', { static: true }) cascade: ElementRef;
  @ViewChild('inputCom', { static: true }) inputCom: XInputComponent;

  get getRequired() {
    return this.required && XIsEmpty(this.value);
  }

  writeValue(value: any) {
    this.value = value;
    this.setDisplayValue();
    this.valueChange.next(this.value);
    this.cdr.detectChanges();
  }

  readonly: boolean = true;
  clearable: boolean = false;
  enter: boolean = false;
  displayValue: any = '';
  datas: XCascadeNode[] = [];
  nodes: XCascadeNode[] = [];
  portal: XPortalOverlayRef<XCascadePortalComponent>;
  icon: string = 'fto-chevron-down';
  box: DOMRect;
  protalHeight: number;
  maxNodes: number = 6;
  protalTobottom: boolean = true;
  scrollFunction: Function;
  resizeFunction: Function;
  private _unSubject = new Subject<void>();
  valueChange: Subject<any> = new Subject();
  dataChange: Subject<any> = new Subject();

  constructor(
    public renderer: Renderer2,
    private elementRef: ElementRef,
    private cdr: ChangeDetectorRef,
    private portalService: XPortalService,
    private viewContainerRef: ViewContainerRef
  ) {
    super(renderer);
    this.renderer.addClass(this.elementRef.nativeElement, XCascadePrefix);
  }

  ngOnInit() {
    this.setFlex(this.cascade.nativeElement, this.justify, this.align, this.direction);
  }

  ngAfterViewInit() {
    this.setPortal();
  }

  ngOnChanges(changes: SimpleChanges): void {
    XIsChange(changes.data) && this.setData();
  }

  ngOnDestroy(): void {
    this._unSubject.next();
    this._unSubject.unsubscribe();
    this.removeListen();
  }

  removeListen() {
    this.scrollFunction?.();
    this.resizeFunction?.();
    this.cdr.markForCheck();
  }

  private setData() {
    XSetData<XCascadeNode>(this.data, this._unSubject).subscribe((x) => {
      this.datas = x;
      this.nodes = x.filter((y) => XIsEmpty(y.pid)).map((y) => XGetChildren<XCascadeNode>(x, y, 0));
      this.setPortal();
      this.cdr.detectChanges();
    });
  }

  menter() {
    if (this.disabled) return;
    this.enter = true;
    if (!XIsEmpty(this.value)) {
      this.icon = '';
      this.clearable = true;
      this.cdr.detectChanges();
    }
  }

  mleave() {
    if (this.disabled) return;
    this.enter = false;
    if (this.clearable) {
      this.icon = 'fto-chevron-down';
      this.clearable = false;
      this.cdr.detectChanges();
    }
  }

  clearEmit() {
    this.value = '';
    this.displayValue = '';
    this.mleave();
    this.valueChange.next(this.value);
    if (this.onChange) this.onChange(this.value);
  }

  portalAttached() {
    return this.portal?.overlayRef?.hasAttached();
  }

  closePortal() {
    if (this.portalAttached()) {
      this.portal?.overlayRef?.dispose();
      this.removeListen();
      return true;
    }
    return false;
  }

  showPortal() {
    if (this.disabled) return;
    if (this.closePortal()) return;
    this.portal = this.portalService.attach({
      content: XCascadePortalComponent,
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
      datas: this.datas,
      nodes: this.nodes,
      value: this.value,
      valueChange: this.valueChange,
      closePortal: () => this.closePortal(),
      nodeEmit: (node: { node: XCascadeNode; label: string }) => this.onNodeClick(node)
    });
    componentRef.changeDetectorRef.detectChanges();
  }

  onNodeClick(selected: { node: XCascadeNode; label: string }) {
    this.value = selected.node.id;
    this.displayValue = selected.label;
    this.closePortal();
    if (this.onChange) this.onChange(this.value);
    this.nodeClick.emit(selected);
  }

  setDisplayValue() {
    let node = this.datas.find((x) => x.id === this.value) as XCascadeNode;
    if (typeof node === 'undefined') {
      this.displayValue = '';
      return;
    } else {
      let selecteds = [node];
      while (!XIsEmpty(node.pid)) {
        node = this.datas.find((x) => x.id === node.pid) as XCascadeNode;
        selecteds = [node, ...selecteds];
      }
      this.displayValue = selecteds.map((x) => x.label).join(` / `);
    }
  }

  setPlacement() {
    return this.portalService.setPlacement(this.inputCom.input, 'bottom-start', 'bottom-end', 'top-start', 'top-end');
  }

  setPortal() {
    this.portalAttached() && this.portal?.overlayRef?.updatePositionStrategy(this.setPlacement());
  }
}
