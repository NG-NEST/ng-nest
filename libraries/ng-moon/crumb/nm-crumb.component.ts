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
  NmCrumbOption,
  NmCrumbNode,
  NmCrumbNodeClick
} from "./nm-crumb.type";
import { fillDefault, NmData } from "ng-moon/core";
import { Subscription } from "rxjs";

@Component({
  selector: "nm-crumb",
  templateUrl: "./nm-crumb.component.html",
  styleUrls: ["./style/index.scss"],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NmCrumbComponent implements OnInit, OnChanges {
  @Input() nmData?: NmData<NmCrumbNode[]>;
  @Input() nmNodeTemplate?: any;
  @Output() nmNodeClick?: EventEmitter<NmCrumbNodeClick> = new EventEmitter<
    NmCrumbNodeClick
  >();

  private _default: NmCrumbOption = {
    nmData: []
  };

  @ViewChild("crumbs", { static: true }) crumbsRef: ElementRef;
  data: NmCrumbNode[] = [];

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
    const nmDataChange = changes.nmData;
    if (
      nmDataChange &&
      nmDataChange.currentValue !== nmDataChange.previousValue
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
        this.nmNodeClick.emit({
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
    if (this.nmData instanceof Array) {
      this.setDataChange(this.nmData);
    } else {
      if (this._data$) this._data$.unsubscribe();
      this._data$ = this.nmData.subscribe(x => {
        this.setDataChange(x);
      });
    }
  }

  private setDataChange(value: NmCrumbNode[]) {
    this.data = value;
    this.cdr.detectChanges();
  }
}
