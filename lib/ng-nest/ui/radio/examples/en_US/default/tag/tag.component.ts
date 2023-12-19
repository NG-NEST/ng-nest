import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { XIsEmpty } from '@ng-nest/ui/core';
import { XRadioComponent } from '@ng-nest/ui/radio';
import { XTagComponent } from '@ng-nest/ui/tag';

@Component({
  selector: 'ex-tag',
  standalone: true,
  imports: [FormsModule, XRadioComponent, XTagComponent],
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss']
})
export class ExTagComponent {
  data = ['All', 'A class', 'B class', 'C class', 'D class'];

  model = 'All';

  data1 = ['Hot', 'Positive', 'Latest'];
  model1: string | null = 'Hot';

  data2 = ['Comedy', 'Animation', 'ScienceFiction', 'Love'];
  model2: string | null = null;

  data3 = [2023, 2022, 2021, 2020];
  model3: string | null = null;

  selected: (string | null)[] = ['Hot'];

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
