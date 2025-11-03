import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  OnInit,
  signal,
  computed,
  HostBinding,
  ElementRef,
  inject,
  SimpleChanges
} from '@angular/core';
import { XPaginationPrefix, XPaginationProperty } from './pagination.property';
import { XI18nPagination, XI18nPipe, XI18nService, zh_CN } from '@ng-nest/ui/i18n';
import { ENTER } from '@angular/cdk/keycodes';
import { FormsModule } from '@angular/forms';
import { XButtonComponent, XButtonsComponent } from '@ng-nest/ui/button';
import { XSelectComponent } from '@ng-nest/ui/select';
import { XInputComponent, XInputGroupComponent } from '@ng-nest/ui/input';
import { XOutletDirective } from '@ng-nest/ui/outlet';
import { XIsChange, XToDataArray } from '@ng-nest/ui/core';
import { XTooltipModule } from '@ng-nest/ui/tooltip';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

@Component({
  selector: `${XPaginationPrefix}`,
  imports: [
    FormsModule,
    XButtonComponent,
    XButtonsComponent,
    XI18nPipe,
    XSelectComponent,
    XInputComponent,
    XTooltipModule,
    XInputGroupComponent,
    XOutletDirective
  ],
  templateUrl: './pagination.component.html',
  styleUrls: ['./style/index.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XPaginationComponent extends XPaginationProperty implements OnInit {
  elementRef = inject(ElementRef);
  private i18n = inject(XI18nService);
  locale = toSignal(this.i18n.localeChange.pipe(map((x) => x.pagination as XI18nPagination)), {
    initialValue: zh_CN.pagination
  });

  @HostBinding('class') className = XPaginationPrefix;

  indexFirst = signal(1);
  indexLast = signal(1);
  jumpPage = signal<number | null>(null);
  inputSize = signal<string>('');

  lastIndex = computed(() => Math.ceil(this.total() / this.size()) || 1);
  leftDisabled = computed(() => this.index() === 1 || this.total() === 0);
  rightDisabled = computed(() => this.index() === this.lastIndex() || this.total() === 0);
  firstActivated = computed(() => this.index() === 1);
  lastActivated = computed(() => this.index() === this.lastIndex());

  indexes = computed(() => {
    const indexes: number[] = [];
    const current = this.index() - 1;
    const maxSize = this.pageLinkSize();
    const pages = Math.min(maxSize, this.lastIndex());
    let start = Math.max(0, Math.ceil(current - pages / 2)),
      end = Math.min(this.lastIndex() - 1, start + pages - 1);
    var delta = maxSize - (end - start + 1);
    start = Math.max(0, start - delta);

    for (let i = start; i <= end; i++) {
      indexes.push(i + 1);
    }
    return indexes;
  });

  sizeDataSignal = computed(() => XToDataArray(this.sizeData()));

  inputSizeTooltip = computed(() => {
    if (this.inputSizeTooltipText()) return this.inputSizeTooltipText();
    if (this.inputIndexSizeSureType() === 'enter') {
      return this.locale().inputSizeTooltipEnter;
    }
    if (this.inputIndexSizeSureType() === 'blur') {
      return this.locale().inputSizeTooltipBlur;
    }
    if (this.inputIndexSizeSureType() === 'both') {
      return this.locale().inputSizeTooltipBoth;
    }
    return '';
  });

  jumpTooltip = computed(() => {
    if (this.jumpTooltipText()) return this.jumpTooltipText();
    if (this.inputIndexSizeSureType() === 'enter') {
      return this.locale().jumpTooltipEnter;
    }
    if (this.inputIndexSizeSureType() === 'blur') {
      return this.locale().jumpTooltipBlur;
    }
    if (this.inputIndexSizeSureType() === 'both') {
      return this.locale().jumpTooltipBoth;
    }
    return '';
  });

  ngOnInit() {
    this.inputSize.set(this.size().toString());
    if (this.simple()) this.jumpPage.set(this.index());
  }

  ngOnChanges(changes: SimpleChanges) {
    const { size } = changes;
    XIsChange(size) && this.inputSize.set(this.size().toString());
  }

  sizeChanged() {
    if (this.index() !== 1) {
      this.index.set(1);
    }
  }

  jump(index: number, isDiff = false) {
    const ix = this.validateIndex(isDiff ? this.index() + index : index);
    if (ix !== this.index()) {
      if (this.simple()) {
        this.jumpPage.set(ix);
      }
      this.index.set(ix);
    }
  }

  onJumpBlur(_event: MouseEvent, holdValue = false) {
    if (!['blur', 'both'].includes(this.inputIndexSizeSureType())) return;
    const jumpPage = this.jumpPage();
    const page = Number(jumpPage);
    this.onJumpPageChange(page, holdValue);
  }

  onJumpKeydown(event: KeyboardEvent, holdValue = false) {
    if (!['enter', 'both'].includes(this.inputIndexSizeSureType())) return;
    const jumpPage = this.jumpPage();
    if (jumpPage && event.keyCode === ENTER) {
      const page = Number(jumpPage);
      this.onJumpPageChange(page, holdValue);
    }
  }

  onJumpPageChange(page: number, holdValue = false) {
    if (page <= this.indexFirst()) {
      this.jump(this.indexFirst());
    } else if (page >= this.lastIndex()) {
      this.jump(this.lastIndex());
    } else {
      this.jump(page);
    }
    if (holdValue) return;
    this.jumpPage.set(null);
  }

  onSimpleKeydown(event: KeyboardEvent) {
    if (this.index() !== null && event.keyCode === ENTER) {
      if (this.index() % 1 !== 0) {
        this.index.update((x) => Math.round(x));
      }
      if (isNaN(this.index()) || this.index() === 0) {
        this.index.set(1);
      }
      if (this.index() <= this.indexFirst()) {
        this.index.set(this.indexFirst());
      } else if (this.index() >= this.lastIndex()) {
        this.index.set(this.lastIndex());
      }
      this.jump(this.index());
    }
  }

  onInputSizeBlur(_event: MouseEvent) {
    if (!['blur', 'both'].includes(this.inputIndexSizeSureType())) return;
    const inputSize = this.inputSize().trim();
    const inputNumber = Number(inputSize);
    this.onSizeChange(inputNumber);
  }

  onInputSizeKeydown(event: KeyboardEvent) {
    if (!['enter', 'both'].includes(this.inputIndexSizeSureType())) return;
    const inputSize = this.inputSize().trim();
    if (inputSize !== '' && event.keyCode === ENTER) {
      const inputNumber = Number(inputSize);
      this.onSizeChange(inputNumber);
    }
  }

  onSizeChange(size: number) {
    if (size % 1 !== 0) {
      this.inputSize.set(`${Math.round(size)}`);
    }
    if (isNaN(size)) {
      this.inputSize.set(`${this.size()}`);
    }
    if (size <= 0) {
      this.inputSize.set(`${this.size()}`);
    } else if (size !== this.size()) {
      this.size.set(size);
      this.sizeChanged();
    }
  }

  validateIndex(value: number): number {
    if (value > this.lastIndex()) {
      return this.lastIndex();
    } else if (value < 1) {
      return 1;
    } else {
      return value;
    }
  }

  getActivated(index: number) {
    return this.index() === index;
  }
}
