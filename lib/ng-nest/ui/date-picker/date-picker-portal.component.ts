import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  Inject,
  ChangeDetectorRef,
  OnInit,
  ElementRef} from "@angular/core";
import { XDatePickerNode, XDatePickerPortal } from "./date-picker.type";
import { XIsEmpty, removeNgTag } from "@ng-nest/ui/core";

@Component({
  selector: "x-date-picker-portal",
  templateUrl: "./date-picker-portal.component.html",
  styleUrls: ["./date-picker-portal.component.scss"],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XDatePickerPortalComponent implements OnInit {
  nodes: XDatePickerNode[][] = [];
  datas: XDatePickerNode[] = [];
  selecteds: XDatePickerNode[] = [];
  values = [];

  constructor(
    private elementRef: ElementRef,
    @Inject(XDatePickerPortal) public option: any,
    public cdr: ChangeDetectorRef
  ) {
    this.datas = this.option.datas;
    if (!XIsEmpty(this.option.value)) {
      this.setDefault();
    } else {
      this.nodes = [this.option.nodes];
    }
  }

  ngOnInit(): void {
    // removeNgTag(this.elementRef.nativeElement);
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

  nodeClick(node: XDatePickerNode) {
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
  }
}
