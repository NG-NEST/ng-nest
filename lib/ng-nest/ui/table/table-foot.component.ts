import {
  Component,
  OnInit,
  ViewEncapsulation,
  ElementRef,
  ChangeDetectionStrategy,
  inject,
  computed,
  viewChild
} from '@angular/core';
import { XTableFootPrefix, XTableFootProperty } from './table.property';
import { XRemoveNgTag } from '@ng-nest/ui/core';
import { XOutletDirective } from '@ng-nest/ui/outlet';
import { XTableComponent } from './table.component';

@Component({
  selector: `${XTableFootPrefix}`,
  standalone: true,
  imports: [XOutletDirective],
  templateUrl: './table-foot.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XTableFootComponent extends XTableFootProperty implements OnInit {
  tfoot = viewChild.required<ElementRef<HTMLElement>>('tfoot');
  table = inject(XTableComponent, { optional: true })!;
  getRowHeight = computed(() => (this.rowHeight() == 0 ? '' : this.rowHeight()));
  private elementRef = inject(ElementRef);

  ngOnInit() {
    XRemoveNgTag(this.elementRef.nativeElement);
  }

  ngAfterViewInit() {
    this.table.tfoot.set(this.tfoot());
  }
}
