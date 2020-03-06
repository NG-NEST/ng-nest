import {
  Component,
  OnInit,
  ViewEncapsulation,
  Renderer2,
  ElementRef,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  ViewChild,
  SimpleChanges,
  OnChanges,
  Output,
  EventEmitter,
  Input
} from '@angular/core';
import { XCommentReplyPrefix } from './comment.type';
import { XInputNumber } from '@ng-nest/ui/core';

@Component({
  selector: `${XCommentReplyPrefix}`,
  templateUrl: './comment-reply.component.html',
  styleUrls: ['./comment-reply.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XCommentReplyComponent implements OnInit, OnChanges {
  @Input() @XInputNumber() maxlength: number = 300;
  @Output() sureClick = new EventEmitter();
  @ViewChild('commentReply', { static: true }) commentReply: ElementRef;
  inputValue: string;

  constructor(public renderer: Renderer2, public elementRef: ElementRef, public cdr: ChangeDetectorRef) {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {}

  sureOnClick() {
    this.sureClick.emit(this.inputValue);
  }
}
