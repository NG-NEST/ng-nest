import { XCascadePortalComponent } from "./cascade-portal.component";
import { XPortalService, XPortalOverlayRef } from "@ng-nest/ui/portal";
import { Subscription, Observable, Subject } from "rxjs";
import {
  Component,
  OnInit,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Renderer2,
  ElementRef,
  Input,
  HostBinding,
  SimpleChanges,
  OnChanges,
  ViewContainerRef,
  ViewChild,
  Inject,
  Output,
  EventEmitter,
  NgZone
} from "@angular/core";
import { XCascadePrefix, XCascadeInput, XCascadeNode, XCascadePortal } from "./cascade.type";
import {
  fillDefault,
  XValueAccessor,
  XControlValueAccessor,
  XJustify,
  XAlign,
  XDirection,
  XData,
  XIsEmpty,
  XInputBoolean,
  XDataConvert,
  XIsObservable,
  XToDataConvert
} from "@ng-nest/ui/core";
import { XInputComponent } from "@ng-nest/ui/input";
import { DOCUMENT } from "@angular/common";
import { map } from "rxjs/operators";

@Component({
  selector: "x-cascade",
  templateUrl: "./cascade.component.html",
  styleUrls: ["./cascade.component.scss"],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [XValueAccessor(XCascadeComponent)]
})
export class XCascadeComponent extends XControlValueAccessor implements OnInit, OnChanges {
  @Input() @XDataConvert() data?: XData<XCascadeNode[]>;
  @Input() justify?: XJustify;
  @Input() align?: XAlign;
  @Input() direction?: XDirection;
  @Input() label: string = "";
  @Input() placeholder: string = "";
  @Input() @XInputBoolean() required?: boolean;
  // @ViewChild("portalTpl", { static: false }) portalTpl: TemplateRef<any>;
  @ViewChild("inputCom", { static: true }) inputCom: XInputComponent;
  @Output() nodeEmit?: EventEmitter<XCascadeNode> = new EventEmitter<XCascadeNode>();

  writeValue(value: any) {
    this.value = value;
    this.setDisplayValue();
    if (this._required) {
      this.required = XIsEmpty(value);
    }
    this.cdr.detectChanges();
  }

  readonly: boolean = true;
  clearable: boolean = false;
  enter: boolean = false;
  displayValue: any = "";
  datas: XCascadeNode[] = [];
  nodes: XCascadeNode[] = [];
  portal: XPortalOverlayRef;
  icon: string = "fto-chevron-down";
  box: DOMRect;
  protalHeight: number;
  maxNodes: number = 6;
  protalTobottom: boolean = true;
  scrollFunction: Function;
  resizeFunction: Function;
  private _default: XCascadeInput = {};
  private _required: boolean = false;
  private data$: Subscription | null = null;
  valueChange: Subject<any> = new Subject();
  dataChange: Subject<any> = new Subject();

  @HostBinding(`class.x-disabled`) get getDisabled() {
    return this.disabled;
  }

  @HostBinding(`class.x-required`) get getRequired() {
    return this.required;
  }

  @HostBinding(`class.x-cascade-flex`) get getFlex() {
    return this.justify || this.align || this.direction;
  }

  constructor(
    private renderer: Renderer2,
    private elementRef: ElementRef,
    private cdr: ChangeDetectorRef,
    private portalService: XPortalService,
    private viewContainerRef: ViewContainerRef,
    @Inject(DOCUMENT) private doc: any
  ) {
    super();
    this.renderer.addClass(this.elementRef.nativeElement, XCascadePrefix);
  }

  ngOnInit() {
    fillDefault(this, this._default);
    this.setRequired();
    this.setJustify();
    this.setAlign();
    this.setDirection();
  }

  ngAfterViewInit() {
    this.setPortal();
  }

  ngOnChanges(changes: SimpleChanges): void {
    let dataChange = changes.data;
    if (dataChange && dataChange.currentValue !== dataChange.previousValue) {
      this.setData();
    }
  }

  ngOnDestroy(): void {
    this.data$ && this.data$.unsubscribe();
    this.removeListen();
  }

  addListen() {
    this.scrollFunction = this.renderer.listen("window", "scroll", () => {
      this.setPortal();
    });
    this.resizeFunction = this.renderer.listen("window", "resize", () => {
      this.setPortal();
    });
  }

  removeListen() {
    this.scrollFunction && this.scrollFunction();
    this.resizeFunction && this.resizeFunction();
    this.cdr.markForCheck();
  }

  private setData() {
    if (typeof this.data === "undefined") return;
    if (XIsObservable(this.data)) {
      this.data$ && this.data$.unsubscribe();
      this.data$ = (this.data as Observable<any>).pipe(map(x => XToDataConvert(x))).subscribe(x => {
        this.setDataChange(x);
      });
    } else {
      this.setDataChange(this.data as XCascadeNode[]);
    }
  }

  private setDataChange(value: XCascadeNode[]) {
    this.datas = value;
    let getChildren = (node: XCascadeNode, level: number) => {
      node.level = level;
      node.children = value.filter(y => y.parentValue === node.value);
      node.hasChild = node.children.length > 0;
      if (node.hasChild) node.children.map(y => getChildren(y, level + 1));
      return node;
    };
    this.nodes = value.filter(x => XIsEmpty(x.parentValue)).map(x => getChildren(x, 0));
    this.setPortal();
  }

  change(event: Event) {
    // if (this.onChange) this.onChange(this.value);
  }

  menter() {
    if (this.disabled) return;
    this.enter = true;
    if (!XIsEmpty(this.value)) {
      this.icon = "";
      this.clearable = true;
      this.cdr.detectChanges();
    }
  }

  mleave() {
    if (this.disabled) return;
    this.enter = false;
    if (this.clearable) {
      this.icon = "fto-chevron-down";
      this.clearable = false;
      this.cdr.detectChanges();
    }
  }

  clearEmit(event: Event) {
    this.value = "";
    this.displayValue = "";
    this.mleave();
    if (this.onChange) this.onChange(this.value);
  }

  showPortal() {
    if (this.disabled) return;
    this.portal = this.portalService.create({
      content: XCascadePortalComponent,
      viewContainerRef: this.viewContainerRef,
      injector: this.portalService.createInjector(
        {
          datas: this.datas,
          nodes: this.nodes,
          value: this.value,
          nodeEmit: node => this.nodeClick(node)
        },
        XCascadePortal
      ),
      overlayConfig: {
        hasBackdrop: true,
        backdropClass: "",
        positionStrategy: this.setPositionStrategy()
      }
    });
    this.portal.overlayRef.backdropClick().subscribe(() => {
      this.portal.overlayRef.detach();
      this.removeListen();
    });
    this.addListen();
  }

  nodeClick(selected: { node: XCascadeNode; label: string }) {
    this.value = selected.node.value;
    this.displayValue = selected.label;
    if (this.portal) this.portal.overlayRef.detach();
    if (this.onChange) this.onChange(this.value);
    this.nodeEmit.emit(selected);
  }

  setDisplayValue() {
    let node = this.datas.find(x => x.value === this.value);
    if (!node) {
      this.displayValue = "";
      return;
    }
    let selecteds = [node];
    while (!XIsEmpty(node.parentValue)) {
      node = this.datas.find(x => x.value === node.parentValue);
      selecteds = [node, ...selecteds];
    }
    this.displayValue = selecteds.map(x => x.label).join(` / `);
  }

  setPositionStrategy() {
    this.box = this.inputCom.elementRef.nativeElement.getBoundingClientRect();
    this.protalTobottom = this.doc.documentElement.clientHeight - this.box.top - this.box.height > this.protalHeight;
    return this.portalService.setPositionStrategy(this.inputCom.elementRef, this.protalTobottom);
  }

  setPortal() {
    if (!this.inputCom) return;
    this.box = this.inputCom.elementRef.nativeElement.getBoundingClientRect();
    if (this.box && this.nodes.length > 0) {
      this.protalHeight = this.box.height * (this.nodes.length > this.maxNodes ? this.maxNodes : this.nodes.length);
    }
    if (this.portal && this.portal.overlayRef.hasAttached) {
      this.portal.overlayRef.updatePositionStrategy(this.setPositionStrategy());
    }
  }

  setRequired() {
    this._required = this.required ? true : false;
  }

  setJustify() {
    if (!this.justify) return;
    this.renderer.addClass(this.elementRef.nativeElement, `${XCascadePrefix}-justity-${this.justify}`);
  }

  setAlign() {
    if (!this.align) return;
    this.renderer.addClass(this.elementRef.nativeElement, `${XCascadePrefix}-align-${this.align}`);
  }

  setDirection() {
    if (!this.direction) return;
    this.renderer.addClass(this.elementRef.nativeElement, `${XCascadePrefix}-direction-${this.direction}`);
  }
}
