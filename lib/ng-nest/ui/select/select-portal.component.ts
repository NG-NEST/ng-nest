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
import { XSelectPortal, XSelectNode, XSelectPortalPrefix } from "./select.type";
import { Subscription } from "rxjs";

@Component({
  selector: "x-select-portal",
  templateUrl: "./select-portal.component.html",
  styleUrls: ["./select-portal.component.scss"],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XSelectPortalComponent implements OnInit, OnDestroy {
  valueChange$: Subscription | null = null;

  constructor(
    private renderer: Renderer2,
    private elementRef: ElementRef,
    @Inject(XSelectPortal) public option: any,
    public cdr: ChangeDetectorRef
  ) {
    this.renderer.addClass(this.elementRef.nativeElement, XSelectPortalPrefix);
  }

  ngOnInit(): void {
    this.valueChange$ = this.option.valueChange.subscribe(x => {
      this.option.value = x;
      this.cdr.detectChanges();
    });
  }

  ngOnDestroy(): void {
    this.valueChange$ && this.valueChange$.unsubscribe();
  }

  nodeClick(node: XSelectNode) {
    this.option.nodeEmit(node);
  }
}
