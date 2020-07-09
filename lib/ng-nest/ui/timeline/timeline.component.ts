import {
  Component,
  OnInit,
  ViewEncapsulation,
  Renderer2,
  ElementRef,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  SimpleChanges,
  OnChanges
} from '@angular/core';
import { XTimelinePrefix, XTimelineNode, XTimelineProperty } from './timeline.property';
import { XIsChange, XSetData, XConfigService } from '@ng-nest/ui/core';
import { Subject } from 'rxjs';

@Component({
  selector: `${XTimelinePrefix}`,
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XTimelineComponent extends XTimelineProperty implements OnInit, OnChanges {
  nodes: XTimelineNode[] = [];
  private _unSubject = new Subject<void>();
  constructor(
    public renderer: Renderer2,
    public elementRef: ElementRef,
    public cdr: ChangeDetectorRef,
    public configService: XConfigService
  ) {
    super();
  }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    XIsChange(changes.data) && this.setData();
  }

  ngOnDestroy(): void {
    this._unSubject.next();
    this._unSubject.unsubscribe();
  }

  private setData() {
    XSetData<XTimelineNode>(this.data, this._unSubject).subscribe((x) => {
      this.nodes = x;
      this.cdr.detectChanges();
    });
  }
}
