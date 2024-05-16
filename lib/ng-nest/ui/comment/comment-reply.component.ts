import { Component, ViewEncapsulation, ChangeDetectionStrategy, signal } from '@angular/core';
import { XCommentReplyPrefix, XCommentReplyProperty } from './comment.property';
import { XI18nPipe } from '@ng-nest/ui/i18n';
import { XInputComponent } from '@ng-nest/ui/input';
import { XButtonComponent } from '@ng-nest/ui/button';
import { FormsModule } from '@angular/forms';

@Component({
  selector: `${XCommentReplyPrefix}`,
  standalone: true,
  imports: [FormsModule, XInputComponent, XI18nPipe, XButtonComponent],
  templateUrl: './comment-reply.component.html',
  styleUrls: ['./comment-reply.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XCommentReplyComponent extends XCommentReplyProperty {
  inputValue = signal<string>('');

  sureOnClick() {
    this.sureClick.emit(this.inputValue());
  }
}
