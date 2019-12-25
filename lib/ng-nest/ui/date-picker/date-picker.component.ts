import { XDatePickerPortalComponent } from "./date-picker-portal.component";
import { XPortalService, XPortalOverlayRef } from "@ng-nest/ui/portal";
import { Subscription, Subject } from "rxjs";
import {
  Component,
  OnInit,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Renderer2,
  ElementRef,
  Input,
  OnChanges,
  ViewContainerRef,
  ViewChild,
  EventEmitter,
  Output,
  Inject,
  SimpleChanges
} from "@angular/core";
import { XDatePickerPrefix, XDatePickerPortal, XDatePickerInput, XDatePickerType } from "./date-picker.type";
import { fillDefault, XValueAccessor, XControlValueAccessor, XIsEmpty, XIsDate, XIsNumber } from "@ng-nest/ui/core";
import { XInputComponent } from "@ng-nest/ui/input";
import { DOCUMENT, DatePipe } from "@angular/common";

@Component({
  selector: "x-date-picker",
  templateUrl: "./date-picker.component.html",
  styleUrls: ["./date-picker.component.scss"],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [XValueAccessor(XDatePickerComponent), DatePipe]
})
export class XDatePickerComponent extends XControlValueAccessor implements OnInit, OnChanges {
  @Input() type: XDatePickerType = "date";
  @Input() format: string = "yyyy-MM-dd";
  @ViewChild("datePicker", { static: true }) datePicker: ElementRef;
  @ViewChild("inputCom", { static: true }) inputCom: XInputComponent;
  @Output() nodeEmit?: EventEmitter<number> = new EventEmitter<number>();

  get getRequired() {
    return this.required && XIsEmpty(this.value);
  }

  writeValue(value: any) {
    if (XIsDate(value)) this.value = value.getTime();
    else if (XIsNumber(value)) this.value = value;
    else if (XIsEmpty(value)) this.value = "";
    this.setDisplayValue();
    this.valueChange.next(this.value);
    this.cdr.detectChanges();
  }

  readonly: boolean = true;
  clearable: boolean = false;
  enter: boolean = false;
  displayValue: any = "";
  portal: XPortalOverlayRef;
  icon: string = "fto-calendar";
  box: DOMRect;
  protalHeight: number;
  maxNodes: number = 6;
  protalTobottom: boolean = true;
  scrollFunction: Function;
  resizeFunction: Function;
  private _default: XDatePickerInput = {};
  private data$: Subscription | null = null;
  valueChange: Subject<any> = new Subject();
  dataChange: Subject<any> = new Subject();

  constructor(
    public renderer: Renderer2,
    private elementRef: ElementRef,
    private cdr: ChangeDetectorRef,
    private portalService: XPortalService,
    private viewContainerRef: ViewContainerRef,
    private datePipe: DatePipe,
    @Inject(DOCUMENT) private doc: any
  ) {
    super(renderer);
    this.renderer.addClass(this.elementRef.nativeElement, XDatePickerPrefix);
  }

  ngOnInit() {
    fillDefault(this, this._default);
    this.setFlex(this.datePicker.nativeElement, this.justify, this.align, this.direction);
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
      this.icon = "fto-calendar";
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
      content: XDatePickerPortalComponent,
      viewContainerRef: this.viewContainerRef,
      injector: this.portalService.createInjector(
        {
          type: this.type,
          value: this.value,
          valueChange: this.valueChange,
          closePortal: () => this.closePortal(),
          nodeEmit: node => this.nodeClick(node)
        },
        XDatePickerPortal
      ),
      overlayConfig: {
        backdropClass: "",
        positionStrategy: this.setPositionStrategy()
      }
    });
    this.addListen();
  }

  nodeClick(date: Date) {
    this.value = date.getTime();
    this.setDisplayValue();
    this.closePortal();
    if (this.onChange) this.onChange(this.value);
    this.nodeEmit.emit(this.value);
  }

  setDisplayValue() {
    this.displayValue = this.datePipe.transform(this.value, this.format);
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
    this.protalHeight = 300;
    // if (this.box && this.nodes.length > 0) {
    //   this.protalHeight = this.box.height * (this.nodes.length > this.maxNodes ? this.maxNodes : this.nodes.length);
    // }
    if (this.portalAttached()) {
      this.portal.overlayRef.updatePositionStrategy(this.setPositionStrategy());
    }
  }
}
