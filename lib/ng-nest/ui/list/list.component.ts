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
  SimpleChanges,
  OnChanges,
  Output,
  EventEmitter
} from "@angular/core";
import { XListPrefix, XListInput, XListNode } from "./list.type";
import { fillDefault, XData, XValueAccessor, XControlValueAccessor, InputNumber } from "@ng-nest/ui/core";

@Component({
  selector: "x-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./style/index.scss"],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [XValueAccessor(XListComponent)]
})
export class XListComponent extends XControlValueAccessor implements OnInit, OnChanges {
  @Input() data?: XData<XListNode[]>;
  @Input() @InputNumber() number?: number;
  @Output() nodeEmit?: EventEmitter<XListNode> = new EventEmitter<XListNode>();

  private _value: any;
  public get value(): any {
    return this._value;
  }
  public set value(value: any) {
    this._value = value;
    this.change(value);
    this.cdr.detectChanges();
  }

  nodes: XListNode[] = [];
  selectedNodes: XListNode[] = [];

  private _default: XListInput = {
    number: 1
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

  change(value) {
    if (this.onChange && typeof value !== "undefined") this.onChange(value);
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

  private setDataChange(value: XListNode[]) {
    this.nodes = value;
    this.cdr.detectChanges();
  }

  nodeClick(event: Event, node: XListNode) {
    event.preventDefault();
    if (node.disabled || (node.selected && this.number === 1)) return;
    const selected = !node.selected;
    if (selected) {
      if (this.selectedNodes.length < this.number) {
        node.selected = selected;
        this.selectedNodes = [...this.selectedNodes, node];
      } else if (this.number === 1 && this.selectedNodes.length === 1) {
        node.selected = selected;
        this.selectedNodes[0].selected = false;
        this.selectedNodes[0] = node;
      } else {
        return;
      }
    } else {
      node.selected = selected;
      this.selectedNodes.splice(
        this.selectedNodes.findIndex(x => x.key == node.key),
        1
      );
    }
    if (this.number === 1 && this.selectedNodes.length === 1) {
      this.value = this.selectedNodes[0];
    } else {
      this.value = this.selectedNodes;
    }
    this.nodeEmit.emit(node);
  }
}
