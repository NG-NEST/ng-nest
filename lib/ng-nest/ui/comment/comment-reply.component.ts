import {
  Component,
  ViewEncapsulation,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  inject
} from '@angular/core';
import { XCommentReplyPrefix, XCommentReplyProperty } from './comment.property';
import { XConfigService } from '@ng-nest/ui/core';
import { takeUntil } from 'rxjs/operators';
import { XI18nService, XI18nPipe } from '@ng-nest/ui/i18n';
import { Subject } from 'rxjs';
import { XInputComponent } from '@ng-nest/ui/input';
import { XButtonComponent } from '@ng-nest/ui/button';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: `${XCommentReplyPrefix}`,
  standalone: true,
  imports: [CommonModule, FormsModule, XInputComponent, XI18nPipe, XButtonComponent],
  templateUrl: './comment-reply.component.html',
  styleUrls: ['./comment-reply.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XCommentReplyComponent extends XCommentReplyProperty {
  inputValue!: string;
  private _unSubject = new Subject<void>();
  private cdr = inject(ChangeDetectorRef);
  private i18n = inject(XI18nService);
  configService = inject(XConfigService);

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
