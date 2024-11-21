import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { XAutoCompleteComponent } from '@ng-nest/ui/auto-complete';
import { XColComponent, XRowComponent } from '@ng-nest/ui/layout';
import { Observable } from 'rxjs';

@Component({
  selector: 'ex-disabled',
  imports: [FormsModule, XRowComponent, XColComponent, XAutoCompleteComponent],
  templateUrl: './disabled.component.html',
  styleUrls: ['./disabled.component.scss']
})
export class ExDisabledComponent {
  model = signal('ngnest');
  data = signal(
    (str: string) =>
      new Observable<string[]>((x) => {
        x.next([`${str}`, `${str}${str}`, `${str}${str}${str}`]);
        x.complete();
      })
  );
}
