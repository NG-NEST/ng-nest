import {
  Component,
  OnInit,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  Input,
  OnChanges,
  SimpleChanges,
  ChangeDetectorRef,
  Output,
  EventEmitter,
  TemplateRef
} from '@angular/core';
import { XCrumbPrefix, XCrumbNode, XCrumbNodeClick } from './crumb.type';
import { XData, XDataConvert, XIsObservable, XToDataConvert, XIsChange, XTemplate } from '@ng-nest/ui/core';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

@Component({
  selector: `${XCrumbPrefix}`,
  templateUrl: './crumb.component.html',
  styleUrls: ['./style/index.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XCrumbComponent implements OnInit, OnChanges {
  @Input() @XDataConvert() data?: XData<XCrumbNode[]>;
  @Input() nodeTpl?: TemplateRef<any>;
  @Input() separator?: XTemplate = '/';
  @Output() nodeClick?: EventEmitter<XCrumbNodeClick> = new EventEmitter<XCrumbNodeClick>();
  nodes: XCrumbNode[] = [];

  private unSubject = new Subject();

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {}

  ngAfterViewInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    XIsChange(changes.data) && this.setData();
  }

  ngOnDestroy(): void {
    this.unSubject.next();
    this.unSubject.unsubscribe();
  }

  action(type: string, option?: any, event?: Event) {
    switch (type) {
      case 'click':
        this.nodeClick.emit({
          event: event,
          node: option
        });
        break;
    }
  }

  private setData() {
    if (typeof this.data === 'undefined') return;
    if (XIsObservable(this.data)) {
      (this.data as Observable<any>)
        .pipe(
          map(x => XToDataConvert(x)),
          takeUntil(this.unSubject)
        )
        .subscribe(x => {
          this.setDataChange(x);
        });
    } else {
      this.setDataChange(this.data as XCrumbNode[]);
    }
  }

  private setDataChange(value: XCrumbNode[]) {
    this.nodes = value;
    this.cdr.detectChanges();
  }
}
