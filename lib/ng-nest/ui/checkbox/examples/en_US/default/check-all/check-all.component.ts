import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { XCheckboxComponent, XCheckboxNode } from '@ng-nest/ui/checkbox';
import { XData } from '@ng-nest/ui/core';

@Component({
  selector: 'ex-check-all',
  standalone: true,
  imports: [FormsModule, XCheckboxComponent],
  templateUrl: './check-all.component.html',
  styleUrls: ['./check-all.component.scss']
})
export class ExCheckAllComponent implements OnInit {
  checkAllData: XData<XCheckboxNode> = ['checkAll'];
  checkAll = false;
  indeterminate = true;
  data: string[] = ['QQ', 'WeChat', 'DingTalk', 'Weibo'];
  model: any = ['QQ'];
  change(value: boolean) {
    this.model = value ? this.data.map((x) => x) : [];
    this.indeterminate = false;
    this.cdr.detectChanges();
  }
  itemChange(value: string[]) {
    this.checkAll = value.length === this.data.length;
    this.indeterminate = value.length > 0 && value.length < this.data.length;
    this.cdr.detectChanges();
  }
  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {}
}
