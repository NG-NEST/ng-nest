import { Component } from '@angular/core';
import { XIconComponent } from '@ng-nest/ui/icon';
import { XProgressComponent } from '@ng-nest/ui/progress';

@Component({
  selector: 'ex-circle',
  imports: [XProgressComponent, XIconComponent],
  templateUrl: './circle.component.html',
  styleUrls: ['./circle.component.scss']
})
export class ExCircleComponent {}
