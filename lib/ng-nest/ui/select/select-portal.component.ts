import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  Inject,
  ChangeDetectorRef,
  OnInit,
  ElementRef,
  OnDestroy
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

  constructor(
    private elementRef: ElementRef,
    @Inject(XSelectPortal) public option: any,
    public cdr: ChangeDetectorRef
  ) {
    // setTimeout(() => {
    //   this.ngOnInit();
    //   this.ngAfterViewInit();
    // });
  }

  ngOnInit(): void {
    this.valueChange$ = this.option.valueChange.subscribe(x => {
      this.option.value = x;
    });
    // removeNgTag(this.elementRef.nativeElement);
  }

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }

  ngOnDestroy(): void {
    this.valueChange$ && this.valueChange$.unsubscribe();
  }

  nodeClick(node: XSelectNode) {
    this.option.nodeEmit(node);
  }
}
