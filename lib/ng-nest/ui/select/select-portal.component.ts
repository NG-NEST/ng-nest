import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnInit,
  OnDestroy,
  Renderer2,
  HostBinding,
  HostListener
} from '@angular/core';
import { XSelectNode, XSelectPortalPrefix } from './select.property';
import { Subject } from 'rxjs';
import { XCorner, XConnectAnimation } from '@ng-nest/ui/core';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: `${XSelectPortalPrefix}`,
  templateUrl: './select-portal.component.html',
  styleUrls: ['./select-portal.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [XConnectAnimation]
})
export class XSelectPortalComponent implements OnInit, OnDestroy {
  @HostBinding('@x-connect-animation') public placement: XCorner;
  @HostListener('@x-connect-animation.done', ['$event']) done(event: { toState: any }) {
    event.toState === 'void' && this.destroyPortal();
  }

  docClickFunction: Function;
  data: XSelectNode[];
  value: any;
  valueChange: Subject<any>;
  positionChange: Subject<any>;
  closePortal: Function;
  destroyPortal: Function;
  nodeEmit: Function;
  show: boolean = false;
  private _unSubject = new Subject<void>();

  constructor(public renderer: Renderer2, public cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.valueChange.pipe(takeUntil(this._unSubject)).subscribe((x) => {
      this.value = x;
      this.cdr.detectChanges();
    });
    this.positionChange.pipe(takeUntil(this._unSubject)).subscribe((x) => {
      this.placement = x;
      this.cdr.detectChanges();
    });
    setTimeout(
      () =>
        (this.docClickFunction = this.renderer.listen('document', 'click', () => {
          this.closePortal();
        }))
    );
  }

  ngOnDestroy(): void {
    this._unSubject.next();
    this._unSubject.unsubscribe();
    this.docClickFunction && this.docClickFunction();
  }

  stopPropagation(event: Event): void {
    event.stopPropagation();
  }

  nodeClick(node: XSelectNode) {
    this.nodeEmit(node);
  }
}
