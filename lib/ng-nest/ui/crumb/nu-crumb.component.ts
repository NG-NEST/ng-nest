import {
  Component,
  OnInit,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  HostBinding,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
  ElementRef,
  Renderer2,
  ChangeDetectorRef,
  Output,
  EventEmitter
} from "@angular/core";
import {
  CrumbPrefix,
  NuCrumbOption,
  NuCrumbNode,
  NuCrumbNodeClick
} from "./nu-crumb.type";
import { fillDefault, NuData } from "@ng-nest/ui/core";
import { Subscription } from "rxjs";

@Component({
  selector: "nu-crumb",
  templateUrl: "./nu-crumb.component.html",
  styleUrls: ["./style/index.scss"],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NuCrumbComponent implements OnInit, OnChanges {
  @Input() nuData?: NuData<NuCrumbNode[]>;
  @Input() nuNodeTemplate?: any;
  @Output() nuNodeClick?: EventEmitter<NuCrumbNodeClick> = new EventEmitter<
    NuCrumbNodeClick
  >();

  private _default: NuCrumbOption = {
    nuData: []
  };

  @ViewChild("crumbs", { static: true }) crumbsRef: ElementRef;
  data: NuCrumbNode[] = [];

  private _data$: Subscription | null = null;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private cdr: ChangeDetectorRef
  ) {
    this.renderer.addClass(this.elementRef.nativeElement, CrumbPrefix);
  }

  ngOnInit() {
    fillDefault(this, this._default);
    this.setData();
  }

  ngAfterViewInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    const nuDataChange = changes.nuData;
    if (
      nuDataChange &&
      nuDataChange.currentValue !== nuDataChange.previousValue
    ) {
      this.setData();
    }
  }

  ngOnDestroy(): void {
    this.removeListen();
  }

  action(type: string, option?: any, event?: Event) {
    switch (type) {
      case "click":
        this.nuNodeClick.emit({
          event: event,
          node: option
        });
        this.cdr.detectChanges();
        break;
    }
  }

  private removeListen() {
    if (this._data$) this._data$.unsubscribe();
  }

  private setData() {
    if (this.nuData instanceof Array) {
      this.setDataChange(this.nuData);
    } else {
      if (this._data$) this._data$.unsubscribe();
      this._data$ = this.nuData.subscribe(x => {
        this.setDataChange(x);
      });
    }
  }

  private setDataChange(value: NuCrumbNode[]) {
    this.data = value;
    this.cdr.detectChanges();
  }
}
