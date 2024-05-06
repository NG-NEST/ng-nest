import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  HostBinding,
  HostListener,
  computed,
  signal
} from '@angular/core';
import { XTagPrefix, XTagProperty } from './tag.property';
import { XIsEmpty, XBaseAnimation } from '@ng-nest/ui/core';
import { NgClass } from '@angular/common';
import { XIconComponent } from '@ng-nest/ui/icon';

@Component({
  selector: `${XTagPrefix}`,
  standalone: true,
  imports: [NgClass, XIconComponent],
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [XBaseAnimation]
})
export class XTagComponent extends XTagProperty {
  @HostBinding('@x-base-animation') public animation = true;
  animating = signal(false);
  @HostListener('@x-base-animation.done', ['$event']) done() {
    this.animating.set(false);
  }
  @HostListener('@x-base-animation.start', ['$event']) start() {
    this.animating.set(true);
  }

  classMapSignal = computed(() => ({
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
}
