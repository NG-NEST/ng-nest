import { Component, signal } from '@angular/core';
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
  data = signal(['全部', 'A类', 'B类', 'C类', 'D类']);
  model = signal('全部');
  data1 = signal(['最热', '好评', '最新']);
  model1 = signal<string | null>('最热');
  data2 = signal(['喜剧', '动画', '科幻', '爱情']);
  model2 = signal<string | null>(null);
  data3 = signal([2023, 2022, 2021, 2020]);
  model3 = signal<number | null>(null);
  selected = signal<(string | number | null)[]>(['最热']);

  change(value: string) {
    console.log(value);
    const val = [this.model1(), this.model2(), this.model3()].filter((x) => !XIsEmpty(x));
    this.selected.set(val);
  }

  close($event: string | number | null) {
    this.selected.update((x) => {
      x.splice(x.indexOf($event as string), 1);
      return [...x];
    });
    if (this.model1() === $event) {
      this.model1.set(null);
    }
    if (this.model2() === $event) {
      this.model2.set(null);
    }
    if (this.model3() === $event) {
      this.model3.set(null);
    }
  }
}
