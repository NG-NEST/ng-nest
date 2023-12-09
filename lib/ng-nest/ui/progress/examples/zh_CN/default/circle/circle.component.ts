import { Component } from '@angular/core';
import { XProgressComponent } from '@ng-nest/ui/progress';

@Component({
  selector: 'ex-circle',
  standalone: true,
  imports: [XProgressComponent],
  templateUrl: './circle.component.html',
  styleUrls: ['./circle.component.scss']
})
export class ExCircleComponent {}
