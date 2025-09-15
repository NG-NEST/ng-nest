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
  private removeScrollListener: (() => void) | null = null;
  private contentMutationObserver: MutationObserver | null = null;
  private typingObserver: MutationObserver | null = null;

  bubbles = contentChildren(XBubbleComponent);

  ngAfterViewInit(): void {
    this.parentScrollElement = this.getParentScrollElement(this.elementRef.nativeElement);

    if (this.parentScrollElement) {
      this.removeScrollListener = this.renderer.listen(this.parentScrollElement, 'scroll', () => {
        const atBottom =
          this.parentScrollElement!.scrollHeight - this.parentScrollElement!.scrollTop ===
          this.parentScrollElement!.clientHeight;
        if (!atBottom) {
          this.isFollowing = false;
        } else {
          this.isFollowing = true;
        }
      });
      this.observeContentChanges();
    }
  }

  ngDoCheck(): void {
    const bubbles = this.bubbles();
    if (bubbles.length <= 0) return;
    const lastBubble = bubbles[bubbles.length - 1];
    if (lastBubble && lastBubble.typing() && lastBubble.pendingContent().length > 0) {
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
    if (this.removeScrollListener) {
      this.removeScrollListener();
    }
    if (this.contentMutationObserver) {
      this.contentMutationObserver.disconnect();
    }
    this.stopTypingObserver();
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
    const bubbleContent = bubble.contentRef()?.nativeElement;
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
    if (this.parentScrollElement) {
      this.parentScrollElement.scrollTop = this.parentScrollElement.scrollHeight;
    }
  }

  scrollToTop(): void {
    if (this.parentScrollElement) {
      this.parentScrollElement.scrollTop = 0;
    }
  }
}
