import { Component, ViewEncapsulation, Renderer2, ElementRef, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { XCommentReplyPrefix, XCommentReplyProperty } from './comment.property';
import { XConfigService } from '@ng-nest/ui/core';
import { takeUntil } from 'rxjs/operators';
import { XI18nService } from '@ng-nest/ui/i18n';
import { Subject } from 'rxjs';

@Component({
  selector: `${XCommentReplyPrefix}`,
  templateUrl: './comment-reply.component.html',
  styleUrls: ['./comment-reply.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XCommentReplyComponent extends XCommentReplyProperty {
  inputValue!: string;
  private _unSubject = new Subject<void>();

  constructor(
    public renderer: Renderer2,
    public elementRef: ElementRef<HTMLElement>,
    public cdr: ChangeDetectorRef,
    public i18n: XI18nService,
    public configService: XConfigService
  ) {
    super();
  }

  ngOnInit() {
    this.i18n.localeChange.pipe(takeUntil(this._unSubject)).subscribe(() => {
      this.cdr.markForCheck();
    });
  }

  ngOnDestroy(): void {
    this._unSubject.next();
    this._unSubject.unsubscribe();
  }

  sureOnClick() {
    this.sureClick.emit(this.inputValue);
  }
}
