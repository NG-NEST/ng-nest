import { XPortalService } from "@ng-nest/ui/portal";
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
  XData
} from "@ng-nest/ui/core";
import { Overlay } from "@angular/cdk/overlay";
import { XInputComponent } from "../input";

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
  @Input() required?: boolean | string;
  @ViewChild("portalTpl", { static: true }) portalTpl: TemplateRef<any>;
  @ViewChild("inputCom", { static: true }) inputCom: XInputComponent;
  private _default: XSelectInput = {};

  private _value: any = "";
  public get value(): any {
    return this._value;
  }
  public set value(value: any) {
    this._value = value;
    this.cdr.detectChanges();
  }

  displayValue: any = "";
  selectNodes: XSelectNode[] = [];
  private data$: Subscription | null = null;

  @HostBinding(`class.x-disabled`) get getDisabled() {
    return this.disabled;
  }

  @HostBinding(`class.x-required`) get getRequired() {
    return this.required || this.required === "";
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
    this.setDisabled();
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
    this.cdr.detectChanges();
  }

  change() {
    if (this.onChange) this.onChange(this.value);
  }

  portal() {
    let portal = this.portalService.create({
      content: this.portalTpl,
      viewContainerRef: this.viewContainerRef,
      context: { nodes: this.selectNodes },
      overlayConfig: {
        hasBackdrop: true,
        panelClass: "x-select-portal",
        backdropClass: "",
        positionStrategy: this.overlay
          .position()
          .connectedTo(
            this.inputCom.elementRef,
            { originX: "start", originY: "bottom" },
            { overlayX: "start", overlayY: "top" }
          )
      }
    });
    portal.overlayRef.backdropClick().subscribe(() => portal.overlayRef.detach());
  }

  setDisabled() {
    this.disabled = this.disabled || this.disabled === "" ? true : false;
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
