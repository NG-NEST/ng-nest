import { Component, signal } from '@angular/core';
import { XProgressComponent } from '@ng-nest/ui/progress';

@Component({
  selector: 'ex-format',
  imports: [XProgressComponent],
  templateUrl: './format.component.html',
  styleUrls: ['./format.component.scss']
})
export class ExFormatComponent {
  format = signal((percent: number) => {
    return percent === 100 ? 'completed' : 'loading' + percent + '%';
  });
}
