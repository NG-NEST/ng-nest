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
} from '@angular/core';
import { CrumbPrefix, XCrumbInput, XCrumbNode, XCrumbNodeClick } from './crumb.type';
import { fillDefault, XData } from '@ng-nest/ui/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'x-crumb',
  templateUrl: './crumb.component.html',
  styleUrls: ['./style/index.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XCrumbComponent implements OnInit, OnChanges {
  @Input() data?: XData<XCrumbNode[]>;
  @Input() nodeTemplate?: any;
  @Output() nodeClick?: EventEmitter<XCrumbNodeClick> = new EventEmitter<XCrumbNodeClick>();

  private _default: XCrumbInput = {
    data: []
  };

  @ViewChild('crumbs', { static: true }) crumbsRef: ElementRef;
  crumbs: XCrumbNode[] = [];

  private _data$: Subscription | null = null;

  constructor(private elementRef: ElementRef, private renderer: Renderer2, private cdr: ChangeDetectorRef) {
    this.renderer.addClass(this.elementRef.nativeElement, CrumbPrefix);
  }

  ngOnInit() {
    fillDefault(this, this._default);
    this.setData();
  }

  ngAfterViewInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    const dataChange = changes.data;
    if (dataChange && dataChange.currentValue !== dataChange.previousValue) {
      this.setData();
    }
  }

  ngOnDestroy(): void {
    this.removeListen();
  }

  action(type: string, option?: any, event?: Event) {
    switch (type) {
      case 'click':
        this.nodeClick.emit({
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
    if (this.data instanceof Array) {
      this.setDataChange(this.data);
    } else {
      if (this._data$) this._data$.unsubscribe();
      this._data$ = this.data.subscribe(x => {
        this.setDataChange(x);
      });
    }
  }

  private setDataChange(value: XCrumbNode[]) {
    this.crumbs = value;
    this.cdr.detectChanges();
  }
}
