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
import { ENTER } from '@angular/cdk/keycodes';

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
  jumpPage: number | null = null;
  inputSize!: number;

  private _unSubject = new Subject<void>();

  get leftDisabled() {
    return Number(this.index) === 1 || Number(this.total) === 0;
  }

  get rightDisabled() {
    return Number(this.index) === this.lastIndex || Number(this.total) === 0;
  }

  get firstActivated() {
    return Number(this.index) === 1;
  }

  get lastActivated() {
    return Number(this.index) === this.lastIndex;
  }

  constructor(
    public configService: XConfigService,
    public elementRef: ElementRef<HTMLElement>,
    public renderer: Renderer2,
    public cdr: ChangeDetectorRef,
    public i18n: XI18nService
  ) {
    super();
    this.renderer.addClass(this.elementRef.nativeElement, XPaginationPrefix);
  }

  ngOnInit() {
    this.i18n.localeChange.pipe(takeUntil(this._unSubject)).subscribe(() => this.cdr.markForCheck());
    this.inputSize = Number(this.size);
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { total, size, index } = changes;
    XIsChange(total, size, index) && this.setIndexes();
  }

  ngOnDestroy() {
    this._unSubject.next();
    this._unSubject.unsubscribe();
  }

  sizeChanged() {
    this.setIndexes();
    this.sizeChange.emit(this.size as number);
    if (this.index !== 1) {
      this.index = 1;
      this.indexChange.emit(this.index);
    }
  }

  setIndexes() {
    this.lastIndex = Math.ceil(Number(this.total) / Number(this.size)) || 1;
    const indexes: number[] = [];
    const current = Number(this.index) - 1;
    const maxSize = Number(this.pageLinkSize);
    const pages = Math.min(maxSize, this.lastIndex);
    let start = Math.max(0, Math.ceil(current - pages / 2)),
      end = Math.min(this.lastIndex - 1, start + pages - 1);
    var delta = maxSize - (end - start + 1);
    start = Math.max(0, start - delta);

    for (let i = start; i <= end; i++) {
      indexes.push(i + 1);
    }
    this.indexes = indexes;
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

  onJumpKeydown(event: KeyboardEvent) {
    if (this.jumpPage !== null && event.keyCode === ENTER) {
      if (this.jumpPage <= this.indexFirst) {
        this.jump(this.indexFirst);
      } else if (this.jumpPage >= this.lastIndex) {
        this.jump(this.lastIndex);
      } else {
        this.jump(this.jumpPage);
      }
      this.jumpPage = null;
      this.cdr.detectChanges();
    }
  }

  onSimpleKeydown(event: KeyboardEvent) {
    if (this.index !== null && event.keyCode === ENTER) {
      if (Number(this.index) % 1 !== 0) {
        this.index = Math.round(Number(this.index));
      }
      if (isNaN(Number(this.index)) || this.index === 0) {
        this.index = 1;
      }
      if (this.index <= this.indexFirst) {
        this.index = this.indexFirst;
      } else if (this.index >= this.lastIndex) {
        this.index = this.lastIndex;
      }
      this.jump(this.index as number);
      this.indexChange.emit(this.index as number);
      this.cdr.detectChanges();
    }
  }

  onInputSizeKeydown(event: KeyboardEvent) {
    if (this.inputSize !== null && event.keyCode === ENTER) {
      if (this.inputSize % 1 !== 0) {
        this.inputSize = Math.round(this.inputSize);
      }
      if (isNaN(this.inputSize)) {
        this.inputSize = Number(this.size);
      }
      if (this.inputSize <= 0) {
        this.inputSize = Number(this.size);
      } else if (this.inputSize !== Number(this.size)) {
        this.size = this.inputSize;
        this.sizeChanged();
      }
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

  trackByItem(_index: number, item: number) {
    return item;
  }
}
