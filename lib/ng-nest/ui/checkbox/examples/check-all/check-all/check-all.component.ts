import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { XCheckboxNode } from '@ng-nest/ui/checkbox';
import { XData } from '@ng-nest/ui/core';

@Component({
  selector: 'ex-check-all',
  templateUrl: './check-all.component.html',
  styleUrls: ['./check-all.component.scss']
})
export class ExCheckAllComponent implements OnInit {
  checkAllData: XData<XCheckboxNode[]> = [{ value: true, label: '全选' }];
  checkAll = [false];
  indeterminate = true;
  data: XData<XCheckboxNode[]> = ['QQ', '微信', '钉钉', '微博'];
  model: any = ['QQ'];
  change(value) {
    this.model = value.indexOf(true) >= 0 ? (this.data as Array<any>).map(x => x) : [];
    this.indeterminate = false;
    this.cdr.detectChanges();
  }
  itemChange(value) {
    this.checkAll = [value.length === (this.data as Array<any>).length];
    this.indeterminate = value.length > 0 && value.length < (this.data as Array<any>).length;
    this.cdr.detectChanges();
  }
  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {}
}
