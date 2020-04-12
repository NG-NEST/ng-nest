import { Component, ViewEncapsulation, Renderer2, ElementRef, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { XCommentReplyPrefix, XCommentReplyProperty } from './comment.property';

@Component({
  selector: `${XCommentReplyPrefix}`,
  templateUrl: './comment-reply.component.html',
  styleUrls: ['./comment-reply.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XCommentReplyComponent extends XCommentReplyProperty {
  inputValue: string;

  constructor(public renderer: Renderer2, public elementRef: ElementRef, public cdr: ChangeDetectorRef) {
    super();
  }

  sureOnClick() {
    this.sureClick.emit(this.inputValue);
  }
}
