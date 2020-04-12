import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  ElementRef,
  Renderer2,
  AfterViewInit,
  OnChanges,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { XHighlightPrefix, XHighlightProperty } from './highlight.property';
import * as hljs from 'highlight.js';

@Component({
  selector: `${XHighlightPrefix}`,
  templateUrl: './highlight.component.html',
  styleUrls: ['./style/index.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XHighlightComponent extends XHighlightProperty implements OnChanges, AfterViewInit {
  @ViewChild('code', { static: false }) codeRef: ElementRef;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
    super();
    this.renderer.addClass(this.elementRef.nativeElement, XHighlightPrefix);
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
