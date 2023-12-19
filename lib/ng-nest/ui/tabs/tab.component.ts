import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
  inject
} from '@angular/core';
import { XTabPrefix, XTabProperty } from './tabs.property';
import { XConfigService } from '@ng-nest/ui/core';
import { XTabLinkDirective, XTabLinkTemplateDirective } from './tab-link.directive';

@Component({
  selector: `${XTabPrefix}`,
  standalone: true,
  templateUrl: './tab.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XTabComponent extends XTabProperty {
  @ViewChild('contentTpl', { static: true }) content!: TemplateRef<void>;
  @ContentChild(XTabLinkTemplateDirective) linkTemplateDirective!: XTabLinkTemplateDirective;
  @ContentChild(XTabLinkDirective) linkDirective!: XTabLinkDirective;
  configService = inject(XConfigService);
}
