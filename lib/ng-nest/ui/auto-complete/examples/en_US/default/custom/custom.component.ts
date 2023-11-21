import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { XAutoCompleteComponent } from '@ng-nest/ui/auto-complete';
import { XIconComponent } from '@ng-nest/ui/icon';
import { XColComponent, XRowComponent } from '@ng-nest/ui/layout';
import { Observable } from 'rxjs';

@Component({
  selector: 'ex-custom',
  standalone: true,
  imports: [FormsModule, XIconComponent, XRowComponent, XColComponent, XAutoCompleteComponent],
  templateUrl: './custom.component.html',
  styleUrls: ['./custom.component.scss']
})
export class ExCustomComponent {
  // 传参手动匹配
  model = '';
  data = (str: string) =>
    new Observable<string[]>((x) => {
      x.next([`${str}`, `${str}${str}`, `${str}${str}${str}`]);
      x.complete();
    });
}
