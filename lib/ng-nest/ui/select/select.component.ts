import { XIsObservable } from "./../core/interfaces/data.type";
import { Subscription, Subject, Observable } from "rxjs";
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
  TemplateRef,
  Inject
} from "@angular/core";
import { XSelectPrefix, XSelectInput, XSelectNode, XSelectPortal } from "./select.type";
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
  XToDataConvert
} from "@ng-nest/ui/core";
import { XPortalService, XPortalOverlayRef } from "@ng-nest/ui/portal";
import { XInputComponent } from "@ng-nest/ui/input";
import { DOCUMENT } from "@angular/common";
import { XSelectPortalComponent } from "./select-portal.component";
import { map } from "rxjs/operators";

@Component({
  selector: "x-select",
  templateUrl: "./select.component.html",
  styleUrls: ["./select.component.scss"],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [XValueAccessor(XSelectComponent)]
})
export class XSelectComponent extends XControlValueAccessor implements OnInit, OnChanges {
  @Input() @XDataConvert() data?: XData<XSelectNode[]>;
  @Input() justify?: XJustify;
  @Input() align?: XAlign;
  @Input() direction?: XDirection;
  @Input() label: string = "";
  @Input() placeholder: string = "";
  @Input() @XInputBoolean() async?: boolean;
  @Input() @XInputBoolean() required?: boolean;
  @ViewChild("portalTpl", { static: true }) portalTpl: TemplateRef<any>;
  @ViewChild("inputCom", { static: true }) inputCom: XInputComponent;

  writeValue(value: any) {
    this.value = value;
    this.setDisplayValue();
    if (this._required) {
      this.required = XIsEmpty(value);
    }
    this.valueChange.next(this.value);
    this.cdr.detectChanges();
  }

  readonly: boolean = true;
  clearable: boolean = false;
  enter: boolean = false;
  displayValue: any = "";
  nodes: XSelectNode[] = [];
  portal: XPortalOverlayRef;
  icon: string = "fto-chevron-down";
  iconSpin: boolean = false;
  box: DOMRect;
  protalHeight: number;
  maxNodes: number = 6;
  protalTobottom: boolean = true;
  asyncLoading = false;
  scrollFunction: Function;
  resizeFunction: Function;
  private _default: XSelectInput = {};
  private _required: boolean = false;
  private data$: Subscription | null = null;
  valueChange: Subject<any> = new Subject();

  @HostBinding(`class.x-disabled`) get getDisabled() {
    return this.disabled;
  }

  @HostBinding(`class.x-required`) get getRequired() {
    return this.required;
  }

  @HostBinding(`class.x-select-flex`) get getFlex() {
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
    this.renderer.addClass(this.elementRef.nativeElement, XSelectPrefix);
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
      if (!this.async) {
        this.data$ && this.data$.unsubscribe();
        this.data$ = (this.data as Observable<any>).pipe(map(x => XToDataConvert(x))).subscribe(x => {
          this.setDataChange(x);
        });
      }
    } else {
      this.setDataChange(this.data as XSelectNode[]);
    }
  }

  private setDataChange(value: XSelectNode[]) {
    this.nodes = value;
    this.setPortal();
    this.setDisplayValue();
    this.cdr.detectChanges();
  }

  change(event: Event) {
    // if (this.onChange) this.onChange(this.value);
  }

  menter() {
    if (this.disabled) return;
    this.enter = true;
    if (!XIsEmpty(this.displayValue)) {
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
  }

  setDisplayValue() {
    if (this.nodes.length > 0) {
      let node = this.nodes.find(x => x.value === this.value);
      this.displayValue = node ? node.label : "";
    }
  }

  showPortal() {
    if (this.disabled) return;
    if (this.async && XIsObservable(this.data) && this.nodes.length === 0) {
      this.data$ && this.data$.unsubscribe();
      this.icon = "fto-loader";
      this.iconSpin = true;
      this.cdr.detectChanges();
      this.data$ = (this.data as Observable<any>).pipe(map(x => XToDataConvert(x))).subscribe(x => {
        this.setDataChange(x);
        this.createPortal();
        this.icon = "fto-chevron-down";
        this.iconSpin = false;
        this.cdr.detectChanges();
      });
    } else {
      this.createPortal();
    }
  }

  createPortal() {
    this.nodes.filter(x => x.selected).map(x => (x.selected = false));

    this.box = this.inputCom.elementRef.nativeElement.getBoundingClientRect();
    this.portal = this.portalService.create({
      content: XSelectPortalComponent,
      viewContainerRef: this.viewContainerRef,
      injector: this.portalService.createInjector(
        { data: this.nodes, value: this.value, valueChange: this.valueChange, nodeEmit: node => this.nodeClick(node) },
        XSelectPortal
      ),
      overlayConfig: {
        hasBackdrop: true,
        backdropClass: "",
        width: this.box.width,
        positionStrategy: this.setPositionStrategy()
      }
    });
    this.portal.overlayRef.backdropClick().subscribe(() => {
      this.portal.overlayRef.detach();
      this.removeListen();
    });
    this.addListen();
  }

  nodeClick(node: XSelectNode) {
    event.preventDefault();
    if (node.disabled) return;
    this.displayValue = node.label;
    this.value = node.value;
    if (this.onChange) this.onChange(this.value);
    if (this.portal) this.portal.overlayRef.detach();
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
    this.renderer.addClass(this.elementRef.nativeElement, `${XSelectPrefix}-justity-${this.justify}`);
  }

  setAlign() {
    if (!this.align) return;
    this.renderer.addClass(this.elementRef.nativeElement, `${XSelectPrefix}-align-${this.align}`);
  }

  setDirection() {
    if (!this.direction) return;
    this.renderer.addClass(this.elementRef.nativeElement, `${XSelectPrefix}-direction-${this.direction}`);
  }
}
