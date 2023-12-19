import {
  Component,
  OnInit,
  ViewEncapsulation,
  ElementRef,
  ChangeDetectionStrategy,
  ViewChild,
  Input,
  inject
} from '@angular/core';
import { XTableFootPrefix, XTableFootProperty } from './table.property';
import { removeNgTag } from '@ng-nest/ui/core';
import { XOutletDirective } from '@ng-nest/ui/outlet';

@Component({
  selector: `${XTableFootPrefix}`,
  standalone: true,
  imports: [XOutletDirective],
  templateUrl: './table-foot.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XTableFootComponent extends XTableFootProperty implements OnInit {
  @ViewChild('tfoot') tfoot!: ElementRef<HTMLElement>;
  @Input() table: any;
  get getRowHeight() {
    return this.rowHeight == 0 ? '' : this.rowHeight;
  }
  private elementRef = inject(ElementRef);

  ngOnInit() {
    removeNgTag(this.elementRef.nativeElement);
  }

  ngAfterViewInit() {
    this.table.tfoot = this.tfoot!;
  }
}
