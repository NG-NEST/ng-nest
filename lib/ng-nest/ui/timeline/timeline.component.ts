import {
  Component,
  OnInit,
  ViewEncapsulation,
  Renderer2,
  ElementRef,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  Input,
  ViewChild,
  SimpleChanges,
  OnChanges
} from '@angular/core';
import { XTimelinePrefix, XTimelineNode } from './timeline.type';
import {
  XSize,
  XDataConvert,
  XData,
  XIsObservable,
  XToDataConvert,
  XType,
  XClassMap,
  XTemplate,
  XIsChange
} from '@ng-nest/ui/core';
import { Subscription, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: `${XTimelinePrefix}`,
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XTimelineComponent implements OnInit, OnChanges {
  @Input() @XDataConvert() data: XData<XTimelineNode>;
  @Input() type?: XType;
  @Input() size?: XSize;
  @Input() wrapper?: XTemplate;
  @ViewChild('timeline', { static: true }) timeline: ElementRef;
  nodes: XTimelineNode[] = [];
  classMap: XClassMap = {};
  private data$: Subscription | null = null;
  constructor(public renderer: Renderer2, public elementRef: ElementRef, public cdr: ChangeDetectorRef) {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    XIsChange(changes.data) && this.setData();
  }

  ngOnDestroy(): void {
    this.data$ && this.data$.unsubscribe();
  }

  private setData() {
    if (typeof this.data === 'undefined') return;
    if (XIsObservable(this.data)) {
      this.data$ && this.data$.unsubscribe();
      this.data$ = (this.data as Observable<any>).pipe(map(x => XToDataConvert(x))).subscribe(x => {
        this.setDataChange(x);
      });
    } else {
      this.setDataChange(this.data as XTimelineNode[]);
    }
  }

  private setDataChange(value: XTimelineNode[]) {
    this.nodes = value;
    this.cdr.detectChanges();
  }
}
