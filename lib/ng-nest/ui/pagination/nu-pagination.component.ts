import {
  Component,
  OnInit,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  OnChanges,
  SimpleChanges,
  ElementRef,
  Renderer2,
  ChangeDetectorRef,
  Input,
  Output,
  EventEmitter
} from "@angular/core";
import { PaginationPrefix, NuPaginationOption } from "./nu-pagination.type";
import { fillDefault } from "@ng-nest/ui/core";

@Component({
  selector: "nu-pagination",
  templateUrl: "./nu-pagination.component.html",
  styleUrls: ["./style/index.scss"],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NuPaginationComponent implements OnInit, OnChanges {
  @Input() nuIndex?: number;
  @Input() nuSize?: number;
  @Input() nuTotal?: number;
  @Output() nuIndexChange = new EventEmitter<number>();
  private _default: NuPaginationOption = {
    nuIndex: 1,
    nuSize: 10,
    nuTotal: 0
  };

  lastIndex?: number;
  indexes: number[] = [];
  indexFirst: number = 1;
  indexLast: number = 1;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private cdr: ChangeDetectorRef
  ) {
    this.renderer.addClass(this.elementRef.nativeElement, PaginationPrefix);
  }

  ngOnInit() {
    fillDefault(this, this._default);
  }

  ngAfterViewInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.nuTotal || changes.nuSize || changes.nuIndex) {
      this.setIndexes();
    }
  }

  setIndexes() {
    this.lastIndex = Math.ceil(this.nuTotal / this.nuSize);
    const indexes = [];
    if (this.lastIndex <= 9) {
      for (let i = 2; i <= this.lastIndex - 1; i++) {
        indexes.push(i);
      }
    } else {
      const current = this.nuIndex;
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
    this.nuIndex = this.validateIndex(isDiff ? this.nuIndex + index : index);
    this.setIndexes();
    this.nuIndexChange.emit(this.nuIndex);
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
}
