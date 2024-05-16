import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { XFindComponent } from '@ng-nest/ui/find';

@Component({
  selector: 'ex-bordered',
  standalone: true,
  imports: [FormsModule, XFindComponent],
  templateUrl: './bordered.component.html',
  styleUrls: ['./bordered.component.scss']
})
export class ExBorderedComponent {
  model = signal([
    { id: 1, label: 'name1' },
    { id: 2, label: 'name2' }
  ]);
}
