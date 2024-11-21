import { Component, ViewEncapsulation, ChangeDetectionStrategy, computed, signal } from '@angular/core';
import { XTextRetractPrefix, XTextRetractProperty } from './text-retract.property';
import { XI18nPipe } from '@ng-nest/ui/i18n';
import { FormsModule } from '@angular/forms';
import { XLinkComponent } from '@ng-nest/ui/link';

@Component({
  selector: `${XTextRetractPrefix}`,
  imports: [FormsModule, XLinkComponent, XI18nPipe],
  templateUrl: './text-retract.component.html',
  styleUrls: ['./text-retract.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XTextRetractComponent extends XTextRetractProperty {
  displayValue = computed(() => {
    const content = this.content();
    const max = this.max();
    const unfold = this.unfold();
    if (unfold) {
      if (content && content.length > max) {
        return content.substring(0, max);
      } else {
        return content;
      }
    } else {
      return content;
    }
  });
  retract = computed(() => {
    const content = this.content();
    return content && content.length > this.max();
  });
  unfold = signal(false);

  toggle() {
    this.unfold.update((x) => !x);
  }
}
