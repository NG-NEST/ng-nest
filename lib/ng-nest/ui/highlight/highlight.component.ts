import {
  Component,
  OnInit,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  ElementRef,
  Renderer2,
  Input,
  AfterViewInit,
  OnChanges,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { HighlightPrefix, XHighlightInput } from './highlight.type';
import { fillDefault } from '@ng-nest/ui/core';
import * as hljs from 'highlight.js';

@Component({
  selector: 'x-highlight',
  templateUrl: './highlight.component.html',
  styleUrls: ['./style/index.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XHighlightComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() type?: string;
  @Input() data?: string;

  @ViewChild('code', { static: false }) codeRef: ElementRef;

  private _default: XHighlightInput = {};

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
    this.renderer.addClass(this.elementRef.nativeElement, HighlightPrefix);
  }

  ngOnInit() {
    fillDefault(this, this._default);
  }

  ngOnChanges(changes: SimpleChanges): void {
    const dataChange = changes.data;
    if (
      typeof dataChange != 'undefined' &&
      typeof dataChange.currentValue != 'undefined' &&
      typeof dataChange.currentValue != null &&
      dataChange.currentValue != '' &&
      dataChange.currentValue !== dataChange.previousValue
    ) {
      setTimeout(() => hljs.highlightBlock(this.codeRef.nativeElement));
    }
  }

  ngAfterViewInit() {
    if (typeof this.data != 'undefined' && typeof this.data != null && this.data != '') {
      hljs.highlightBlock(this.codeRef.nativeElement);
    }
  }
}
