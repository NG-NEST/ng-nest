import { ChangeDetectionStrategy, Component, TemplateRef, ViewChild, Input, ViewEncapsulation } from '@angular/core';
import { XTemplate } from '@ng-nest/ui/core';
import { XTabPrefix } from './tabs.property';

@Component({
  selector: `${XTabPrefix}`,
  templateUrl: './tab.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XTabComponent {
  @Input() label: XTemplate;
  @ViewChild(TemplateRef, { static: true }) content: TemplateRef<void>;
}
