import { XPortalService, XPortalOverlayRef } from "@ng-nest/ui/portal";
import { Subscription } from "rxjs";
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
  TemplateRef
} from "@angular/core";
import { XSelectPrefix, XSelectInput, XSelectNode } from "./select.type";
import {
  fillDefault,
  XValueAccessor,
  XControlValueAccessor,
  XJustify,
  XAlign,
  XDirection,
  XData,
  isEmpty,
  InputBoolean
} from "@ng-nest/ui/core";
import { Overlay, ConnectedPositionStrategy } from "@angular/cdk/overlay";
import { XInputComponent } from "@ng-nest/ui/input";

@Component({
  selector: "x-select",
  templateUrl: "./select.component.html",
  styleUrls: ["./style/index.scss"],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [XValueAccessor(XSelectComponent)]
})
export class XSelectComponent extends XControlValueAccessor implements OnInit, OnChanges {
  @Input() data?: XData<XSelectNode[]>;
  @Input() justify?: XJustify;
  @Input() align?: XAlign;
  @Input() direction?: XDirection;
  @Input() label: string = "";
  @Input() placeholder: string = "";
  @Input() @InputBoolean() required?: boolean;
  @ViewChild("portalTpl", { static: true }) portalTpl: TemplateRef<any>;
  @ViewChild("inputCom", { static: true }) inputCom: XInputComponent;

  private _value: any = "";
  public get value(): any {
    return this._value;
  }
  public set value(value: any) {
    console.log(value);
    this._value = value;
    this.setDisplayValue();
    if (this._required) {
      this.required = isEmpty(value);
    }
    this.cdr.detectChanges();
  }

  readonly: boolean = true;
  clearable: boolean = false;
  enter: boolean = false;
  displayValue: any = "";
  selectNodes: XSelectNode[] = [];
  portal: XPortalOverlayRef;
  icon: string = "fto-chevron-down";
  private _default: XSelectInput = {};
  private _required: boolean = false;
  private data$: Subscription | null = null;

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
    private overlay: Overlay,
    private viewContainerRef: ViewContainerRef
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

  ngOnChanges(changes: SimpleChanges): void {
    let dataChange = changes.data;
    if (dataChange && dataChange.currentValue !== dataChange.previousValue) {
      this.setData();
    }
  }

  ngOnDestroy(): void {
    if (this.data$) this.data$.unsubscribe();
  }

  private setData() {
    if (typeof this.data === "undefined") return;
    if (this.data instanceof Array) {
      this.setDataChange(this.data);
    } else {
      if (this.data$) this.data$.unsubscribe();
      this.data$ = this.data.subscribe(x => {
        this.setDataChange(x);
      });
    }
  }

  private setDataChange(value: XSelectNode[]) {
    this.selectNodes = value;
    this.setDisplayValue();
    this.cdr.detectChanges();
  }

  change(event: Event) {
    // if (this.onChange) this.onChange(this.value);
  }

  menter() {
    this.enter = true;
    if (!isEmpty(this.value)) {
      this.icon = "";
      this.clearable = true;
      this.cdr.detectChanges();
    }
  }

  mleave() {
    this.enter = false;
    if (this.clearable) {
      this.icon = "fto-chevron-down";
      this.clearable = false;
      this.cdr.detectChanges();
    }
  }

  clearEmit() {
    this.value = "";
    this.mleave();
  }

  setDisplayValue() {
    if (this.selectNodes.length > 0) {
      let node = this.selectNodes.find(x => x.key === this.value);
      this.displayValue = node ? node.label : "";
    }
  }

  showPortal() {
    if (this.disabled) return;
    let box = this.elementRef.nativeElement.getBoundingClientRect();
    let connected: ConnectedPositionStrategy = this.overlay
      .position()
      .connectedTo(
        this.inputCom.elementRef,
        { originX: "start", originY: "bottom" },
        { overlayX: "start", overlayY: "top" }
      );
    this.portal = this.portalService.create({
      content: this.portalTpl,
      viewContainerRef: this.viewContainerRef,
      context: { nodes: this.selectNodes, value: this.value },
      overlayConfig: {
        hasBackdrop: true,
        panelClass: "x-select-portal",
        backdropClass: "",
        width: box.width,
        positionStrategy: connected
      }
    });
    this.portal.overlayRef.backdropClick().subscribe(() => this.portal.overlayRef.detach());
  }

  nodeClick(event: Event, node: XSelectNode) {
    event.preventDefault();
    this.displayValue = node.label;
    this.value = node.key;
    if (this.onChange) this.onChange(this.value);
    if (this.portal) this.portal.overlayRef.detach();
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
