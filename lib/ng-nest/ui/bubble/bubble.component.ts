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
  Renderer2
} from '@angular/core';
import { XBubblePrefix, XBubbleProperty } from './bubble.property';
import { XOutletDirective } from '@ng-nest/ui/outlet';
import { XIsEmpty, XIsString, XIsTemplateRef } from '@ng-nest/ui/core';
import { NgClass } from '@angular/common';
import { XAvatarComponent } from '@ng-nest/ui/avatar';
import { XLoadingComponent } from '@ng-nest/ui/loading';
import { DomSanitizer } from '@angular/platform-browser';
import { XBubblesComponent } from './bubbles.component';
import { toObservable } from '@angular/core/rxjs-interop';

@Component({
  selector: 'x-bubble',
  templateUrl: './bubble.component.html',
  styleUrls: ['./bubble.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgClass, XOutletDirective, XAvatarComponent, XLoadingComponent]
})
export class XBubbleComponent extends XBubbleProperty {
  sanitizer = inject(DomSanitizer);
  renderer2 = inject(Renderer2);
  private bubbles = inject(XBubblesComponent, { optional: true, host: true });

  contentRef = viewChild<ElementRef<HTMLElement>>('contentRef');

  classMap = computed(() => ({
    [`${XBubblePrefix}-${this.variantSignal()}`]: !XIsEmpty(this.variantSignal()),
    [`${XBubblePrefix}-${this.placement()}`]: !XIsEmpty(this.placement()),
    [`${XBubblePrefix}-cursor`]: this.showCursor() && this.typing(),
    [`${XBubblePrefix}-typing`]: this.typing() && this.pendingContent().length > 0,
    [`x-size-${this.sizeSignal()}`]: !XIsEmpty(this.sizeSignal())
  }));

  typedContent = signal('');
  pendingContent = signal('');
  pendingContentObserver = toObservable(this.pendingContent);
  private typingInterval: any = null;

  sizeSignal = computed(() => {
    return this.bubbles?.size() || this.size();
  });

  variantSignal = computed(() => {
    return this.bubbles?.variant() || this.variant();
  });

  isTemplate = computed(() => {
    return XIsTemplateRef(this.content());
  });

  isString = computed(() => {
    return XIsString(this.content());
  });

  constructor() {
    super();
    effect(() => {
      if (this.isString() && !this.typing()) {
        this.stopTyping();
        this.typedContent.set(this.typedContent() + this.pendingContent());
        this.pendingContent.set('');
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { content } = changes;
    if (content && this.isString()) {
      const newFullContent = changes['content'].currentValue || '';
      const currentTypedContent = this.typedContent();

      if (!this.typing()) {
        this.typedContent.set(newFullContent);
        return;
      }

      if (newFullContent.startsWith(currentTypedContent)) {
        this.pendingContent.set(newFullContent.substring(currentTypedContent.length));
        this.startTyping();
      } else {
        this.stopTyping();
        this.typedContent.set('');
        this.pendingContent.set(newFullContent);
        this.startTyping();
      }
    }
  }

  get renderedContent() {
    const finalContent = this.typing() ? this.typedContent() : (this.content() as string) || '';
    let renderedString: string;

    if (this.renderer()) {
      renderedString = this.renderer()!(finalContent) || '';
    } else {
      renderedString = finalContent;
    }

    return this.sanitizer.bypassSecurityTrustHtml(renderedString);
  }

  private startTyping(): void {
    if (this.typingInterval) {
      return;
    }

    if (this.pendingContent().length === 0) {
      return;
    }

    this.typingStart.emit();
    this.typingInterval = setInterval(() => {
      if (this.pendingContent().length > 0) {
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

  ngOnDestroy(): void {
    this.stopTyping();
  }
}
