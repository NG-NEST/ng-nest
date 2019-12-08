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
  TemplateRef,
  Inject,
  Output,
  EventEmitter
} from "@angular/core";
import { XCascadePrefix, XCascadeInput, XCascadeNode } from "./cascade.type";
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
import { XInputComponent } from "@ng-nest/ui/input";
import { DOCUMENT } from "@angular/common";

@Component({
  selector: "x-cascade",
  templateUrl: "./cascade.component.html",
  styleUrls: ["./style/index.scss"],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [XValueAccessor(XCascadeComponent)]
})
export class XCascadeComponent extends XControlValueAccessor implements OnInit, OnChanges {
  @Input() data?: XData<XCascadeNode[]>;
  @Input() justify?: XJustify;
  @Input() align?: XAlign;
  @Input() direction?: XDirection;
  @Input() label: string = "";
  @Input() placeholder: string = "";
  @Input() @InputBoolean() required?: boolean;
  @ViewChild("portalTpl", { static: true }) portalTpl: TemplateRef<any>;
  @ViewChild("inputCom", { static: true }) inputCom: XInputComponent;
  @Output() nodeEmit?: EventEmitter<XCascadeNode> = new EventEmitter<XCascadeNode>();

  private _value: any = "";
  public get value(): any {
    return this._value;
  }
  public set value(value: any) {
    this._value = value;
    this.setInputDisplayValue(true);
    if (this._required) {
      this.required = isEmpty(value);
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
    if (this.data instanceof Array) {
      this.setDataChange(this.data);
    } else {
      this.data$ && this.data$.unsubscribe();
      this.data$ = this.data.subscribe(x => {
        this.setDataChange(x);
      });
    }
  }

  private setDataChange(value: XCascadeNode[]) {
    this.nodes = JSON.parse(JSON.stringify(value));
    let nodes = this.nodes
      .filter(x => isEmpty(x.parentKey))
      .map(x => {
        x.hasChildren = this.nodes.find(y => y.parentKey === x.key) !== null;
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
    if (!isEmpty(this.value)) {
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
  }

  showPortal() {
    if (this.disabled) return;
    this.portal = this.portalService.create({
      content: this.portalTpl,
      viewContainerRef: this.viewContainerRef,
      context: { list: this.displayNodes },
      overlayConfig: {
        hasBackdrop: true,
        panelClass: "x-cascade-portal",
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

  nodeClick(event: Event, node: XCascadeNode, index: number) {
    event.preventDefault();
    if (node.disabled || node.selected) return;
    node.selected = true;
    let setDisplayNodes = (nodes: XCascadeNode[]) => {
      if (this.displayNodes.length > index + 1) {
        this.displayNodes[index + 1] = nodes;
        this.displayNodes = this.displayNodes.slice(0, index + 2);
      } else {
        this.displayNodes = [...this.displayNodes, nodes];
      }
    };
    let setDisplayValues = () => {
      if (this.displayValues.length > index) {
        this.displayValues[index].selected = false;
        this.displayValues[index] = node;
      } else {
        this.displayValues = [...this.displayValues, node];
      }
    };
    if (node.hasChildren) {
      let nodes = this.nodes
        .filter(x => x.parentKey === node.key)
        .map(x => {
          x.hasChildren = this.nodes.find(y => y.parentKey === x.key) !== undefined;
          return x;
        });
      setDisplayNodes(nodes);
      setDisplayValues();
      // this.portal.templatePortal.context = { list: this.displayNodes };
      this.cdr.detectChanges();
    } else {
      setDisplayValues();
      this.setInputDisplayValue();
      this.value = node.key;
      if (this.onChange) this.onChange(this.value);
      if (this.portal) this.portal.overlayRef.detach();
    }
    this.nodeEmit.emit(node);
  }

  setInputDisplayValue(needNodes = false) {
    if (isEmpty(this.value)) return;
    if (needNodes) {
      let node = this.nodes.find(x => x.key === this.value);
      if (isEmpty(node)) return;
      node.selected = true;
      this.displayValues = [node];
      let nodes = [];
      while (!isEmpty(node.parentKey)) {
        let parentNode = this.nodes.find(x => x.key === node.parentKey);
        parentNode.selected = true;
        nodes = [
          this.nodes
            .filter(x => x.parentKey === node.parentKey)
            .map(x => {
              x.hasChildren = this.nodes.find(y => y.parentKey === x.key) !== undefined;
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
