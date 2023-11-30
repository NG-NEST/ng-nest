import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { XFindComponent } from '@ng-nest/ui/find';

@Component({
  selector: 'ex-disabled',
  standalone: true,
  imports: [FormsModule, XFindComponent],
  templateUrl: './disabled.component.html',
  styleUrls: ['./disabled.component.scss']
})
export class ExDisabledComponent {
  model = { id: 10, label: '姓名1' };
}
