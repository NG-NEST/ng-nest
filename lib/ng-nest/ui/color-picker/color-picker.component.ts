import { XColorPickerPortalComponent } from "./color-picker-portal.component";
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
  SimpleChanges,
  OnChanges,
  ViewContainerRef,
  ViewChild,
  Inject,
  Output,
  EventEmitter
} from "@angular/core";
import { XColorPickerPrefix, XColorPickerInput, XColorPickerNode, XColorPickerPortal } from "./color-picker.type";
import {
  fillDefault,
  XValueAccessor,
  XControlValueAccessor,
  XData,
  XIsEmpty,
  XDataConvert,
  XIsObservable,
  XToDataConvert,
  removeNgTag
} from "@ng-nest/ui/core";
import { XInputComponent } from "@ng-nest/ui/input";
import { DOCUMENT } from "@angular/common";
import { map } from "rxjs/operators";

@Component({
  selector: "x-color-picker",
  templateUrl: "./color-picker.component.html",
  styleUrls: ["./color-picker.component.scss"],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [XValueAccessor(XColorPickerComponent)]
})
export class XColorPickerComponent extends XControlValueAccessor implements OnInit, OnChanges {
  @ViewChild("colorPicker", { static: true }) colorPicker: ElementRef;
  @ViewChild("inputCom", { static: true }) inputCom: XInputComponent;

  get getRequired() {
    return this.required && XIsEmpty(this.value);
  }

  writeValue(value: any) {
    this.value = value;
    this.displayValue = value;
    this.valueChange.next(this.value);
    this.cdr.detectChanges();
  }

  readonly: boolean = true;
  clearable: boolean = false;
  enter: boolean = false;
  displayValue: any = "";
  datas: XColorPickerNode[] = [];
  nodes: XColorPickerNode[] = [];
  portal: XPortalOverlayRef;
  icon: string = "fto-chevron-down";
  box: DOMRect;
  protalHeight: number;
  maxNodes: number = 6;
  protalTobottom: boolean = true;
  scrollFunction: Function;
  resizeFunction: Function;
  private _default: XColorPickerInput = {};
  private data$: Subscription | null = null;
  valueChange: Subject<any> = new Subject();
  dataChange: Subject<any> = new Subject();

  constructor(
    public renderer: Renderer2,
    private elementRef: ElementRef,
    private cdr: ChangeDetectorRef,
    private portalService: XPortalService,
    private viewContainerRef: ViewContainerRef,
    @Inject(DOCUMENT) private doc: any
  ) {
    super(renderer);
    this.renderer.addClass(this.elementRef.nativeElement, XColorPickerPrefix);
  }

  ngOnInit() {
    fillDefault(this, this._default);
    this.setFlex(this.colorPicker.nativeElement, this.justify, this.align, this.direction);
    // removeNgTag(this.elementRef.nativeElement);
  }

  ngAfterViewInit() {
    this.setPortal();
  }

  ngOnChanges(changes: SimpleChanges): void {
    let dataChange = changes.data;
    if (dataChange && dataChange.currentValue !== dataChange.previousValue) {
      // this.setData();
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

  change() {
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

  clearEmit() {
    this.value = "";
    this.displayValue = "";
    this.mleave();
    this.valueChange.next(this.value);
    if (this.onChange) this.onChange(this.value);
  }

  portalAttached() {
    return this.portal && this.portal.overlayRef.hasAttached();
  }

  closePortal() {
    if (this.portalAttached()) {
      this.portal.overlayRef.dispose();
      this.removeListen();
      return true;
    }
    return false;
  }

  showPortal(event: Event) {
    if (this.disabled) return;
    if (this.closePortal()) return;
    this.portal = this.portalService.create({
      content: XColorPickerPortalComponent,
      viewContainerRef: this.viewContainerRef,
      injector: this.portalService.createInjector(
        {
          datas: this.datas,
          nodes: this.nodes,
          value: this.value,
          valueChange: this.valueChange,
          closePortal: () => this.closePortal(),
          nodeEmit: node => this.nodeClick(node)
        },
        XColorPickerPortal
      ),
      overlayConfig: {
        backdropClass: "",
        positionStrategy: this.setPositionStrategy()
      }
    });
    this.addListen();
  }

  nodeClick(color: string) {
    this.value = color;
    this.displayValue = color;
    if (this.onChange) this.onChange(this.value);
  }

  setPositionStrategy() {
    this.box = this.inputCom.input.nativeElement.getBoundingClientRect();
    this.protalTobottom = this.doc.documentElement.clientHeight - this.box.top - this.box.height > this.protalHeight;
    return this.portalService.setPositionStrategy(
      this.inputCom.input,
      this.protalTobottom ? "bottom-start" : "top-start"
    );
  }

  setPortal() {
    if (!this.inputCom.input) return;
    this.box = this.inputCom.input.nativeElement.getBoundingClientRect();
    if (this.box && this.nodes.length > 0) {
      this.protalHeight = this.box.height * (this.nodes.length > this.maxNodes ? this.maxNodes : this.nodes.length);
    }
    this.protalHeight = 300;
    if (this.portalAttached()) {
      this.portal.overlayRef.updatePositionStrategy(this.setPositionStrategy());
    }
  }
}
