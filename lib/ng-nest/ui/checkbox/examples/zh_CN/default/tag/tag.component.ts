import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { XCheckboxComponent } from '@ng-nest/ui/checkbox';
import { XTagComponent } from '@ng-nest/ui/tag';

@Component({
  selector: 'ex-tag',
  standalone: true,
  imports: [FormsModule, XCheckboxComponent, XTagComponent],
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss']
})
export class ExTagComponent {
  data = signal(['A类', 'B类', 'C类', 'D类']);

  model = signal(['A类']);

  data1 = signal(['最热', '好评', '最新']);
  model1 = signal(['最热']);

  data2 = signal(['喜剧', '动画', '科幻', '爱情']);
  model2 = signal<string[]>([]);

  data3 = signal([2023, 2022, 2021, 2020]);
  model3 = signal<number[]>([]);

  selected = signal<(string | number)[]>(['最热']);

  change(value: string) {
    console.log(value);
    const val = [...this.model1(), ...this.model2(), ...this.model3()];
    this.selected.set(val);
  }

  close($event: string | number) {
    this.selected.update((x) => {
      x.splice(x.indexOf($event), 1);
      return x;
    });
    if (this.model1().includes($event as string)) {
      this.model1.update((x) => {
        x.splice(x.indexOf($event as string), 1);
        return x;
      });
    }
    if (this.model2().includes($event as string)) {
      this.model2.update((x) => {
        x.splice(x.indexOf($event as string), 1);
        return x;
      });
    }
    if (this.model3().includes($event as number)) {
      this.model3.update((x) => {
        x.splice(x.indexOf($event as number), 1);
        return x;
      });
    }
  }
}
