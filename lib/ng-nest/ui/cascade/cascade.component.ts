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
    this.setInputDisplayValue(true);
    if (this._required) {
      this.required = XIsEmpty(value);
    }
    this.cdr.detectChanges();
  }

  readonly: boolean = true;
  clearable: boolean = false;
  enter: boolean = false;
  inputDisplayValue: any = "";
  nodes: XCascadeNode[] = [];
  displayNodes: XCascadeNode[][] = [];
  displayValues: XCascadeNode[] = [];
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
    this.nodes = value;
    let nodes = this.nodes
      .filter(x => XIsEmpty(x.parentValue))
      .map(x => {
        x.hasChild = this.nodes.find(y => y.parentValue === x.value) !== null;
        return x;
      });
    this.displayNodes = [...this.displayNodes, nodes];
    this.setPortal();
    this.setInputDisplayValue(true);
    this.cdr.detectChanges();
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
    this.displayValues = [];
    this.nodes
      .filter(x => x.selected)
      .forEach(x => {
        x.selected = false;
      });
    if (this.displayNodes.length > 0) {
      this.displayNodes = [this.displayNodes[0]];
    }
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
          data: this.displayNodes,
          dataChange: this.dataChange,
          value: this.displayValues,
          valueChange: this.valueChange,
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

  nodeClick(node: XCascadeNode) {
    if (node.disabled) return;
    let setDisplayNodes = (nodes: XCascadeNode[]) => {
      if (this.displayNodes.length > node.level + 1) {
        this.displayNodes[node.level + 1] = nodes;
        this.displayNodes = this.displayNodes.slice(0, node.level + 2);
      } else {
        this.displayNodes = [...this.displayNodes, nodes];
      }
    };
    let setDisplayValues = () => {
      if (this.displayValues.length > node.level) {
        this.displayValues[node.level].selected = false;
        this.displayValues[node.level] = node;
      } else {
        this.displayValues = [...this.displayValues, node];
      }
    };
    if (node.hasChild) {
      let nodes = this.nodes
        .filter(x => x.parentValue === node.value)
        .map(x => {
          x.hasChild = this.nodes.find(y => y.parentValue === x.value) !== undefined;
          return x;
        });
      setDisplayNodes(nodes);
      setDisplayValues();
      this.dataChange.next(this.displayNodes);
      this.valueChange.next(this.displayValues);
      // this.setInputDisplayValue();
    } else {
      setDisplayValues();
      this.valueChange.next(this.displayValues);
      this.setInputDisplayValue();
      this.value = node.value;
      console.log(this.inputDisplayValue);
      if (this.onChange) this.onChange(this.value);
      if (this.portal) this.portal.overlayRef.detach();
    }
    this.nodeEmit.emit(node);
  }

  setInputDisplayValue(needNodes = false) {
    if (XIsEmpty(this.value)) {
      this.inputDisplayValue = "";
      this.displayValues = [];
      let nodes = this.nodes
        .filter(x => XIsEmpty(x.parentValue))
        .map(x => {
          x.hasChild = this.nodes.find(y => y.parentValue === x.value) !== null;
          return x;
        });
      this.displayNodes = [nodes];
      this.dataChange.next(this.displayNodes);
      this.valueChange.next(this.displayValues);
      return;
    }
    if (needNodes) {
      let node = this.nodes.find(x => x.value === this.value);
      if (XIsEmpty(node)) return;
      node.selected = true;
      this.displayValues = [node];
      let nodes = [];
      while (!XIsEmpty(node.parentValue)) {
        let parentNode = this.nodes.find(x => x.value === node.parentValue);
        parentNode.selected = true;
        nodes = [
          this.nodes
            .filter(x => x.parentValue === node.parentValue)
            .map(x => {
              x.hasChild = this.nodes.find(y => y.parentValue === x.value) !== undefined;
              return x;
            }),
          ...nodes
        ];
        this.displayValues = [parentNode, ...this.displayValues];
        node = parentNode;
      }
      this.displayNodes = [this.displayNodes[0], ...nodes];
    }
    this.inputDisplayValue = "";
    this.displayValues.forEach((x, index) => {
      this.inputDisplayValue += `${index > 0 ? " / " : ""}${x.label}`;
    });
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
