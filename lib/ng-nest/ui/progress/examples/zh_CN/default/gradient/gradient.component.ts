import { Component } from '@angular/core';
import { XProgressComponent } from '@ng-nest/ui/progress';

@Component({
  selector: 'ex-gradient',
  standalone: true,
  imports: [XProgressComponent],
  templateUrl: './gradient.component.html',
  styleUrls: ['./gradient.component.scss']
})
export class ExGradientComponent {}
