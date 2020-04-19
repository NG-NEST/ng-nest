import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  ElementRef,
  Renderer2,
  OnChanges,
  ViewChild,
  ChangeDetectorRef,
  SimpleChanges,
  AfterViewChecked
} from '@angular/core';
import { XHighlightPrefix, XHighlightProperty } from './highlight.property';
import * as hljs from 'highlight.js';
import { XIsChange, XIsUndefined, XIsEmpty } from '@ng-nest/ui/core';

@Component({
  selector: `${XHighlightPrefix}`,
  templateUrl: './highlight.component.html',
  styleUrls: ['./style/index.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XHighlightComponent extends XHighlightProperty implements OnChanges, AfterViewChecked {
  @ViewChild('code', { static: false }) codeRef: ElementRef;

  constructor(public elementRef: ElementRef, public renderer: Renderer2, public cdr: ChangeDetectorRef) {
    super();
    this.renderer.addClass(this.elementRef.nativeElement, XHighlightPrefix);
  }

  ngOnChanges(changes: SimpleChanges): void {
    XIsChange(changes.data) && this.cdr.detectChanges();
  }

  ngAfterViewChecked(): void {
    if (XIsEmpty(this.data)) this.data = '';
    this.codeRef.nativeElement.innerText = this.data;
    hljs.highlightBlock(this.codeRef.nativeElement);
  }
}
