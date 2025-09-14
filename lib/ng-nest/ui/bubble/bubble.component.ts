import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  computed,
  viewChild,
  TemplateRef,
  ViewContainerRef,
  ChangeDetectorRef,
  inject,
  ElementRef,
  Renderer2,
  signal,
  AfterContentChecked
} from '@angular/core';
import { XBubblePrefix, XBubbleProperty, XBUbbleTypingStep } from './bubble.property';
import { XOutletDirective } from '@ng-nest/ui/outlet';
import { XIsEmpty } from '@ng-nest/ui/core';
import { NgClass, NgTemplateOutlet } from '@angular/common';
import { XAvatarComponent } from '@ng-nest/ui/avatar';
import { XLoadingComponent } from '@ng-nest/ui/loading';

@Component({
  selector: 'x-bubble',
  templateUrl: './bubble.component.html',
  styleUrls: ['./bubble.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgClass, NgTemplateOutlet, XOutletDirective, XAvatarComponent, XLoadingComponent]
})
export class XBubbleComponent extends XBubbleProperty implements AfterContentChecked {
  vcr = inject(ViewContainerRef);
  cdr = inject(ChangeDetectorRef);
  host = inject(ElementRef<HTMLElement>);
  renderer = inject(Renderer2);

  classMap = computed(() => ({
    [`${XBubblePrefix}-${this.variant()}`]: !XIsEmpty(this.variant()),
    [`${XBubblePrefix}-${this.placement()}`]: !XIsEmpty(this.placement()),
    [`x-size-${this.size()}`]: !XIsEmpty(this.size()),
    [`${XBubblePrefix}-typing`]: this.typing()
  }));

  typingContentTpl = viewChild<TemplateRef<any>>('typingContentTpl');
  typingOutput = viewChild<ElementRef>('typingOutput');

  outputing = signal(false);
  initing = signal(true);

  private steps: XBUbbleTypingStep[] = [];
  private idx = 0;
  private timer: any;

  ngAfterViewInit(): void {
    if (!this.typing()) return;
    this.initTypingFromContent();
  }

  ngAfterContentChecked() {
    if (!this.typing() || this.initing()) return;
    this.handleContentChange(this.getContentElement().innerHTML);
  }

  private initTypingFromContent() {
    this.steps = [];
    this.idx = 0;
    this.walkCollectAttrs(this.getContentElement(), this.steps);
    this.startTypingWithDom();
  }

  getContentElement() {
    const tmp = this.renderer.createElement('span');
    const view = this.vcr.createEmbeddedView(this.typingContentTpl()!);
    view.detectChanges();
    view.rootNodes.forEach((node) => tmp.appendChild(node.cloneNode(true)));
    view.destroy();

    return tmp;
  }

  handleContentChange(newContent: string) {
    if (!this.typing()) return;

    // 已输出的文本（纯字符，不含标签）
    const oldText = this.steps
      .slice(0, this.idx)
      .filter((s) => s.type === 'char')
      .map((s) => s.char)
      .join('');

    // 新内容的纯文本
    const tmp = this.renderer.createElement('span');
    tmp.innerHTML = newContent;
    const newText = tmp.innerText; // 只取纯文本

    if (newText.startsWith(oldText)) {
      // 只追加新增的部分
      const appendText = newText.slice(oldText.length);
      this.addStepsFromHtml(appendText);
    } else {
      // 前缀不同 → 重置
      this.resetTyping();
      this.addStepsFromHtml(newText);
    }
  }

  /** 将 HTML 字符串解析为 steps */
  private addStepsFromHtml(text: string) {
    if (!text) return;
    const tmp = this.renderer.createElement('span');
    tmp.textContent = text; // 纯文本
    this.walkCollectAttrs(tmp, this.steps);
    if (!this.timer) this.startTypingWithDom();
  }

  private walkCollectAttrs(node: Node, steps: XBUbbleTypingStep[]) {
    if (node.nodeType === Node.TEXT_NODE) {
      const chars = (node.textContent || '').split('');
      chars.forEach((c) => steps.push({ type: 'char', char: c }));
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      const el = node as HTMLElement;
      const attrs: Record<string, string> = {};
      for (let i = 0; i < el.attributes.length; i++) {
        const a = el.attributes[i];
        attrs[a.name] = a.value;
      }
      steps.push({ type: 'open', tag: el.tagName.toLowerCase(), attrs });
      Array.from(el.childNodes).forEach((child) => this.walkCollectAttrs(child, steps));
      steps.push({ type: 'close', tag: el.tagName.toLowerCase() });
    }
  }

  private startTypingWithDom() {
    this.clearTimer();
    const outEl = this.typingOutput()?.nativeElement;
    if (!outEl) return;

    const stack: HTMLElement[] = [outEl];
    const interval = Math.max(1, this.speed());
    this.outputing.set(true);

    this.timer = setInterval(() => {
      if (this.idx >= this.steps.length) {
        this.clearTimer();
        this.outputing.set(false);
        this.initing.set(false);
        return;
      }

      const step = this.steps[this.idx++];
      const currentParent = stack[stack.length - 1];

      if (step.type === 'open') {
        const el = this.renderer.createElement(step.tag!);
        if (step.attrs) Object.entries(step.attrs).forEach(([k, v]) => el.setAttribute(k, v));
        currentParent.appendChild(el);
        stack.push(el);
      } else if (step.type === 'char') {
        const tn = this.renderer.createText(step.char!);
        currentParent.appendChild(tn);
      } else if (step.type === 'close') {
        stack.pop();
      }
    }, interval);
  }

  private resetTyping() {
    this.clearTimer();
    this.idx = 0;
    this.steps = [];
    const outEl = this.typingOutput()?.nativeElement;
    if (outEl) outEl.innerHTML = '';
  }

  private clearTimer() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  ngOnDestroy() {
    this.clearTimer();
  }
}
