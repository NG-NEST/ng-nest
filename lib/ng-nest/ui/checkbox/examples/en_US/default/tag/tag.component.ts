import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { XCheckboxComponent } from '@ng-nest/ui/checkbox';
import { XTagComponent } from '@ng-nest/ui/tag';

@Component({
  selector: 'ex-tag',
  imports: [FormsModule, XCheckboxComponent, XTagComponent],
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss']
})
export class ExTagComponent {
  data = signal(['All', 'A class', 'B class', 'C class', 'D class']);

  model = signal(['All']);

  data1 = signal(['Hot', 'Positive', 'Latest']);
  model1 = signal(['Hot']);

  data2 = signal(['Comedy', 'Animation', 'ScienceFiction', 'Love']);
  model2 = signal<string[]>([]);

  data3 = signal([2023, 2022, 2021, 2020]);
  model3 = signal<number[]>([]);

  selected = signal<(string | number)[]>(['Hot']);

  change(value: string) {
    console.log(value);
    const val = [...this.model1(), ...this.model2(), ...this.model3()];
    this.selected.set(val);
  }

  close($event: string | number) {
    this.selected.update((x) => {
      x.splice(x.indexOf($event), 1);
      return [...x];
    });
    if (this.model1().includes($event as string)) {
      this.model1.update((x) => {
        x.splice(x.indexOf($event as string), 1);
        return [...x];
      });
    }
    if (this.model2().includes($event as string)) {
      this.model2.update((x) => {
        x.splice(x.indexOf($event as string), 1);
        return [...x];
      });
    }
    if (this.model3().includes($event as number)) {
      this.model3.update((x) => {
        x.splice(x.indexOf($event as number), 1);
        return [...x];
      });
    }
  }
}
