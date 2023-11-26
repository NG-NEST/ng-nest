import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { XCheckboxComponent } from '@ng-nest/ui/checkbox';
import { XTagModule } from '@ng-nest/ui/tag';

@Component({
  selector: 'ex-tag',
  standalone: true,
  imports: [CommonModule, FormsModule, XCheckboxComponent, XTagModule],
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss']
})
export class ExTagComponent {
  data = ['All', 'A class', 'B class', 'C class', 'D class'];

  model = ['All'];

  data1 = ['Hot', 'Positive', 'Latest'];
  model1: string[] = ['Hot'];

  data2 = ['Comedy', 'Animation', 'ScienceFiction', 'Love'];
  model2: string[] = [];

  data3 = [2023, 2022, 2021, 2020];
  model3: number[] = [];

  selected: (string | number)[] = ['Hot'];

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
