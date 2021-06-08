import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  OnChanges,
  SimpleChanges,
  ElementRef,
  Renderer2,
  ChangeDetectorRef
} from '@angular/core';
import { XPaginationPrefix, XPaginationProperty } from './pagination.property';
import { XIsChange, XConfigService } from '@ng-nest/ui/core';
import { Subject } from 'rxjs';
import { XI18nService } from '@ng-nest/ui/i18n';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: `${XPaginationPrefix}`,
  templateUrl: './pagination.component.html',
  styleUrls: ['./style/index.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XPaginationComponent extends XPaginationProperty implements OnChanges {
  lastIndex!: number;
  indexes: number[] = [];
  indexFirst: number = 1;
  indexLast: number = 1;

  private _unSubject = new Subject<void>();

  get leftDisabled() {
    return Number(this.index) === 1 || Number(this.total) === 0;
  }

  get leftJumpPage() {
    return this.indexes.length > 0 && this.indexLast > 9 && Number(this.index) - 3 > this.indexFirst;
  }

  get rightDisabled() {
    return Number(this.index) === this.lastIndex || Number(this.total) === 0;
  }

  get rightJumpPage() {
    return this.indexes.length > 0 && this.indexLast > 9 && Number(this.index) + 3 < this.indexLast;
  }

  get firstActivated() {
    return Number(this.index) === 1;
  }

  get lastActivated() {
    return Number(this.index) === this.lastIndex;
  }

  constructor(
    public configService: XConfigService,
    public elementRef: ElementRef,
    public renderer: Renderer2,
    public cdr: ChangeDetectorRef,
    public i18n: XI18nService
  ) {
    super();
    this.renderer.addClass(this.elementRef.nativeElement, XPaginationPrefix);
  }

  ngOnInit() {
    this.i18n.localeChange.pipe(takeUntil(this._unSubject)).subscribe(() => this.cdr.markForCheck());
  }

  ngOnChanges(changes: SimpleChanges): void {
    XIsChange(changes.total, changes.size, changes.index) && this.setIndexes();
  }

  ngOnDestory() {
    this._unSubject.next();
    this._unSubject.unsubscribe();
  }

  setIndexes() {
    this.lastIndex = Math.ceil(Number(this.total) / Number(this.size));
    const indexes = [];
    if (this.lastIndex <= 9) {
      for (let i = 2; i <= this.lastIndex - 1; i++) {
        indexes.push(i);
      }
    } else {
      const current = Number(this.index);
      let left = Math.max(2, current - 2);
      let right = Math.min(current + 2, this.lastIndex - 1);
      if (current - 1 <= 2) {
        right = 5;
      }
      if (this.lastIndex - current <= 2) {
        left = this.lastIndex - 4;
      }
      for (let i = left; i <= right; i++) {
        indexes.push(i);
      }
    }
    this.indexes = indexes;
    if (this.indexes.length > 0) {
      this.indexFirst = 1;
      this.indexLast = this.lastIndex;
    }
    this.cdr.detectChanges();
  }

  jump(index: number, isDiff = false) {
    const ix = this.validateIndex(isDiff ? Number(this.index) + index : index);
    if (ix !== this.index) {
      this.index = ix;
      this.setIndexes();
      this.indexChange.emit(this.index);
    }
  }

  validateIndex(value: number): number {
    if (value > this.lastIndex) {
      return this.lastIndex;
    } else if (value < 1) {
      return 1;
    } else {
      return value;
    }
  }

  getActivated(index: number) {
    return Number(this.index) === index;
  }

  trackByItem(index: number, item: number) {
    return item;
  }
}
