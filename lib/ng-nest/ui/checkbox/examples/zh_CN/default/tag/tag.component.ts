import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { XCheckboxComponent } from '@ng-nest/ui/checkbox';
import { XTagComponent } from '@ng-nest/ui/tag';

@Component({
  selector: 'ex-tag',
  standalone: true,
  imports: [CommonModule, FormsModule, XCheckboxComponent, XTagComponent],
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss']
})
export class ExTagComponent {
  data = ['A类', 'B类', 'C类', 'D类'];

  model = ['A类'];

  data1 = ['最热', '好评', '最新'];
  model1: string[] = ['最热'];

  data2 = ['喜剧', '动画', '科幻', '爱情'];
  model2: string[] = [];

  data3 = [2023, 2022, 2021, 2020];
  model3: number[] = [];

  selected: (string | number)[] = ['最热'];

  change(value: string) {
    console.log(value);
    const val = [...this.model1, ...this.model2, ...this.model3];
    this.selected = val;
  }

  close($event: string | number) {
    this.selected.splice(this.selected.indexOf($event), 1);
    if (this.model1.includes($event as string)) {
      this.model1.splice(this.model1.indexOf($event as string), 1);
      this.model1 = [...this.model1];
    }
    if (this.model2.includes($event as string)) {
      this.model2.splice(this.model2.indexOf($event as string), 1);
      this.model2 = [...this.model2];
    }
    if (this.model3.includes($event as number)) {
      this.model3.splice(this.model3.indexOf($event as number), 1);
      this.model3 = [...this.model3];
    }
  }
}
