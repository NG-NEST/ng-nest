import {
  ChangeDetectionStrategy,
  Component,
  contentChildren,
  ElementRef,
  inject,
  Renderer2,
  ViewEncapsulation
} from '@angular/core';
import { XBubblesProperty } from './bubble.property';
import { XBubbleComponent } from './bubble.component';
import { fromEvent, Subject, Subscription, takeUntil } from 'rxjs';

@Component({
  selector: 'x-bubbles',
  templateUrl: './bubbles.component.html',
  styleUrls: ['./bubbles.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: []
})
export class XBubblesComponent extends XBubblesProperty {
  elementRef = inject(ElementRef);
  renderer = inject(Renderer2);

  private parentScrollElement: HTMLElement | null = null;
  private isFollowing = true;
  private removeScrollListener: Subscription | null = null;
  private contentMutationObserver: MutationObserver | null = null;
  private typingObserver: MutationObserver | null = null;
  private $destroy = new Subject<void>();

  bubbles = contentChildren(XBubbleComponent);

  ngAfterViewInit(): void {
    this.stepScroll();
    this.observeContentChanges();
  }

  ngDoCheck(): void {
    const bubbles = this.bubbles();
    if (bubbles.length <= 0) return;
    const lastBubble = bubbles[bubbles.length - 1];
    if (
      lastBubble &&
      lastBubble.typing() &&
      (lastBubble.pendingContent().length > 0 || lastBubble.reasoningPendingContent().length > 0)
    ) {
      if (!this.typingObserver) {
        this.startTypingObserver(lastBubble);
      }
    } else {
      if (this.typingObserver) {
        this.stopTypingObserver();
      }
    }
  }

  ngOnDestroy(): void {
    this.removeScrollListener?.unsubscribe();
    this.contentMutationObserver?.disconnect();
    this.stopTypingObserver();
    this.$destroy.next();
    this.$destroy.complete();
  }

  private stepScroll() {
    const newScroll = this.getParentScrollElement(this.elementRef.nativeElement);
    if (this.parentScrollElement && newScroll === this.parentScrollElement) return;
    this.parentScrollElement = newScroll;
    if (this.parentScrollElement) {
      this.removeScrollListener?.unsubscribe();
      this.removeScrollListener = fromEvent(this.parentScrollElement, 'scroll')
        .pipe(takeUntil(this.$destroy))
        .subscribe((event: Event) => {
          const atBottom =
            this.parentScrollElement!.scrollHeight - this.parentScrollElement!.scrollTop ===
            this.parentScrollElement!.clientHeight;
          if (!atBottom) {
            this.isFollowing = false;
          } else {
            this.isFollowing = true;
          }
          this.scrollChange.emit(event);
        });
    }
  }

  private getParentScrollElement(element: HTMLElement): HTMLElement | null {
    let parent = this.renderer.parentNode(element) as HTMLElement;
    while (parent && parent.nodeType === 1) {
      const overflowY = getComputedStyle(parent).overflowY;
      if (overflowY === 'auto' || overflowY === 'scroll') {
        return parent;
      }
      parent = this.renderer.parentNode(parent);
    }
    return null;
  }
  private observeContentChanges(): void {
    this.contentMutationObserver = new MutationObserver(() => {
      this.isFollowing = true;
      this.scrollToBottom();
    });

    this.contentMutationObserver.observe(this.elementRef.nativeElement, { childList: true });
  }

  private startTypingObserver(bubble: XBubbleComponent): void {
    const bubbleContent = bubble.wrapperRef()?.nativeElement;
    if (bubbleContent) {
      this.typingObserver = new MutationObserver(() => {
        if (this.isFollowing) {
          this.scrollToBottom();
        }
      });

      this.typingObserver.observe(bubbleContent, {
        childList: true,
        subtree: true,
        characterData: true
      });
    }
  }

  private stopTypingObserver(): void {
    if (this.typingObserver) {
      this.typingObserver.disconnect();
      this.typingObserver = null;
    }
  }

  scrollToBottom(): void {
    this.stepScroll();
    if (this.parentScrollElement) {
      this.parentScrollElement.scrollTop = this.parentScrollElement.scrollHeight;
    }
  }

  scrollToTop(): void {
    this.stepScroll();
    if (this.parentScrollElement) {
      this.parentScrollElement.scrollTop = 0;
    }
  }
}
