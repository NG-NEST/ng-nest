import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  Inject,
  ChangeDetectorRef,
  OnInit,
  ElementRef,
  OnDestroy,
  Renderer2
} from "@angular/core";
import { XSelectPortal, XSelectNode } from "./select.type";
import { Subscription } from "rxjs";
import { removeNgTag } from "@ng-nest/ui/core";

@Component({
  selector: "x-select-portal",
  templateUrl: "./select-portal.component.html",
  styleUrls: ["./select-portal.component.scss"],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XSelectPortalComponent implements OnInit, OnDestroy {
  valueChange$: Subscription | null = null;
  docClickFunction: Function;

  constructor(public renderer: Renderer2, @Inject(XSelectPortal) public option: any, public cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.valueChange$ = this.option.valueChange.subscribe(x => {
      this.option.value = x;
      this.cdr.markForCheck();
    });
    this.docClickFunction = this.renderer.listen("document", "click", () => {
      this.option.closePortal();
    });
  }

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }

  ngOnDestroy(): void {
    this.valueChange$ && this.valueChange$.unsubscribe();
    this.docClickFunction && this.docClickFunction();
  }

  stopPropagation(event: Event): void {
    event.stopPropagation();
  }

  nodeClick(node: XSelectNode) {
    this.option.nodeEmit(node);
  }
}
