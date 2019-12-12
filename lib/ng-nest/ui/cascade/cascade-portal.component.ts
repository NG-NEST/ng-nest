import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  Inject,
  Input,
  ChangeDetectorRef,
  OnInit,
  ElementRef,
  Renderer2,
  OnDestroy
} from "@angular/core";
import { Subscription } from "rxjs";
import { XCascadeNode, XCascadePortalPrefix, XCascadePortal } from "./cascade.type";

@Component({
  selector: "x-cascade-portal",
  templateUrl: "./cascade-portal.component.html",
  styleUrls: ["./cascade-portal.component.scss"],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XCascadePortalComponent implements OnInit, OnDestroy {
  valueChange$: Subscription | null = null;
  dataChange$: Subscription | null = null;

  values = [];

  constructor(
    private renderer: Renderer2,
    private elementRef: ElementRef,
    @Inject(XCascadePortal) public option: any,
    public cdr: ChangeDetectorRef
  ) {
    this.values = this.option.value.map(x => x.value);
    this.renderer.addClass(this.elementRef.nativeElement, XCascadePortalPrefix);
  }

  ngOnInit(): void {
    this.dataChange$ = this.option.dataChange.subscribe(x => {
      this.option.data = x;
      this.cdr.detectChanges();
    });
    this.valueChange$ = this.option.valueChange.subscribe(x => {
      this.option.value = x;
      this.values = this.option.value.map(x => x.value);
      this.cdr.detectChanges();
    });
  }

  ngOnDestroy(): void {
    this.dataChange$ && this.dataChange$.unsubscribe();
    this.valueChange$ && this.valueChange$.unsubscribe();
  }

  nodeClick(node: XCascadeNode, index: number) {
    node.level = index;
    this.option.nodeEmit(node);
  }
}
