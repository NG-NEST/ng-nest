import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  OnInit,
  signal,
  computed,
  HostBinding,
  ElementRef,
  inject
} from '@angular/core';
import { XPaginationPrefix, XPaginationProperty } from './pagination.property';
import { XI18nPipe } from '@ng-nest/ui/i18n';
import { ENTER } from '@angular/cdk/keycodes';
import { FormsModule } from '@angular/forms';
import { XButtonComponent, XButtonsComponent } from '@ng-nest/ui/button';
import { XSelectComponent } from '@ng-nest/ui/select';
import { XInputComponent } from '@ng-nest/ui/input';
import { XOutletDirective } from '@ng-nest/ui/outlet';
import { XToDataArray } from '@ng-nest/ui/core';

@Component({
  selector: `${XPaginationPrefix}`,
  standalone: true,
  imports: [
    FormsModule,
    XButtonComponent,
    XButtonsComponent,
    XI18nPipe,
    XSelectComponent,
    XInputComponent,
    XOutletDirective
  ],
  templateUrl: './pagination.component.html',
  styleUrls: ['./style/index.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XPaginationComponent extends XPaginationProperty implements OnInit {
  elementRef = inject(ElementRef);

  @HostBinding('class') className = XPaginationPrefix;

  indexFirst = signal(1);
  indexLast = signal(1);
  jumpPage = signal<string>('');
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

  ngOnInit() {
    this.inputSize.set(this.size().toString());
  }

  sizeChanged() {
    if (this.index() !== 1) {
      this.index.set(1);
    }
  }

  jump(index: number, isDiff = false) {
    const ix = this.validateIndex(isDiff ? this.index() + index : index);
    if (ix !== this.index()) {
      this.index.set(ix);
    }
  }

  onJumpKeydown(event: KeyboardEvent) {
    const jumpPage = this.jumpPage().trim();
    if (jumpPage !== '' && event.keyCode === ENTER) {
      if (Number(jumpPage) <= this.indexFirst()) {
        this.jump(this.indexFirst());
      } else if (Number(jumpPage) >= this.lastIndex()) {
        this.jump(this.lastIndex());
      } else {
        this.jump(Number(jumpPage));
      }
      this.jumpPage.set('');
    }
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

  onInputSizeKeydown(event: KeyboardEvent) {
    const inputSize = this.inputSize().trim();
    if (inputSize !== '' && event.keyCode === ENTER) {
      const inputNumber = Number(inputSize);
      if (inputNumber % 1 !== 0) {
        this.inputSize.set(`${Math.round(inputNumber)}`);
      }
      if (isNaN(inputNumber)) {
        this.inputSize.set(`${this.size()}`);
      }
      if (inputNumber <= 0) {
        this.inputSize.set(`${this.size()}`);
      } else if (inputNumber !== this.size()) {
        this.size.set(inputNumber);
        this.sizeChanged();
      }
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
