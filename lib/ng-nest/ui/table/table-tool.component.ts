import {
  ViewEncapsulation,
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  HostBinding,
  Host,
  Optional,
  EventEmitter,
  Output,
  ElementRef
} from '@angular/core';
import { XTableAction } from './table.property';
import { XIsUndefined } from '@ng-nest/ui/core';
import { XTableComponent } from './table.component';

@Component({
  selector: `x-table-tool`,
  templateUrl: './table-tool.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XTableToolComponent implements OnInit {
  @Input() actions: XTableAction[] = [];
  @Input() searchPlaceholder: string = '';
  @Input() searchInput: string = '';
  @Input() searchShow: boolean = true;
  @Output() searchChange = new EventEmitter();
  @HostBinding('class.x-table-tool') class = true;
  leftActions: XTableAction[] = [];
  rightActions: XTableAction[] = [];
  rightIconActions: XTableAction[] = [];

  constructor(public elementRef: ElementRef) {}

  ngOnInit() {
    this.setActions();
  }

  change(event: any) {
    if (XIsUndefined(event)) return;
    this.searchChange.emit(event);
  }

  private setActions() {
    if (this.actions.length === 0) return;
    this.leftActions = this.actions.filter((x) => typeof x.actionLayoutType === 'undefined' || x.actionLayoutType === 'top-left');
    this.rightActions = this.actions.filter((x) => x.actionLayoutType === 'top-right');
    this.rightIconActions = this.actions.filter((x) => x.actionLayoutType === 'top-right-icon');
  }
}
