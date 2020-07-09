import {
  Component,
  ViewEncapsulation,
  Renderer2,
  ElementRef,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  SimpleChanges,
  OnChanges
} from '@angular/core';
import { XCommentPrefix, XCommentNode, XCommentProperty } from './comment.property';
import { XIsEmpty, XIsChange, XSetData, XGetChildren, XConfigService } from '@ng-nest/ui/core';
import { Subject } from 'rxjs';

@Component({
  selector: `${XCommentPrefix}`,
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XCommentComponent extends XCommentProperty implements OnChanges {
  nodes: XCommentNode[] = [];
  private _unSubject = new Subject<void>();

  constructor(
    public renderer: Renderer2,
    public elementRef: ElementRef,
    public cdr: ChangeDetectorRef,
    public configService: XConfigService
  ) {
    super();
  }

  ngOnChanges(changes: SimpleChanges): void {
    XIsChange(changes.data) && this.setData();
  }

  ngOnDestroy(): void {
    this._unSubject.next();
    this._unSubject.unsubscribe();
  }

  likeOnClick(node: XCommentNode) {
    this.likeClick.emit(node);
  }

  commentOnClick(node: XCommentNode) {
    node.commentShow = !node.commentShow;
    this.commentClick.emit(node);
    this.cdr.detectChanges();
  }

  replyOnClick(node: XCommentNode) {
    node.commentShow = !node.commentShow;
    this.replyClick.emit(node);
    this.cdr.detectChanges();
  }

  sureOnClick(content: string, node: XCommentNode) {
    node.replyContent = content;
    this.sureClick.emit(node);
  }

  moreOnClick(node: XCommentNode) {
    this.moreClick.emit(node);
  }

  private setData() {
    XSetData<XCommentNode>(this.data, this._unSubject).subscribe((x) => {
      this.nodes = x.filter((y) => XIsEmpty(y.pid)).map((y) => XGetChildren<XCommentNode>(x, y, 0));
      this.cdr.detectChanges();
    });
  }
}
