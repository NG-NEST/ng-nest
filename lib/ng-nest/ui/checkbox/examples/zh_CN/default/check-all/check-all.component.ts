import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { XCheckboxComponent } from '@ng-nest/ui/checkbox';

@Component({
  selector: 'ex-check-all',
  imports: [FormsModule, XCheckboxComponent],
  templateUrl: './check-all.component.html',
  styleUrls: ['./check-all.component.scss']
})
export class ExCheckAllComponent {
  checkAllData = signal(['全选']);
  checkAll = signal(false);
  indeterminate = signal(true);
  data = signal(['QQ', '微信', '钉钉', '微博']);
  model = signal(['QQ']);
  change(value: boolean) {
    this.model.set(value ? this.data().map((x) => x) : []);
    this.indeterminate.set(false);
  }
  itemChange(value: string[]) {
    this.checkAll.set(value.length === this.data().length);
    this.indeterminate.set(value.length > 0 && value.length < this.data().length);
  }
}
