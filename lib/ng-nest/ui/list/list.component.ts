import { Subscription, Observable } from "rxjs";
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
  Output,
  EventEmitter
} from "@angular/core";
import { XListPrefix, XListInput, XListNode } from "./list.type";
import {
  fillDefault,
  XData,
  XValueAccessor,
  XControlValueAccessor,
  XInputNumber,
  XIsEmpty,
  XIsObservable,
  XDataConvert,
  XToDataConvert
} from "@ng-nest/ui/core";
import { map } from "rxjs/operators";

@Component({
  selector: "x-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./style/index.scss"],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [XValueAccessor(XListComponent)]
})
export class XListComponent extends XControlValueAccessor implements OnInit, OnChanges {
  @Input() @XDataConvert() data?: XData<XListNode[]>;
  @Input() @XInputNumber() multiple?: number;
  @Output() nodeEmit?: EventEmitter<XListNode> = new EventEmitter<XListNode>();

  nodes: XListNode[] = [];
  selectedNodes: XListNode[] = [];

  writeValue(value: any): void {
    this.value = value;
    this.setSelected();
    this.cdr.detectChanges();
  }

  private _default: XListInput = {
    multiple: 1
  };
  private data$: Subscription | null = null;

  constructor(private renderer: Renderer2, private elementRef: ElementRef, private cdr: ChangeDetectorRef) {
    super();
    this.renderer.addClass(this.elementRef.nativeElement, XListPrefix);
  }

  ngOnInit() {
    fillDefault(this, this._default);
  }

  ngOnChanges(changes: SimpleChanges): void {
    let dataChange = changes.data;
    if (dataChange && dataChange.currentValue !== dataChange.previousValue) {
      this.setData();
    }
  }

  ngOnDestroy(): void {
    this.data$ && this.data$.unsubscribe();
  }

  private setData() {
    if (typeof this.data === "undefined") return;
    if (XIsObservable(this.data)) {
      this.data$ && this.data$.unsubscribe();
      this.data$ = (this.data as Observable<any>).pipe(map(x => XToDataConvert(x))).subscribe(x => {
        this.setDataChange(x);
      });
    } else {
      this.setDataChange(this.data as Array<any>);
    }
  }

  private setDataChange(value: XListNode[]) {
    this.nodes = value;
    this.setSelected();
    this.cdr.detectChanges();
  }

  setSelected() {
    if (!XIsEmpty(this.value) && this.nodes.length > 0) {
      let valArry = [];
      if (this.value instanceof Array) {
        valArry = this.value;
      } else {
        valArry = [this.value];
      }
      this.nodes
        .filter(x => x.selected)
        .map(x => {
          x.selected = false;
        });
      this.selectedNodes = this.nodes
        .filter(x => valArry.includes(x.value))
        .map(x => {
          x.selected = true;
          return x;
        });
      console.log(this.nodes);
    }
  }

  nodeClick(event: Event, node: XListNode) {
    event.preventDefault();
    if (node.disabled || (node.selected && this.multiple === 1)) return;
    const selected = !node.selected;
    if (selected) {
      if (this.selectedNodes.length < this.multiple || this.multiple === 0) {
        node.selected = selected;
        this.selectedNodes = [...this.selectedNodes, node];
      } else if (this.multiple === 1 && this.selectedNodes.length === 1) {
        node.selected = selected;
        this.selectedNodes[0].selected = false;
        this.selectedNodes[0] = node;
      } else {
        return;
      }
    } else {
      node.selected = selected;
      this.selectedNodes.splice(
        this.selectedNodes.findIndex(x => x.value == node.value),
        1
      );
    }
    if (this.multiple === 1 && this.selectedNodes.length === 1) {
      this.value = this.selectedNodes[0].value;
    } else {
      this.value = this.selectedNodes.map(x => x.value);
    }
    if (this.onChange) this.onChange(this.value);
    this.nodeEmit.emit(node);
  }
}
