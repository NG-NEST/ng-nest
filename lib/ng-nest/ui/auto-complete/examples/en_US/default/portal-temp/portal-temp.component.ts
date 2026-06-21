import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { XEmptyComponent } from '@ng-nest/ui/empty';
import { XAutoCompleteComponent } from '@ng-nest/ui/auto-complete';

@Component({
  selector: 'ex-portal-temp',
  imports: [FormsModule, XAutoCompleteComponent, XEmptyComponent],
  templateUrl: './portal-temp.component.html',
  styleUrls: ['./portal-temp.component.scss']
})
export class ExPortalTempComponent {
  data1 = signal(['AAAA', 'BBBB', 'CCCC', 'DDDD', 'EEEE', 'FFFF', 'GGGG', 'HHHH', 'IIII', 'JJJJ']);
  data2 = signal(['AAAA', 'BBBB', 'CCCC', 'DDDD', 'EEEE', 'FFFF', 'GGGG', 'HHHH', 'IIII', 'JJJJ']);
  model1 = signal('');
  model2 = signal('');

  searchResult = signal<string[]>(this.data2());

  change(value: string) {
    console.log(value);
  }

  searchChange(value: string) {
    if (!value) {
      this.searchResult.set(this.data2());
    } else {
      this.searchResult.set(this.data2().filter((item) => item.toLowerCase().includes(value.toLowerCase())));
    }
  }
}
