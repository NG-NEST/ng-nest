import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  computed,
  viewChild,
  ElementRef,
  signal,
  effect,
  SimpleChanges,
  inject,
  Renderer2,
  ChangeDetectorRef
} from '@angular/core';
import { XBubblePrefix, XBubbleProperty } from './bubble.property';
import { XOutletDirective } from '@ng-nest/ui/outlet';
import { XIsEmpty, XIsString, XIsTemplateRef, XSize, XVariant } from '@ng-nest/ui/core';
import { NgClass } from '@angular/common';
import { XAvatarComponent } from '@ng-nest/ui/avatar';
import { XLoadingComponent } from '@ng-nest/ui/loading';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { toObservable } from '@angular/core/rxjs-interop';
import { isObservable } from 'rxjs';
import { XIconComponent } from '@ng-nest/ui/icon';
import { X_BUBBLES_CONTEXT } from './bubbles.token';

@Component({
  selector: 'x-bubble',
  templateUrl: './bubble.component.html',
  styleUrls: ['./bubble.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgClass, XOutletDirective, XAvatarComponent, XIconComponent, XLoadingComponent]
})
export class XBubbleComponent extends XBubbleProperty {
  sanitizer = inject(DomSanitizer);
  renderer2 = inject(Renderer2);
  cdr = inject(ChangeDetectorRef);
  private bubbles = inject(X_BUBBLES_CONTEXT, { optional: true });

  wrapperRef = viewChild<ElementRef<HTMLElement>>('wrapperRef');

  classMap = computed(() => ({
    [`${XBubblePrefix}-${this.variantSignal()}`]: !XIsEmpty(this.variantSignal()),
    [`${XBubblePrefix}-${this.placement()}`]: !XIsEmpty(this.placement()),
    [`${XBubblePrefix}-cursor`]: this.showCursor() && this.typing(),
    [`${XBubblePrefix}-typing`]:
      this.typing() && (this.pendingContent().length > 0 || this.reasoningPendingContent().length > 0),
    [`x-${this.sizeSignal()}`]: !XIsEmpty(this.sizeSignal())
  }));

  typedContent = signal('');
  typedContentObserver = toObservable(this.typedContent);
  pendingContent = signal('');
  pendingContentObserver = toObservable(this.pendingContent);

  reasoningTypedContent = signal('');
  reasoningTypedContentObserver = toObservable(this.reasoningTypedContent);
  reasoningPendingContent = signal('');
  reasoningRenderedContent = signal<SafeHtml>('');
  reasoningToggle = signal(true);

  private typingInterval: any = null;
  renderedContent = signal<SafeHtml>('');

  sizeSignal = computed(() => {
    return (this.bubbles?.size() || this.size()) as XSize;
  });

  variantSignal = computed(() => {
    return (this.bubbles?.variant() || this.variant()) as XVariant;
  });

  isTemplate = computed(() => {
    return XIsTemplateRef(this.content());
  });

  isString = computed(() => {
    return XIsString(this.content());
  });

  isReasoningTemplate = computed(() => {
    return XIsTemplateRef(this.reasoningContent());
  });

  isReasoningString = computed(() => {
    return XIsString(this.reasoningContent()) && !XIsEmpty(this.reasoningContent());
  });

  constructor() {
    super();
    effect(() => {
      if (this.isString() && !this.typing()) {
        this.stopTyping();

        if (this.reasoningPendingContent().length === 0) {
          this.typedContent.set(this.typedContent() + this.pendingContent());
          this.pendingContent.set('');
        }
      }
    });

    this.reasoningTypedContentObserver.subscribe(() => {
      const finalReasoningContent = this.typing()
        ? this.reasoningTypedContent()
        : (this.reasoningContent() as string) || '';
      const setValue = (value: string) => {
        this.reasoningRenderedContent.set(this.sanitizer.bypassSecurityTrustHtml(value));
      };

      if (this.renderer() && XIsString(finalReasoningContent)) {
        const rendered = this.renderer()!(finalReasoningContent);
        if (isObservable(rendered)) {
          rendered.subscribe((value) => {
            setValue(value);
          });
        } else {
          setValue(rendered as string);
        }
      } else {
        setValue(finalReasoningContent);
      }
    });

    this.typedContentObserver.subscribe(() => {
      const finalContent = this.typing() ? this.typedContent() : (this.content() as string) || '';
      const setValue = (value: string) => {
        this.renderedContent.set(this.sanitizer.bypassSecurityTrustHtml(value));
      };

      if (this.renderer() && XIsString(finalContent)) {
        const rendered = this.renderer()!(finalContent);
        if (isObservable(rendered)) {
          rendered.subscribe((value) => {
            setValue(value);
          });
        } else {
          setValue(rendered as string);
        }
      } else {
        setValue(finalContent);
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { content, reasoningContent } = changes;

    if (reasoningContent && this.isReasoningString()) {
      const newReasoningContent = reasoningContent.currentValue || '';
      const currentTypedReasoningContent = this.reasoningTypedContent();

      if (!this.typing()) {
        this.reasoningTypedContent.set(newReasoningContent);
        return;
      }

      if (newReasoningContent.startsWith(currentTypedReasoningContent)) {
        this.reasoningPendingContent.set(newReasoningContent.substring(currentTypedReasoningContent.length));
        if (this.reasoningPendingContent().length > 0 && !this.typingInterval) {
          this.startTyping();
        }
      } else {
        this.stopTyping();
        this.reasoningTypedContent.set('');
        this.reasoningPendingContent.set(newReasoningContent);
        this.startTyping();
      }
    }

    if (content && this.isString()) {
      const newFullContent = content.currentValue || '';
      const currentTypedContent = this.typedContent();

      if (!this.typing()) {
        if (this.reasoningPendingContent().length === 0) {
          this.typedContent.set(newFullContent);
        }
        return;
      }

      if (newFullContent.startsWith(currentTypedContent)) {
        this.pendingContent.set(newFullContent.substring(currentTypedContent.length));
        if (this.reasoningPendingContent().length === 0 && this.pendingContent().length > 0 && !this.typingInterval) {
          this.startTyping();
        }
      } else {
        this.stopTyping();
        this.typedContent.set('');
        this.pendingContent.set(newFullContent);
        if (this.reasoningPendingContent().length === 0 && this.pendingContent().length > 0) {
          this.startTyping();
        }
      }
    }
  }

  private startTyping(): void {
    if (this.typingInterval) {
      return;
    }

    if (this.reasoningPendingContent().length === 0 && this.pendingContent().length === 0) {
      return;
    }

    this.typingStart.emit();
    this.typingInterval = setInterval(() => {
      if (this.reasoningPendingContent().length > 0) {
        const nextChar = this.reasoningPendingContent().charAt(0);
        this.reasoningTypedContent.update((current) => current + nextChar);
        this.reasoningPendingContent.update((current) => current.substring(1));
        this.typingOuput.emit(nextChar);
      } else if (this.pendingContent().length > 0) {
        const nextChar = this.pendingContent().charAt(0);
        this.typedContent.update((current) => current + nextChar);
        this.pendingContent.update((current) => current.substring(1));
        this.typingOuput.emit(nextChar);
      } else {
        this.typingEnd.emit();
        this.stopTyping();
      }
    }, this.speed());
  }

  private stopTyping(): void {
    if (this.typingInterval) {
      clearInterval(this.typingInterval);
      this.typingInterval = null;
    }
  }

  onReasoningToggle() {
    this.reasoningToggle.update((x) => !x);
  }

  ngOnDestroy(): void {
    this.stopTyping();
  }
}
