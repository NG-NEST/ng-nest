import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  Inject,
  ChangeDetectorRef,
  OnInit,
  ElementRef,
  NgZone,
  Renderer2,
  OnDestroy
} from "@angular/core";
import { XColorPickerNode, XColorPickerPortal } from "./color-picker.type";
import { XIsEmpty, removeNgTag } from "@ng-nest/ui/core";
import { Subscription } from "rxjs";

@Component({
  selector: "x-color-picker-portal",
  templateUrl: "./color-picker-portal.component.html",
  styleUrls: ["./color-picker-portal.component.scss"],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XColorPickerPortalComponent implements OnInit, OnDestroy {
  nodes: XColorPickerNode[][] = [];
  datas: XColorPickerNode[] = [];
  selecteds: XColorPickerNode[] = [];
  values = [];
  valueChange$: Subscription | null = null;
  docClickFunction: Function;

  sliderColor = 0;
  transparent = 1;
  type = "";

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    @Inject(XColorPickerPortal) public option: any,
    public ngZone: NgZone,
    public cdr: ChangeDetectorRef
  ) {
    this.datas = this.option.datas;
    this.init();
  }

  ngOnInit(): void {
    this.valueChange$ = this.option.valueChange.subscribe(x => {
      this.option.value = x;
      this.init();
      this.cdr.markForCheck();
    });
    setTimeout(
      () =>
        (this.docClickFunction = this.renderer.listen("document", "click", () => {
          this.option.closePortal();
        }))
    );
  }

  ngOnDestroy(): void {
    this.valueChange$ && this.valueChange$.unsubscribe();
    this.docClickFunction && this.docClickFunction();
  }

  init() {
    if (!XIsEmpty(this.option.value)) {
      this.setDefault();
    } else {
      this.nodes = [this.option.nodes];
      this.values = [];
    }
  }

  stopPropagation(event: Event): void {
    event.stopPropagation();
  }

  setDefault() {
    let node = this.datas.find(x => x.value === this.option.value);
    this.selecteds = [node];
    this.nodes = [this.datas.filter(x => x.parentValue === node.parentValue)];
    while (!XIsEmpty(node.parentValue)) {
      node = this.datas.find(x => x.value === node.parentValue);
      this.selecteds = [node, ...this.selecteds];
      this.nodes = [this.datas.filter(x => x.parentValue === node.parentValue), ...this.nodes];
    }
    this.values = this.selecteds.map(x => x.value);
  }

  nodeClick(node: XColorPickerNode) {
    this.ngZone.run(() => {
      if (node.hasChild) {
        if (this.nodes.length === node.level) {
          this.nodes = [...this.nodes, node.children];
          this.selecteds = [...this.selecteds, node];
        } else {
          if (this.nodes.length > node.level + 1) {
            this.nodes = this.nodes.splice(0, node.level + 1);
            this.selecteds = this.selecteds.splice(0, node.level + 1);
          }
          this.nodes[node.level + 1] = node.children;
          this.selecteds[node.level] = node;
        }
        this.values = this.selecteds.map(x => x.value);
        this.cdr.detectChanges();
      } else {
        if (this.selecteds.length === node.level + 1) {
          this.selecteds = this.selecteds.splice(0, node.level);
        }
        this.selecteds = [...this.selecteds, node];
        this.option.nodeEmit({ node: node, label: this.selecteds.map(x => x.label).join(` / `) });
      }
    });
  }
}
