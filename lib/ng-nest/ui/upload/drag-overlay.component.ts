import { input, ChangeDetectionStrategy, Component, ViewEncapsulation, computed } from '@angular/core';
import { XTemplate } from '@ng-nest/ui/core';
import { XOutletDirective } from '@ng-nest/ui/outlet';
import { XIconComponent } from '@ng-nest/ui/icon';

@Component({
  selector: 'x-drag-overlay',
  templateUrl: './drag-overlay.component.html',
  styleUrl: './drag-overlay.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [XOutletDirective, XIconComponent]
})
export class XDragOverlayComponent {
  icon = input<XTemplate>();
  title = input<XTemplate>();
  description = input<XTemplate>();

  iconString = computed(() => this.icon() as string);
}
