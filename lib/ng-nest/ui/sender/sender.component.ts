import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  viewChild,
  ElementRef,
  computed,
  signal,
  inject
} from '@angular/core';
import { XSenderProperty } from './sender.property';
import { XValueAccessor } from '@ng-nest/ui/base-form';
import { TextFieldModule } from '@angular/cdk/text-field';
import { XButtonComponent } from '@ng-nest/ui/button';
import { FormsModule } from '@angular/forms';
import { NgTemplateOutlet } from '@angular/common';
import { XSenderStopComponent } from './stop.component';

@Component({
  selector: 'x-sender',
  templateUrl: './sender.component.html',
  styleUrls: ['./sender.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [XValueAccessor(XSenderComponent)],
  imports: [TextFieldModule, FormsModule, NgTemplateOutlet, XButtonComponent, XSenderStopComponent]
})
export class XSenderComponent extends XSenderProperty {
  elementRef = inject(ElementRef);
  textarea = viewChild.required<ElementRef<HTMLTextAreaElement>>('textarea');

  focused = signal(false);
  maxRowsComputed = computed(() => {
    const rows = this.maxRows();
    return rows === Number.MAX_SAFE_INTEGER ? undefined : rows;
  });
  placeholderComputed = computed(() => {
    const placeholder = this.placeholder() as string;
    return placeholder;
  });

  onKeydown(event: KeyboardEvent) {
    if (this.submitType() === 'enter') {
      if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        this.onEnterPressed(event);
      }
    } else if (this.submitType() === 'shiftEnter') {
      if (event.key === 'Enter' && event.shiftKey) {
        event.preventDefault();
        this.onEnterPressed(event);
      }
    }
  }

  onEnterPressed(event: Event) {
    this.submit.emit(event);
  }

  onStop(event: Event) {
    this.stop.emit(event);
  }

  inputFocus(type: 'focus' | 'select' | 'before' | 'after' = 'after') {
    this.textarea().nativeElement.focus();
    if (!this.value()) return;
    if (type === 'after') {
      this.textarea().nativeElement.setSelectionRange(this.value().length, this.value().length);
    } else if (type === 'before') {
      this.textarea().nativeElement.setSelectionRange(0, 0);
    } else if (type === 'select') {
      this.textarea().nativeElement.setSelectionRange(0, this.value().length);
    }
  }

  change(value: any) {
    if (this.onChange) this.onChange(value);
  }
}
