import { Component } from '@angular/core';
import { XIsEmpty } from '@ng-nest/ui/core';

@Component({
  selector: 'ex-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss']
})
export class ExTagComponent {
  data = ['全部', 'A类', 'B类', 'C类', 'D类'];

  model = '全部';

  data1 = ['最热', '好评', '最新'];
  model1: string | null = '最热';

  data2 = ['喜剧', '动画', '科幻', '爱情'];
  model2: string | null = null;

  data3 = [2023, 2022, 2021, 2020];
  model3: string | null = null;

  selected: (string | null)[] = ['最热'];

  change(value: string) {
    console.log(value);
    const val = [this.model1, this.model2, this.model3].filter((x) => !XIsEmpty(x));
    this.selected = val;
  }

  close($event: string | null) {
    this.selected.splice(this.selected.indexOf($event), 1);
    if (this.model1 === $event) {
      this.model1 = null;
    }
    if (this.model2 === $event) {
      this.model2 = null;
    }
    if (this.model3 === $event) {
      this.model3 = null;
    }
  }
}
