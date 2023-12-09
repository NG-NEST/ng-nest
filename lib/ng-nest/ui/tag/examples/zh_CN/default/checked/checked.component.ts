import { Component } from '@angular/core';
import { XTagComponent } from '@ng-nest/ui/tag';

@Component({
  selector: 'ex-checked',
  standalone: true,
  imports: [XTagComponent],
  templateUrl: './checked.component.html',
  styleUrls: ['./checked.component.scss']
})
export class ExCheckedComponent {
  change(selected: boolean) {
    console.log(selected);
  }
}
