import { Component, ViewEncapsulation, ChangeDetectionStrategy, Renderer2, ElementRef, ContentChildren, QueryList } from '@angular/core';
import { XDescriptionPrefix, XDescriptionProperty } from './description.property';
import { XConfigService } from '@ng-nest/ui/core';
import { XDescriptionItemComponent } from './description-item.component';

@Component({
  selector: `${XDescriptionPrefix}`,
  templateUrl: './description.component.html',
  styleUrls: ['./style/index.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XDescriptionComponent extends XDescriptionProperty {
  @ContentChildren(XDescriptionItemComponent) items!: QueryList<XDescriptionItemComponent>;
  constructor(private renderer: Renderer2, private elementRef: ElementRef, public configService: XConfigService) {
    super();
  }
}
