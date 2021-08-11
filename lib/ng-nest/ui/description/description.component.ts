import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  Renderer2,
  ElementRef,
  ContentChildren,
  QueryList,
  ChangeDetectorRef,
  SimpleChanges
} from '@angular/core';
import { XDescriptionPrefix, XDescriptionProperty } from './description.property';
import { XClearClass, XConfigService, XIsChange, XIsEmpty } from '@ng-nest/ui/core';
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

  ngOnInit() {
    this.setClassMap();
  }

  ngOnChanges(changes: SimpleChanges): void {
    XIsChange(changes.size) && this.setClassMap();
  }

  ngAfterViewInit() {
    this.setMerge();
  }

  setClassMap() {
    XClearClass(this.classMap);
    this.classMap = {
      [`${XDescriptionPrefix}-${this.size}`]: !XIsEmpty(this.size)
    };
  }

  setFlex(item: XDescriptionItemComponent) {
    let classes: { [property: string]: boolean } = {};
    if (!XIsEmpty(item.justify)) classes[`x-justify-${item.justify}`] = true;
    if (!XIsEmpty(item.align)) classes[`x-align-${item.align}`] = true;
    if (!XIsEmpty(item.direction)) classes[`x-direction-${item.direction}`] = true;
    return classes;
  }

  setMerge() {
    if (this.gridTemplateColumns) return;
    let gridTemplateColumns: string[] = [];
    this.items.forEach((x) => {
      if (x.width) {
        gridTemplateColumns.push(x.width);
      } else if (x.flex) {
        gridTemplateColumns.push(`${x.flex}fr`);
      }
    });
    this.gridTemplateColumns = gridTemplateColumns.join(' ');
  }
}
