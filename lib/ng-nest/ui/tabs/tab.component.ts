import {
  ChangeDetectionStrategy,
  Component,
  TemplateRef,
  ViewEncapsulation,
  contentChild,
  viewChild
} from '@angular/core';
import { XTabPrefix, XTabProperty } from './tabs.property';
import { XTabLinkDirective, XTabLinkTemplateDirective } from './tab-link.directive';

@Component({
  selector: `${XTabPrefix}`,
  standalone: true,
  templateUrl: './tab.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XTabComponent extends XTabProperty {
  content = viewChild('contentTpl', { read: TemplateRef<any> });
  linkTemplateDirective = contentChild(XTabLinkTemplateDirective);
  linkDirective = contentChild(XTabLinkDirective);
}
