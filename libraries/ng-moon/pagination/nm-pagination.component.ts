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
  Input
} from "@angular/core";
import { PaginationPrefix, NmPaginationOption } from "./nm-pagination.type";
import { fillDefault } from "ng-moon/core";

@Component({
  selector: "nm-pagination",
  templateUrl: "./nm-pagination.component.html",
  styleUrls: ["./style/index.scss"],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NmPaginationComponent implements OnInit, OnChanges {
  @Input() nmIndex?: number;
  @Input() nmSize?: number;
  @Input() nmTotal?: number;
  private _default: NmPaginationOption = {
    nmIndex: 1,
    nmSize: 10,
    nmTotal: 0
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
    if (changes.nmTotal || changes.nmSize || changes.nmIndex) {
      this.setIndexes();
    }
  }

  setIndexes() {
    this.lastIndex = Math.ceil(this.nmTotal / this.nmSize);
    const indexes = [];
    if (this.lastIndex <= 9) {
      for (let i = 2; i <= this.lastIndex - 1; i++) {
        indexes.push(i);
      }
    } else {
      const current = this.nmIndex;
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
      this.indexFirst = this.indexes[0];
      this.indexLast = this.indexes[this.indexes.length - 1];
    }
    this.cdr.detectChanges();
  }

  previous() {
    if (this.nmIndex > 1) this.nmIndex--;
    this.setIndexes();
  }

  next() {
    if (this.nmIndex < this.lastIndex) this.nmIndex++;
    this.setIndexes();
  }

  jump(index: number) {
    this.nmIndex = this.validateIndex(index);
    this.setIndexes();
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
