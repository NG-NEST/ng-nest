import {
  Component,
  ViewEncapsulation,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  SimpleChanges,
  OnChanges,
  inject
} from '@angular/core';
import { XCommentPrefix, XCommentNode, XCommentProperty } from './comment.property';
import { XIsEmpty, XIsChange, XSetData, XGetChildren, XConfigService } from '@ng-nest/ui/core';
import { Subject } from 'rxjs';
import { XI18nService, XI18nPipe } from '@ng-nest/ui/i18n';
import { takeUntil } from 'rxjs/operators';
import { XAvatarComponent } from '@ng-nest/ui/avatar';
import { XButtonComponent, XButtonsComponent } from '@ng-nest/ui/button';
import { XLinkComponent } from '@ng-nest/ui/link';
import { XTextRetractComponent } from '@ng-nest/ui/text-retract';
import { XTimeAgoPipe } from '@ng-nest/ui/time-ago';
import { XCommentReplyComponent } from './comment-reply.component';

@Component({
  selector: `${XCommentPrefix}`,
  standalone: true,
  imports: [
    XI18nPipe,
    XLinkComponent,
    XAvatarComponent,
    XButtonComponent,
    XButtonsComponent,
    XTextRetractComponent,
    XTimeAgoPipe,
    XCommentReplyComponent
  ],
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XCommentComponent extends XCommentProperty implements OnChanges {
  nodes: XCommentNode[] = [];
  private _unSubject = new Subject<void>();
  private cdr = inject(ChangeDetectorRef);
  private i18n = inject(XI18nService);
  configService = inject(XConfigService);

  ngOnInit() {
    this.i18n.localeChange.pipe(takeUntil(this._unSubject)).subscribe(() => {
      this.cdr.markForCheck();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { data } = changes;
    XIsChange(data) && this.setData();
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

  hasMore(node: XCommentNode) {
    return (node.count as number) > (node.children?.length as number);
  }

  trackByNode(_index: number, item: XCommentNode) {
    return item.id;
  }

  private setData() {
    XSetData<XCommentNode>(this.data, this._unSubject).subscribe((x) => {
      this.nodes = x.filter((y) => XIsEmpty(y.pid)).map((y) => XGetChildren<XCommentNode>(x, y, 0));
      this.cdr?.detectChanges();
    });
  }
}
