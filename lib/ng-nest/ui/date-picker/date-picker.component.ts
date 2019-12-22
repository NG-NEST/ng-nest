import { XDatePickerPortalComponent } from "./date-picker-portal.component";
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
  OnChanges,
  ViewContainerRef,
  ViewChild,
  EventEmitter,
  Output,
  Inject,
  SimpleChanges
} from "@angular/core";
import { XDatePickerPrefix, XDatePickerNode, XDatePickerPortal, XDatePickerInput } from "./date-picker.type";
import {
  fillDefault,
  XValueAccessor,
  XControlValueAccessor,
  XData,
  XIsEmpty,
  XDataConvert,
  XIsObservable,
  XToDataConvert} from "@ng-nest/ui/core";
import { XInputComponent } from "@ng-nest/ui/input";
import { map } from "rxjs/operators";
import { DOCUMENT } from "@angular/common";

@Component({
  selector: "x-date-picker",
  templateUrl: "./date-picker.component.html",
  styleUrls: ["./date-picker.component.scss"],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [XValueAccessor(XDatePickerComponent)]
})
export class XDatePickerComponent extends XControlValueAccessor implements OnInit, OnChanges {
  @Input() @XDataConvert() data?: XData<XDatePickerNode[]>;
  @ViewChild("datePicker", { static: true }) datePicker: ElementRef;
  @ViewChild("inputCom", { static: true }) inputCom: XInputComponent;
  @Output() nodeEmit?: EventEmitter<XDatePickerNode> = new EventEmitter<XDatePickerNode>();

  get getRequired() {
    return this.required && XIsEmpty(this.value);
  }

  writeValue(value: any) {
    this.value = value;
    this.setDisplayValue();
    this.cdr.detectChanges();
  }

  readonly: boolean = true;
  clearable: boolean = false;
  enter: boolean = false;
  displayValue: any = "";
  datas: XDatePickerNode[] = [];
  nodes: XDatePickerNode[] = [];
  portal: XPortalOverlayRef;
  icon: string = "fto-chevron-down";
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
      this.setDataChange(this.data as XDatePickerNode[]);
    }
  }

  private setDataChange(value: XDatePickerNode[]) {
    this.datas = value;
    let getChildren = (node: XDatePickerNode, level: number) => {
      node.level = level;
      node.children = value.filter(y => y.parentValue === node.value);
      node.hasChild = node.children.length > 0;
      if (node.hasChild) node.children.map(y => getChildren(y, level + 1));
      return node;
    };
    this.nodes = value.filter(x => XIsEmpty(x.parentValue)).map(x => getChildren(x, 0));
    this.setPortal();
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
    if (this.onChange) this.onChange(this.value);
  }

  showPortal() {
    if (this.disabled) return;
    this.portal = this.portalService.create({
      content: XDatePickerPortalComponent,
      viewContainerRef: this.viewContainerRef,
      injector: this.portalService.createInjector(
        {
          datas: this.datas,
          nodes: this.nodes,
          value: this.value,
          nodeEmit: node => this.nodeClick(node)
        },
        XDatePickerPortal
      ),
      overlayConfig: {
        hasBackdrop: true,
        backdropClass: "",
        positionStrategy: this.setPositionStrategy()
      }
    });
    this.portal.overlayRef.backdropClick().subscribe(() => {
      this.portal.overlayRef.dispose();
      this.removeListen();
    });
    this.addListen();
  }

  nodeClick(selected: { node: XDatePickerNode; label: string }) {
    this.value = selected.node.value;
    this.displayValue = selected.label;
    if (this.portal) this.portal.overlayRef.dispose();
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
    if (this.portal && this.portal.overlayRef.hasAttached) {
      this.portal.overlayRef.updatePositionStrategy(this.setPositionStrategy());
    }
  }
}
