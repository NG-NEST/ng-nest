import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  HostBinding,
  HostListener,
  computed,
  signal,
  viewChild,
  ElementRef
} from '@angular/core';
import { XTagPrefix, XTagProperty } from './tag.property';
import { XIsEmpty } from '@ng-nest/ui/core';
import { NgClass } from '@angular/common';
import { XIconComponent } from '@ng-nest/ui/icon';

@Component({
  selector: `${XTagPrefix}`,
  imports: [NgClass, XIconComponent],
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XTagComponent extends XTagProperty {
  animating = signal(false);
  hasContent = signal(true);
  tag = viewChild.required<ElementRef<HTMLElement>>('tag');

  @HostBinding('animate.enter') animateEnter = 'x-base-enter';
  @HostBinding('animate.leave') animateLeave = 'x-base-leave';

  @HostListener('animationend') done() {
    this.animating.set(false);
  }
  @HostListener('animationstart') start() {
    this.animating.set(true);
  }

  classMap = computed(() => ({
    [`${XTagPrefix}-${this.type()}`]: !XIsEmpty(this.type()),
    [`${XTagPrefix}-${this.size()}`]: !XIsEmpty(this.size()),
    [`${XTagPrefix}-dark`]: this.dark(),
    [`${XTagPrefix}-checked`]: this.checked()
  }));

  onClick() {
    if (!this.checked() || this.manual()) return;
    this.selected.update((x) => !x);
  }

  onClose(event: Event) {
    if (this.disabled()) return;
    this.close.emit(event);
  }

  ngAfterContentChecked() {
    const el = this.tag().nativeElement;
    this.hasContent.set(el.children.length > 0 || el.textContent!.trim().length > 0);
  }
}
