import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  Inject,
  ChangeDetectorRef,
  OnInit,
  ElementRef,
  NgZone
} from "@angular/core";
import { XCascadeNode, XCascadePortal } from "./cascade.type";
import { XIsEmpty, removeNgTag } from "@ng-nest/ui/core";

@Component({
  selector: "x-cascade-portal",
  templateUrl: "./cascade-portal.component.html",
  styleUrls: ["./cascade-portal.component.scss"],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XCascadePortalComponent implements OnInit {
  nodes: XCascadeNode[][] = [];
  datas: XCascadeNode[] = [];
  selecteds: XCascadeNode[] = [];
  values = [];

  constructor(
    private elementRef: ElementRef,
    @Inject(XCascadePortal) public option: any,
    public ngZone: NgZone,
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

  nodeClick(node: XCascadeNode) {
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
